const safeAddCleanup = (fn: () => void) => {
  const w = window as unknown as { addCleanup?: (fn: () => void) => void }
  if (typeof w.addCleanup === "function") w.addCleanup(fn)
}

const postToGiscus = (msg: Record<string, unknown>) => {
  const iframe = document.querySelector("iframe.giscus-frame") as HTMLIFrameElement | null
  if (!iframe?.contentWindow) return
  iframe.contentWindow.postMessage({ giscus: msg }, "https://giscus.app")
}

const mountIfNeeded = () => {
  const container = document.querySelector(".giscus") as HTMLElement | null
  if (!container) return

  // already mounted
  if (container.querySelector("iframe.giscus-frame")) return
  if (container.querySelector('script[data-giscus-script="true"]')) return

  const ds = (container as any).dataset as DOMStringMap

  const s = document.createElement("script")
  s.src = "https://giscus.app/client.js"
  s.async = true
  s.crossOrigin = "anonymous"
  s.setAttribute("data-giscus-script", "true")

  s.setAttribute("data-loading", ds.loading ?? "lazy")
  s.setAttribute("data-emit-metadata", ds.emitMetadata ?? "0")

  s.setAttribute("data-repo", ds.repo ?? "")
  s.setAttribute("data-repo-id", ds.repoId ?? "")
  s.setAttribute("data-category", ds.category ?? "")
  s.setAttribute("data-category-id", ds.categoryId ?? "")

  s.setAttribute("data-mapping", ds.mapping ?? "pathname")
  s.setAttribute("data-strict", ds.strict ?? "1")
  s.setAttribute("data-reactions-enabled", ds.reactionsEnabled ?? "0")
  s.setAttribute("data-input-position", ds.inputPosition ?? "bottom")
  s.setAttribute("data-lang", ds.lang ?? "en")

  // Use your configurator choice
  s.setAttribute("data-theme", ds.theme ?? "preferred_color_scheme")

  container.appendChild(s)
}

const onNav = () => {
  mountIfNeeded()

  // keep discussion synced in SPA mode
  postToGiscus({
    setConfig: {
      term: window.location.pathname || "/",
    },
  })
}

const onThemeChange = (e: any) => {
  const theme = e?.detail?.theme
  if (theme !== "dark" && theme !== "light") return

  // only needed if you are not using preferred_color_scheme
  postToGiscus({
    setConfig: { theme },
  })
}

document.addEventListener("nav", onNav)
document.addEventListener("themechange", onThemeChange)

safeAddCleanup(() => document.removeEventListener("themechange", onThemeChange))

// initial
onNav()
