type GiscusElement = Omit<HTMLElement, "dataset"> & {
  dataset: DOMStringMap & {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string
    mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname"
    strict?: string
    reactionsEnabled?: string
    inputPosition?: "top" | "bottom"
    lang?: string
    theme?: string
    loading?: string
  }
}

const setGiscusConfig = (config: Record<string, unknown>) => {
  const iframe = document.querySelector("iframe.giscus-frame") as HTMLIFrameElement | null
  if (!iframe?.contentWindow) return

  iframe.contentWindow.postMessage(
    {
      giscus: {
        setConfig: config,
      },
    },
    "https://giscus.app",
  )
}

const mountGiscusIfNeeded = () => {
  const container = document.querySelector(".giscus") as GiscusElement | null
  if (!container) return

  const alreadyMounted =
    container.querySelector("iframe.giscus-frame") ||
    container.querySelector('script[data-giscus-script="true"]')

  if (alreadyMounted) return

  const s = document.createElement("script")
  s.src = "https://giscus.app/client.js"
  s.async = true
  s.crossOrigin = "anonymous"
  s.setAttribute("data-giscus-script", "true")

  s.setAttribute("data-repo", container.dataset.repo)
  s.setAttribute("data-repo-id", container.dataset.repoId)
  s.setAttribute("data-category", container.dataset.category)
  s.setAttribute("data-category-id", container.dataset.categoryId)

  s.setAttribute("data-mapping", container.dataset.mapping ?? "pathname")
  s.setAttribute("data-strict", container.dataset.strict ?? "1")
  s.setAttribute("data-reactions-enabled", container.dataset.reactionsEnabled ?? "0")
  s.setAttribute("data-input-position", container.dataset.inputPosition ?? "bottom")
  s.setAttribute("data-lang", container.dataset.lang ?? "en")
  s.setAttribute("data-emit-metadata", "0")
  s.setAttribute("data-loading", container.dataset.loading ?? "lazy")

  // Use your chosen mode from the Giscus configurator
  s.setAttribute("data-theme", container.dataset.theme ?? "preferred_color_scheme")

  container.appendChild(s)
}

const onNav = () => {
  mountGiscusIfNeeded()

  // Keep discussions aligned to the current page in SPA mode
  setGiscusConfig({
    term: window.location.pathname || "/",
  })
}

const onThemeChange = (e: any) => {
  const theme = e?.detail?.theme
  if (theme !== "dark" && theme !== "light") return

  // Use built in themes
  setGiscusConfig({ theme })
}

document.addEventListener("nav", onNav)
document.addEventListener("themechange", onThemeChange)

// initial
onNav()

// cleanup hook Quartz uses
window.addCleanup(() => document.removeEventListener("themechange", onThemeChange))
