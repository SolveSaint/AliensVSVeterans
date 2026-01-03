import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const CommentNotice: QuartzComponent = (props?: QuartzComponentProps) => {
    const fileData = props?.fileData
    const enabled = fileData?.frontmatter?.comments === true || fileData?.frontmatter?.comments === "true"

    if (!enabled) return <></>

    return (
      <div class="comment-notice">
        <strong>Comment Policy</strong>
        <p>Comments are moderated. Abusive, vulgar, or off topic content will be removed.</p>
      </div>
    )
  }

  return CommentNotice
}) satisfies QuartzComponentConstructor
