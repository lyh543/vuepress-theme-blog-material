const { path } = require('@vuepress/utils');
const { blog } = require('vuepress-plugin-blog2');

module.exports = (themeConfig, app) => {
  console.log({ themeConfig, app });
  return {
    // 继承默认主题
    extends: '@vuepress/theme-default',

    plugins: [
      blog({
        filter: () => {},
        getInfo: (page) => {
          page.frontmatter.title;
        },
        hotReload: true,
      }),
    ],

    layouts: path.resolve(__dirname, 'layouts'),
  };
};
