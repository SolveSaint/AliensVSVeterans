import { SatoriOptions } from "satori/wasm"
import { GlobalConfiguration } from "../../cfg"
import { SocialImageOptions, UserOpts } from "./ogImage/imageHelper"
import { QuartzPluginData } from "../vfile"

// Uses quartz/static/og-image.png as the background.
// Put your forest image here:
// quartz/static/og-image.png
// Then it is reachable at: https://<baseUrl>/static/og-image.png

export const ogWithBackground: SocialImageOptions["imageStructure"] = (
  cfg: GlobalConfiguration,
  userOpts: UserOpts,
  title: string,
  description: string,
  fonts: SatoriOptions["fonts"],
  _fileData: QuartzPluginData,
) => {
  const { colorScheme } = userOpts

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        height: "100%",
        width: "100%",
        backgroundImage: `url("https://${cfg.baseUrl}/static/og-image.png")`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.52) 55%, rgba(0,0,0,0.18) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "1.25rem",
          paddingTop: "4rem",
          paddingBottom: "4rem",
          paddingLeft: "4rem",
          paddingRight: "4rem",
        }}
      >
        <h2
          style={{
            color: cfg.theme.colors[colorScheme].light,
            fontSize: "3.25rem",
            fontWeight: 800,
            margin: 0,
            fontFamily: fonts[0].name,
            lineClamp: 2,
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: cfg.theme.colors[colorScheme].light,
            fontSize: "1.6rem",
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 6,
            WebkitBoxOrient: "vertical",
            lineClamp: 6,
            fontFamily: fonts[1].name,
            maxWidth: "72%",
          }}
        >
          {description}
        </p>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            color: cfg.theme.colors[colorScheme].gray,
            fontSize: "1.25rem",
            fontFamily: fonts[1].name,
          }}
        >
          <span>{cfg.pageTitle}</span>
          <span style={{ opacity: 0.7 }}>|</span>
          <span>{cfg.baseUrl}</span>
        </div>
      </div>
    </div>
  )
}
