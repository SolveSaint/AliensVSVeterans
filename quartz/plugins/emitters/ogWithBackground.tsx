import { SatoriOptions } from "satori/wasm"
import { GlobalConfiguration } from "../../cfg"
import { SocialImageOptions, UserOpts } from "./imageHelper"
import { QuartzPluginData } from "../vfile"

type MaybeFonts = SatoriOptions["fonts"] | undefined

function safeFont(fonts: MaybeFonts, idx: number, fallback: string) {
  const f = Array.isArray(fonts) ? fonts[idx] : undefined
  const name = (f as any)?.name
  return typeof name === "string" && name.length ? name : fallback
}

export const ogWithBackground: SocialImageOptions["imageStructure"] = (
  cfg: GlobalConfiguration,
  userOpts: UserOpts | undefined,
  title: string,
  description: string,
  fonts: MaybeFonts,
  fileData: QuartzPluginData,
) => {
  const colorScheme = userOpts?.colorScheme ?? "darkMode"

  // Hard fallbacks so cfg/theme never crashes even if something is weird in the pipeline
  const colors =
    (cfg as any)?.theme?.colors?.[colorScheme] ??
    (cfg as any)?.theme?.colors?.darkMode ??
    {
      light: "#161618",
      dark: "#ebebec",
      gray: "#646464",
      tertiary: "#84a59d",
    }

  const headerFont = safeFont(fonts, 0, "serif")
  const bodyFont = safeFont(fonts, 1, "sans-serif")

  const safeTitle = title?.trim() ? title : (cfg as any)?.pageTitle ?? "AliensVSVeterans"
  const safeDesc = description?.trim() ? description : ""

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundImage: `url("https://${cfg.baseUrl}/static/og-image.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.55)",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "4rem",
          gap: "1.25rem",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: headerFont,
            fontSize: "4rem",
            fontWeight: 800,
            lineHeight: 1.05,
            color: colors.dark ?? "#ffffff",
            maxWidth: "92%",
          }}
        >
          {safeTitle}
        </div>

        {safeDesc && (
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: "1.75rem",
              lineHeight: 1.35,
              color: colors.gray ?? "rgba(255,255,255,0.85)",
              maxWidth: "85%",
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {safeDesc}
          </div>
        )}
      </div>
    </div>
  )
}
