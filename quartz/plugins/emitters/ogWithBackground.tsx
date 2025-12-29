import type { SatoriOptions } from "satori/wasm"
import type { GlobalConfiguration } from "../cfg"
import type { SocialImageOptions, UserOpts } from "../plugins/emitters/ogImage/imageHelper"
import type { QuartzPluginData } from "../plugins/vfile"

import fs from "node:fs"
import path from "node:path"
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

function pickBaseUrl(cfg: GlobalConfiguration) {
  const anyCfg = cfg as any
  const candidates = [anyCfg?.baseUrl, anyCfg?.configuration?.baseUrl, anyCfg?.site?.baseUrl, anyCfg?.siteUrl]
  for (const c of candidates) {
    const base = normalizeBaseUrl(typeof c === "string" ? c : undefined)
    if (base) return base
  }
  return "aliensvsveterans.com"
}

// Reads quartz/static/og-image.png and embeds it as a data URL.
// This avoids any HTTPS fetch during OG generation (the cause of the black cards).
function localForestDataUrl() {
  try {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    // ogWithBackground.tsx lives in: quartz/plugins/emitters/
    // static lives in: quartz/static/
    const fp = path.resolve(__dirname, "../../static/og-image.png")
    const buf = fs.readFileSync(fp)
    return `data:image/png;base64,${buf.toString("base64")}`
  } catch {
    return null
  }
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

  const fmTitle = (fileData as any)?.frontmatter?.socialTitle ?? (fileData as any)?.frontmatter?.title ?? ""
  const safeTitle = clampText(
    ((title ?? "").trim() || (fmTitle ?? "").trim() || (cfg as any)?.pageTitle || "AliensVSVeterans") as string,
    72,
  )

  const fmDesc =
    (fileData as any)?.frontmatter?.socialDescription ??
    (fileData as any)?.frontmatter?.description ??
    (fileData as any)?.frontmatter?.summary ??
    ""
  const safeDesc = clampText(((description ?? "").trim() || fmDesc) as string, 170)

  // Prefer local embedded image so OG render never depends on the network.
  const localBg = localForestDataUrl()

  // If local read ever fails, fall back to absolute https URL (must be absolute or Quartz will throw).
  const base = pickBaseUrl(cfg)
  const remoteBg = `https://${base}/static/og-image.png`

  const bgUrl = localBg ?? remoteBg

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
            "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.35) 100%)",
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
