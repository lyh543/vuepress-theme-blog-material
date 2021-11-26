// https://vuepress.vuejs.org/config/
module.exports = {
  title: 'vuepress-theme-blog-material',
  description: '正在开发中的 Material Design 风格 Vuepress',
  port: 4000,
  dest: 'dist',
  locales: {'/': {lang: 'zh-CN'}},
  head: [
    ['link', {rel: 'icon', href: '/theme/favicon.png'}]
  ],
  // todo: add more patterns
  patterns: ['**/*.md', '**/*.vue'],
  // https://vuepress.vuejs.org/config/#markdown
  // todo: add more markdown settings
  markdown: {
    // todo: line numbers
    lineNumbers: false,
    // fixme: includeLevel is still [2, 3]
    toc: {includeLevel: [1, 4]}
  },

  /*
   * you can add your plugins here.
   * you can see which plugins are added by theme in 'theme/index.html'
   */
  plugins: [
  ],

  theme: require.resolve('../../..'),

  /*
   * themeConfig can read in ./theme/index.js
   * and can be read as 'this.$themeConfig' in Vue Component
   */
  themeConfig: {
    author: 'lyh543',
    email: 'lyh543@outlook.com',
    hostname: 'https://vuepress-theme-blog-material.lyh543.cn/',
    dateFormat: 'YYYY-MM-DD',

    // nav 和 footer.contact 的图标默认来源：https://materialdesignicons.com/
    // footer.contact 也可以使用自己的图标（参考 bilibili 图标的格式）
    // 博客内链接请使用 to，外部链接请使用 href
    nav: [
      {text: '博客', iconOn: 'mdi-home', iconOff: 'mdi-home-outline', to: '/'},
      {text: '标签', iconOn: 'mdi-tag-multiple', iconOff: 'mdi-tag-multiple-outline', to: '/tags/'},
      {text: '时间线', iconOn: 'mdi-timeline', iconOff: 'mdi-timeline-outline', to: '/timeline/'},
      {text: '关于我', iconOn: 'mdi-account', iconOff: 'mdi-account-outline', to: '/about/'},
      {text: 'RSS', iconOn: 'mdi-rss', iconOff: 'mdi-rss', href: '/feed.atom'},
    ],

    footer: {
      contact: [
        {icon: 'mdi-github', href: 'https://github.com/lyh543/vuepress-theme-blog-material/'},
        {icon: 'mdi-web', href: 'https://vuepress-theme-blog-material.lyh543.cn/'},
        {icon: 'mdi-email', href: 'mailto:lyh543@outlook.com'},
        {icon: 'mdi-sina-weibo', href: 'https://weibo.com/'},
        {icon: 'mdi-wechat', href: 'https://weixin.qq.com/'},
        {icon: 'mdi-qqchat', href: 'https://qq.com/'},
        {icon: '/theme/bilibili.svg', iconDark: '/theme/bilibili_dark.svg', href: 'https://bilibili.com/'},
      ],
      copyright: [
        {text: 'lyh543 © 2019 - 2021'},
        {text: '蜀ICP备19034464号', link: 'https://beian.miit.gov.cn/'},
        {text: '署名 - 非商业性 - 相同方式共享 4.0 国际协议', link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh'},
      ],
    },


    /****** The following themeConfig will be copied to config of @vuepress/plugin-blog ******/

    // Ref: https://vuepress-plugin-blog.billyyyyy3320.com/config/#directories
    directories: [
      {
        id: 'post',
        title: null,  // keep null, and navbar will show this.$siteTitle
        dirname: 'posts',
        layout: 'PostList',
        itemLayout: 'Post',
        path: '/',
        itemPermalink: ':regular',
        pagination: {
          lengthPerPage: 10,
        },
      },
    ],

    // Ref: https://vuepress-plugin-blog.billyyyyy3320.com/config/#frontmatters
    frontmatters: [
      {
        id: "tags",
        keys: ['tags'],
        path: '/tags/',
        title: '标签',
        layout: 'TagList',
        scopeLayout: 'PostList',
      },
    ],

    // Ref: https://vuepress-plugin-blog.billyyyyy3320.com/config/#globalpagination
    globalPagination: {
      lengthPerPage: 10,
    },

    // Ref: https://vuepress-plugin-blog.billyyyyy3320.com/config/#comment
    comment: {
      service: 'vssue',
      owner: 'lyh543',
      repo: 'lyh543.github.io',
      clientId: 'xxxxxxxxxxxxxxxxxxxx',
      clientSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    },

    /****** The themeConfig above will be copied to config of @vuepress/plugin-blog ******/
  },

  // todo: render css as stylus
  Stylus: {},
  evergreen: true,

  // extendPageData($page) {
  //   // 去除链接中的 _posts
  //   if ($page.regularPath.startsWith('/_posts'))
  //     $page.regularPath = $page.regularPath.substr('/_posts'.length);
  // },
}
