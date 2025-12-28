import { SatoriOptions } from "satori/wasm"
import { GlobalConfiguration } from "../../cfg"
import { SocialImageOptions, UserOpts } from "./ogImage"
import { QuartzPluginData } from "../vfile"
import { formatDate, getDate } from "../../util/locale"
import { readingTime } from "../../util/readingTime"
import { i18n } from "../../i18n"

export const ogWithBackground: SocialImageOptions["imageStructure"] = (
  cfg: GlobalConfiguration,
  userOpts: UserOpts,
  title: string,
  description: string,
  fonts: SatoriOptions["fonts"],
  fileData: QuartzPluginData,
) => {
  let created: string | undefined
  let reading: string | undefined

  if (fileData.dates) {
    const dt = getDate(cfg, fileData)
    if (dt) created = formatDate(dt, cfg.locale)
  }

  if (fileData.text) {
    const { minutes } = readingTime(fileData.text)
    reading = i18n(cfg.locale).components.contentMeta.readingTime({
      minutes: Math.ceil(minutes),
    })
  }

  const meta = [created, reading].filter(Boolean)

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        display: "flex",
        backgroundImage: `url("https://${cfg.baseUrl}/static/og-image.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for readability */}
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
          justifyContent: "space-between",
          padding: "4rem",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h1
            style={{
              color: "#ffffff",
              fontSize: 84,
              margin: 0,
              fontFamily: fonts[0].name,
            }}
          >
            {title}
          </h1>

          {meta.length > 0 && (
            <ul
              style={{
                display: "flex",
                gap: "1.25rem",
                listStyle: "none",
                padding: 0,
                margin: 0,
                color: "rgba(255,255,255,0.85)",
                fontSize: 30,
                fontFamily: fonts[1].name,
              }}
            >
              {meta.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          )}
        </div>

        <p
          style={{
            color: "rgba(255,255,255,0.95)",
            fontSize: 40,
            fontFamily: fonts[1].name,
            maxWidth: "90%",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            lineClamp: 5,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
