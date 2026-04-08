import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/comments.inline"

type Options = {
  options: {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string
    mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname"
    strict?: boolean
    reactionsEnabled?: boolean
    emitMetadata?: boolean
    inputPosition?: "top" | "bottom"
    lang?: string
    theme?: string
    loading?: "lazy" | "eager"
  }
}

function boolToStringBool(b: boolean): string {
  return b ? "1" : "0"
}

export default ((opts: Options) => {
  const Comments: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
    // OPT IN ONLY: show comments only when frontmatter has comments: true
    const enableComment =
      fileData.frontmatter?.comments === true || fileData.frontmatter?.comments === "true"

    if (!enableComment) return <></>

    return (
      <div
        class={classNames(displayClass, "giscus")}
        data-repo={opts.options.repo}
        data-repo-id={opts.options.repoId}
        data-category={opts.options.category}
        data-category-id={opts.options.categoryId}
        data-mapping={opts.options.mapping ?? "pathname"}
        data-strict={boolToStringBool(opts.options.strict ?? true)}
        data-reactions-enabled={boolToStringBool(opts.options.reactionsEnabled ?? false)}
        data-emit-metadata={boolToStringBool(opts.options.emitMetadata ?? false)}
        data-input-position={opts.options.inputPosition ?? "bottom"}
        data-theme={opts.options.theme ?? "preferred_color_scheme"}
        data-lang={opts.options.lang ?? "en"}
        data-loading={opts.options.loading ?? "lazy"}
      ></div>
    )
  }

  Comments.afterDOMLoaded = script
  return Comments
}) satisfies QuartzComponentConstructor<Options>
