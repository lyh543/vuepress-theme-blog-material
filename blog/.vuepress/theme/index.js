const removeMd = require("remove-markdown");
const path = require("path");

/**
 * get file name without extension
 * @param filePath {String}
 * @returns {String}
 */
function getFileNameWithoutExtension(filePath) {
  return filePath
    .match(/[^\/\\]+$/i)[0]  // get string after last /
    .match(/^[^.]+/i)[0];    // get string before first .
}


/**
 * guess headings from Markdown content
 * @param content {String} Markdown content
 * @returns {String | null} title,
 */
function getFirstMarkdownHeading(content) {
  if (!content)
    return null;
  const headings = content.match(/# .+/);
  if (headings.length > 0)
    return headings[0].replace(/# +/, "");
  else
    return null;
}


module.exports = themeConfig => {
  // default config for themeConfig
  const defaultThemeConfig = {};
  // default options for @vuepress/plugin-blog
  const defaultBlogPluginOptions = {};

  themeConfig = Object.assign(themeConfig, defaultThemeConfig);

  const themeConfigPluginProperties = [
    "directories",
    "frontmatters",
    "globalPagination",
    "sitemap",
    "comment",
    "newsletter",
    "feed"
  ];

  const pick = (o, props) => Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
  const themeConfigPluginOptions = pick(themeConfig, themeConfigPluginProperties);
  const blogPluginOptions = Object.assign(
    {},
    defaultBlogPluginOptions,
    themeConfigPluginOptions
  );
  const plugins = [["@vuepress/blog", blogPluginOptions]];

  const config = {
    plugins,
    define: {
      THEME_BLOG_PAGINATION_COMPONENT: themeConfig.paginationComponent
        ? themeConfig.paginationComponent
        : "Pagination"
    },
    alias: {
      '@style': path.resolve(__dirname, 'styles'),
      '@config': path.resolve(__dirname, '../config.js'),
      '@public': path.resolve(__dirname, '../public'),
    },

    extendPageData($page) {
      const {
        _filePath,           // file's absolute path
        _computed,           // access the client global computed mixins at build time, e.g _computed.$localePath.
        _content,            // file's raw content string
        _strippedContent,    // file's content string without frontmatter
        key,                 // page's unique hash key
        frontmatter,         // page's frontmatter object
        regularPath,         // current page's default link (follow the file hierarchy)
        path,                // current page's real link (use regularPath when permalink does not exist)
      } = $page

      /*
       * idk why building failed if we removed the '_posts' from regularPath
       * so I have to do it in config.js
       */
      // if (regularPath.startsWith('/_posts'))
      //   $page.regularPath = regularPath.substr(7);

      /*
       * Generate summary.
       * description in frontmatter > generated summary
       */
      if ($page.frontmatter.summary) {
        $page.frontmatter.description = $page.frontmatter.summary;
      } else if (_strippedContent && themeConfig.summary) {
        $page.summary =
          removeMd(
            _strippedContent
              .trim()
              .replace(/^#+\s+(.*)/, "")
              .slice(0, themeConfig.summaryLength)
          ) + " ...";
        $page.frontmatter.description = $page.summary;
      }

      /*
       * Generate Title for posts if it exists in neither $page nor frontmatter
       */
      if ($page.title) {
        // do nothing
      } else if ($page.frontmatter.title) {
        $page.title = $page.frontmatter.title;
      } else if (_filePath) {
        const guessTitle = getFirstMarkdownHeading(_strippedContent);
        const defaultTitle = getFileNameWithoutExtension(_filePath);
        $page.title = guessTitle ? guessTitle : defaultTitle;
      }
    }
  };
  return config;
};
