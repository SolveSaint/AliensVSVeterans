import type { SatoriOptions } from "satori/wasm"
import type { GlobalConfiguration } from "../cfg"
import type { SocialImageOptions, UserOpts } from "../plugins/emitters/ogImage/imageHelper"
import type { QuartzPluginData } from "../plugins/vfile"

import fs from "node:fs"
import { fileURLToPath } from "node:url"

type MaybeFonts = SatoriOptions["fonts"] | undefined

function safeFont(fonts: MaybeFonts, idx: number, fallback: string) {
  const f = Array.isArray(fonts) ? (fonts[idx] as any) : undefined
  const name = f?.name
  return typeof name === "string" && name.length ? name : fallback
}

function safeColors(cfg: GlobalConfiguration, colorScheme: "lightMode" | "darkMode") {
  const themeAny = (cfg as any)?.theme
  const colors = themeAny?.colors?.[colorScheme] ?? themeAny?.colors?.darkMode
  if (colors) return colors
  return {
    light: "#161618",
    lightgray: "#393639",
    gray: "#b8b8b8",
    darkgray: "#d4d4d4",
    dark: "#ebebec",
    secondary: "#7b97aa",
    tertiary: "#84a59d",
    highlight: "rgba(143, 159, 169, 0.15)",
    textHighlight: "#b3aa0288",
  }
}

function clampText(s: string, max = 160) {
  const t = (s ?? "").trim().replace(/\s+/g, " ")
  if (!t) return ""
  return t.length > max ? t.slice(0, max - 1) + "…" : t
}

function normalizeBaseUrl(baseUrl: string | undefined) {
  const raw = (baseUrl ?? "").trim()
  const noProto = raw.replace(/^https?:\/\//i, "")
  return noProto.replace(/\/+$/, "")
}

// Load the forest background from disk once at module load time.
// This avoids Satori needing to fetch https://... during builds (the main cause of “black” renders).
let forestDataUrl: string | null = null
try {
  // ogWithBackground.tsx is at quartz/plugins/emitters/ogWithBackground.tsx
  // static is at quartz/static/og-image.png
  const forestPath = fileURLToPath(new URL("../../static/og-image.png", import.meta.url))
  const buf = fs.readFileSync(forestPath)
  forestDataUrl = `data:image/png;base64,${buf.toString("base64")}`
} catch {
  forestDataUrl = null
}

export const ogWithBackground: SocialImageOptions["imageStructure"] = (
  cfg: GlobalConfiguration,
  userOpts: UserOpts | undefined,
  title: string,
  description: string,
  fonts: MaybeFonts,
  fileData: QuartzPluginData,
) => {
  const colorScheme = (userOpts?.colorScheme ?? "darkMode") as "lightMode" | "darkMode"
  const colors = safeColors(cfg, colorScheme)

  const headerFont = safeFont(fonts, 0, "serif")
  const bodyFont = safeFont(fonts, 1, "sans-serif")

  const fmTitle =
    (fileData as any)?.frontmatter?.socialTitle ?? (fileData as any)?.frontmatter?.title ?? ""
  const safeTitle =
    (title ?? "").trim() ||
    (fmTitle ?? "").trim() ||
    (cfg as any)?.pageTitle ||
    "AliensVSVeterans"

  const fmDesc =
    (fileData as any)?.frontmatter?.socialDescription ??
    (fileData as any)?.frontmatter?.description ??
    (fileData as any)?.frontmatter?.summary ??
    ""
  const safeDesc = clampText(((description ?? "").trim() || fmDesc) as string, 170)

  // Fallback absolute URL (only used if the local read fails)
  const base = normalizeBaseUrl((cfg as any)?.baseUrl)
  const fallbackBgUrl = `https://${base || "aliensvsveterans.com"}/static/og-image.png`

  // Prefer local data URL to prevent black renders
  const bgUrl = forestDataUrl ?? fallbackBgUrl

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: "#000",
        backgroundImage: `url("${bgUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", // stops tiling
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.58) 55%, rgba(0,0,0,0.38) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "4rem",
          gap: "1.25rem",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: headerFont,
            fontSize: "4.2rem",
            fontWeight: 800,
            lineHeight: 1.05,
            color: colors.dark ?? "#ebebec",
            maxWidth: "92%",
            textShadow: "0 2px 18px rgba(0,0,0,0.55)",
          }}
        >
          {safeTitle}
        </div>

        {safeDesc ? (
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: "1.8rem",
              lineHeight: 1.35,
              color: colors.gray ?? "rgba(235,235,236,0.88)",
              maxWidth: "86%",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textShadow: "0 2px 18px rgba(0,0,0,0.55)",
            }}
          >
            {safeDesc}
          </div>
        ) : null}

        <div
          style={{
            marginTop: "0.5rem",
            height: "10px",
            width: "260px",
            backgroundColor: colors.tertiary ?? "#84a59d",
            opacity: 0.85,
            borderRadius: "999px",
          }}
        />
      </div>
    </div>
  )
}
