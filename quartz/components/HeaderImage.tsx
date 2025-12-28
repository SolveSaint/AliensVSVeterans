import { QuartzComponent, QuartzComponentConstructor } from "./types"

const HeaderImage: QuartzComponent = () => {
  return (
    <div style={{ width: "100%", textAlign: "center", marginBottom: "1rem" }}>
      <img
        src="/static/NHI_Connection_Banner_Cropped.png"
        alt="NHI Connection banner"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  )
}

export default (() => HeaderImage) satisfies QuartzComponentConstructor
