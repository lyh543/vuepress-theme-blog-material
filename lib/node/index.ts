import { path } from '@vuepress/utils';
import { blog } from 'vuepress-plugin-blog2';

module.exports = (themeConfig, app) => {
  console.log({ themeConfig, app });
  return {
    // 继承默认主题
    extends: '@vuepress/theme-default',

    themePlugins: [
      blog({
        filter: () => true,
        getInfo: (page) => ({
          title: page.frontmatter.title
        }),
        hotReload: true,
      }),
    ],

    layouts: path.resolve(__dirname, '../client/layouts'),
    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.ts'
    ),
    clientAppSetupFiles: path.resolve(__dirname, '../client/clientAppSetup.ts'),
  };
};
