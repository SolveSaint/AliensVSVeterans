import { QuartzComponent, QuartzComponentProps } from "./types"

const CommentNotice: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const enabled =
    fileData.frontmatter?.comments === true || fileData.frontmatter?.comments === "true"

  if (!enabled) return <></>

  return (
    <div class="comment-notice">
      <strong>Comment Policy</strong>
      <p>Comments are moderated. Abusive, vulgar, or off-topic content will be removed.</p>
    </div>
  )
}

export default CommentNotice
