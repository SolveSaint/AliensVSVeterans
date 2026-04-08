import { h } from "preact"
import { QuartzComponentConstructor } from "./types"

const Postscript: QuartzComponentConstructor = () => {
  return () => {
    const code = `
(function () {
  function highlightActiveExplorerLink() {
    const slug = document.body && document.body.dataset ? document.body.dataset.slug : null
    if (!slug) return

    var selector = '.explorer-content a[data-for="' + CSS.escape(slug) + '"]'
    var link = document.querySelector(selector)
    if (!link) return

    document
      .querySelectorAll('.explorer-content a.is-active')
      .forEach(function (a) { a.classList.remove('is-active') })

    link.classList.add('is-active')
  }

  document.addEventListener('nav', highlightActiveExplorerLink)
  highlightActiveExplorerLink()
})()
    `.trim()

    return h("script", { dangerouslySetInnerHTML: { __html: code } })
  }
}

export default Postscript
