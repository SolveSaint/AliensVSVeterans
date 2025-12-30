import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "AVSV",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,

    analytics: {
      provider: "goatcounter",
      options: {
        url: "https://aliensvsveterans.goatcounter.com/count",
      },
    },

    locale: "en-US",

    // Docs: no protocol, no leading or trailing slashes
    baseUrl: "www.aliensvsveterans.com",

    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",

    theme: {
      defaultTheme: "dark",

      // Docs: this is the supported switch for font loading behavior.
      // true = use Google CDN caching. false = download for self contained.
      cdnCaching: true,

      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans 3",
        code: "IBM Plex Mono",
      },

      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },

  plugins: {
    transformers: [
      // Metadata first
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),

      // Presentation helpers that do not affect link syntax
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),

      // Markdown dialect and text mutation
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),

      // Derived text fields
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),

      // Links after text mutation
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),

      // Indexing and presentation after links
      Plugin.TableOfContents(),
    ],

    filters: [Plugin.RemoveDrafts()],

    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),

      // Plugin.CustomOgImages({
      //   colorScheme: "darkMode",
      //   width: 1200,
      //   height: 630,
      //   excludeRoot: false,
      //   imageStructure: ogWithBackground,
      // }),
    ],
  },
}

export default config
