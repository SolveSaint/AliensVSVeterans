import { SatoriOptions } from "satori/wasm"
import { GlobalConfiguration } from "../../cfg"
import { SocialImageOptions, UserOpts } from "./imageHelper"
import { QuartzPluginData } from "../vfile"

type MaybeFonts = SatoriOptions["fonts"] | undefined

function fontName(fonts: MaybeFonts, idx: number, fallback: string) {
  const f = Array.isArray(fonts) ? fonts[idx] : undefined
  // satori font objects usually look like { name, data, weight, style }
  // but we guard hard.
  const name = (f as any)?.name
  return typeof name === "string" && name.length > 0 ? name : fallback
}

export const ogWithBackground: SocialImageOptions["imageStructure"] = (
  cfg: GlobalConfiguration,
  _userOpts: UserOpts | undefined,
  title: string,
  description: string,
  fonts: MaybeFonts,
  _fileData: QuartzPluginData,
) => {
  const baseUrl = cfg.baseUrl
  const safeTitle = title && title.length > 0 ? title : "AliensVSVeterans"
  const safeDesc = description && description.length > 0 ? description : ""

  const headerFont = fontName(fonts, 0, "serif")
  const bodyFont = fontName(fonts, 1, "sans-serif")

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundImage: `url("https://${baseUrl}/static/og-image.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
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
          gap: "1.5rem",
          height: "100%",
          width: "100%",
          color: "#ffffff",
        }}
      >
        <h1
          style={{
            fontFamily: headerFont,
            fontSize: "4rem",
            fontWeight: 700,
            lineHeight: 1.1,
            margin: 0,
            maxWidth: "90%",
          }}
        >
          {safeTitle}
        </h1>

        {safeDesc.length > 0 && (
          <p
            style={{
              fontFamily: bodyFont,
              fontSize: "1.75rem",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "85%",
              opacity: 0.9,
            }}
          >
            {safeDesc}
          </p>
        )}
      </div>
    </div>
  )
}
