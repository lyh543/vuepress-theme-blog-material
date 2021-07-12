const removeMd = require("remove-markdown");
const path = require("path");
const pick = require("lodash/pick");

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
      fonts: path.resolve(__dirname, "fonts"),
      '@theme': path.resolve(__dirname, '.'),
    },

    // Generate summary.
    extendPageData($page) {
      const {
        _filePath,           // 源文件的绝对路径
        _computed,           // 在构建期访问全局的计算属性，如：_computed.$localePath.
        _content,            // 源文件的原始内容字符串
        _strippedContent,    // 源文件剔除掉 frontmatter 的内容字符串
        key,                 // 页面唯一的 hash key
        frontmatter,         // 页面的 frontmatter 对象
        regularPath,         // 当前页面遵循文件层次结构的默认链接
        path,                // 当前页面的实际链接（在 permalink 不存在时，使用 regularPath ）
      } = $page

      // 我也不知道为什么在这里去除链接中的 _posts 就会报错
      // if (regularPath.startsWith('/_posts'))
      //   $page.regularPath = regularPath.substr(7);

      if (!_strippedContent) {
        return;
      }
      if (themeConfig.summary) {
        $page.summary =
          removeMd(
            _strippedContent
              .trim()
              .replace(/^#+\s+(.*)/, "")
              .slice(0, themeConfig.summaryLength)
          ) + " ...";
        $page.frontmatter.description = $page.summary;
      }
      if ($page.frontmatter.summary) {
        $page.frontmatter.description = $page.frontmatter.summary;
      }
    }
  };

  return config;
};
