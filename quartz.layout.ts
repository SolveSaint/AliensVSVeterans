import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.HeaderImage()],
  afterBody: [Component.GoatCounterSPA(), Component.Postscript()],
  footer: Component.Footer({
    links: {
      "AVSV Discord": "https://discord.gg/5zdc5RJByb",
      "instagram": "https://www.instagram.com/aliensvsveterans/",
	  "Contact": "mailto:contact@aliensvsveterans.com",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
beforeBody: [
  Component.ConditionalRender({
    component: Component.Breadcrumbs(),
    condition: (page) => page.fileData.slug !== "index",
  }),
  // Hide title on index page
  Component.ConditionalRender({
    component: Component.ArticleTitle(),
    condition: (page) => page.fileData.slug !== "index",
  }),
  Component.ContentMeta(),
  // Hide tags on index page
  Component.ConditionalRender({
    component: Component.TagList(),
    condition: (page) => page.fileData.slug !== "index",
  }),
],

  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
