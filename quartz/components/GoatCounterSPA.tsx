import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const GoatCounterSPA: QuartzComponent = (_props: QuartzComponentProps) => {
  const code = `
    (function () {
      function send() {
        var gc = (window).goatcounter;
        if (gc && typeof gc.count === "function") {
          gc.count({ path: location.pathname + location.search + location.hash });
        }
      }
      send();
      document.addEventListener("nav", send);
    })();
  `

  return (
    <>
      <script
        data-goatcounter="https://YOUR_GOATCOUNTER_SUBDOMAIN.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      ></script>

      <script dangerouslySetInnerHTML={{ __html: code }} />
    </>
  )
}

export default (() => GoatCounterSPA) satisfies QuartzComponentConstructor
