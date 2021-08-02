const path = require("path");

const hostname = 'https://vuepress-theme-blog-material.netlify.app/';

// https://vuepress.vuejs.org/config/
module.exports = {
  title: 'vuepress-theme-blog-material',
  description: '正在开发中的 Material Design 风格 Vuepress',
  author: 'lyh543',
  email: 'lyh543@outlook.com',
  port: 4000,
  dest: 'dist',
  locales: {'/': {lang: 'en-US'}},
  // todo: change default public folder
  head: [
    ['link', {rel: 'icon', href: '/img/favicon.png'}]
  ],
  // todo: add more patterns
  patterns: ['**/*.md', '**/*.vue'],
  // https://vuepress.vuejs.org/config/#markdown
  // todo: add more markdown settings
  markdown: {
    // todo: line numbers
    lineNumbers: false,
    toc: {includeLevel: [2, 3, 4]}
  },

  /*
   * you can add your plugins here.
   * you can see which plugins are added by theme in 'theme/index.html'
   */
  plugins: [

  ],

  theme: './theme',
  /*
   * themeConfig can read in ./theme/index.js
   * and can be read as 'this.$themeConfig' in Vue Component
   */
  themeConfig: {
    dateFormat: 'YYYY-MM-DD',
    hostname: hostname,

    // nav 和 footer.contact 的图标默认来源：https://materialdesignicons.com/
    // footer.contact 也可以使用自己的图标（参考 bilibili 图标的格式）
    // 博客内链接请使用 to，外部链接请使用 href
    nav: [
      {text: '博客', iconOn: 'mdi-home', iconOff: 'mdi-home-outline', to: '/'},
      {text: '标签', iconOn: 'mdi-tag-multiple', iconOff: 'mdi-tag-multiple-outline', to: '/tag/'},
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
        {icon: '/img/bilibili.svg', iconDark: '/img/bilibili_dark.svg', href: 'https://bilibili.com/'},
      ],
      copyright: [
        {text: 'lyh543 © 2019 - 2021'},
        {text: '蜀ICP备19034464号', link: 'https://beian.miit.gov.cn/'},
        {text: '署名 - 非商业性 - 相同方式共享 4.0 国际协议', link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh'},
      ],
    },

    /****** The following themeConfig will be copied to config of @vuepress/plugin-blog ******/

    // Ref: https://vuepress-plugin-blog.ulivz.com/config/#directories
    directories: [
      {
        id: 'post',
        title: null,  // if keep null, navbar will show this.$siteTitle
        dirname: '_posts',
        layout: 'PostList',
        itemLayout: 'Post',
        path: '/',
        itemPermalink: ':regular',
        pagination: {
          lengthPerPage: 10,
        },
      },
    ],

    // Ref: https://vuepress-plugin-blog.ulivz.com/config/#frontmatters
    frontmatters: [
      {
        id: "tags",
        keys: ['tag', 'tags'],
        path: '/tag/',
        title: '标签',
        layout: 'TagList',
        scopeLayout: 'PostList',
        // todo: 去掉 vue-route 对 tags 的警告
      },
    ],

    // Ref: https://vuepress-plugin-blog.ulivz.com/config/#globalpagination
    globalPagination: {
      lengthPerPage: 10,
    },

    // Ref: https://vuepress-plugin-blog.ulivz.com/config/#comment
    // comment: {
    //   service: 'vssue',
    //   owner: 'lyh543',
    //   repo: 'lyh543.github.io',
    //   clientId: 'xxxxxxxxxxxxxxxxxxxx',
    //   clientSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    // },

    /****** The themeConfig above will be copied to config of @vuepress/plugin-blog ******/
  },

  // todo: render css as stylus
  Stylus: {

  },
  evergreen: true,

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

    // 去除链接中的 _posts
    if (regularPath.startsWith('/_posts'))
      $page.regularPath = regularPath.substr('/_posts'.length);
    // fixme： 去掉 .html
    //  clean-urls 无效，是不是上面的问题？
  },

  configureWebpack: {
    module: {
      rules: [
        {
          // 处理 webp 图片
          test: /\.(webp)$/i,
          loader: 'url-loader',
          options: {
            outputPath: 'assets/img/',
          },
        },
        {
          // 处理代码
          test: /\.(cpp|java|py|sql|json|xml)$/i,
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/code/',
          },
        },
        {
          // 处理 xlsx
          test: /\.xlsx$/i,
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/blob/',
          },
        },
      ],
    },
  }
}
