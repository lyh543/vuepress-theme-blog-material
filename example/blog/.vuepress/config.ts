import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';

export default defineUserConfig<DefaultThemeOptions>({
  title: 'vuepress-theme-blog-material',
  description: '正在开发中的 Material Design 风格 Vuepress',
  port: 4000,
  dest: 'dist',
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  head: [['link', { rel: 'icon', href: '/theme/favicon.png' }]],

  // vuepress-v1
  // patterns: ['**/*.md', '**/*.vue'],
  // markdown: {
  //   // todo: line numbers
  //   lineNumbers: false,
  //   // fixme: includeLevel is still [2, 3]
  //   toc: {includeLevel: [1, 4]}
  // },

  // vuepress-v2
  markdown: {
    // code: {
    //   lineNumbers: false,
    // }
    toc: {
      level: [1, 4],
    },
  },

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
  },
});
