import { SatoriOptions } from "satori/wasm"
import { GlobalConfiguration } from "../../cfg"
import { SocialImageOptions, UserOpts } from "./imageHelper"
import { QuartzPluginData } from "../vfile"

export const ogWithBackground: SocialImageOptions["imageStructure"] = (
  cfg: GlobalConfiguration,
  _userOpts: UserOpts | undefined,
  title: string,
  description: string,
  fonts: SatoriOptions["fonts"],
  _fileData: QuartzPluginData,
) => {
  const baseUrl = cfg.baseUrl
  const safeTitle = title || "AliensVSVeterans"
  const safeDesc = description || ""

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
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
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
            fontFamily: fonts[0].name,
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
              fontFamily: fonts[1].name,
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
