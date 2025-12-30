import { QuartzComponent } from "./types"

const Postscript: QuartzComponent = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function () {
  function highlightActiveExplorerLink() {
    const slug = document.body?.dataset?.slug
    if (!slug) return

    const selector = '.explorer-content a[data-for="' + CSS.escape(slug) + '"]'
    const link = document.querySelector(selector)
    if (!link) return

    document
      .querySelectorAll('.explorer-content a.is-active')
      .forEach(a => a.classList.remove('is-active'))

    link.classList.add('is-active')
  }

  document.addEventListener('nav', highlightActiveExplorerLink)
  highlightActiveExplorerLink()
})()
        `,
      }}
    />
  )
}

export default Postscript
