import { SatoriOptions } from "satori/wasm"
import { GlobalConfiguration } from "../../cfg"
import { SocialImageOptions, UserOpts } from "./ogImage/imageHelper"
import { QuartzPluginData } from "../vfile"
import { i18n } from "../../i18n"
import { formatDate } from "../../util/date"
import { getDate } from "../../util/ctx"
import readingTime from "reading-time"

// Forest background. Put the file here:
// quartz/static/og-image.png
// Then it is reachable at: https://<baseUrl>/static/og-image.png

export const ogWithBackground: SocialImageOptions["imageStructure"] = (
  cfg: GlobalConfiguration,
  userOpts: UserOpts,
  title: string,
  description: string,
  fonts: SatoriOptions["fonts"],
  fileData: QuartzPluginData,
) => {
  const { colorScheme } = userOpts

  // created date (if present)
  let created: string | undefined
  if (fileData.dates) {
    const d = getDate(cfg, fileData)
    if (d) created = formatDate(d, cfg.locale)
  }

  // reading time (if text present)
  let reading: string | undefined
  if (fileData.text) {
    const rt = readingTime(fileData.text)
    reading = i18n(cfg.locale).components.contentMeta.readingTime({
      minutes: Math.max(1, Math.ceil(rt.minutes)),
    })
  }

  const meta = [created, reading].filter(Boolean) as string[]

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
      {/* dark overlay so text is readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%)",
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            width: "100%",
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

          {meta.length > 0 && (
            <ul
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1.25rem",
                listStyleType: "none",
                padding: 0,
                marginTop: "1.25rem",
                marginBottom: 0,
                color: cfg.theme.colors[colorScheme].gray,
                fontSize: "1.5rem",
                fontFamily: fonts[1].name,
              }}
            >
              {meta.map((m, idx) => (
                <li key={idx}>{m}</li>
              ))}
            </ul>
          )}
        </div>

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
            maxWidth: "70%",
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
