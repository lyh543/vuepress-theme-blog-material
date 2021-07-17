const path = require("path");

module.exports = {

  title: 'vuepress-theme-blog-vuetify',
  description: '正在开发中的 Material Design 风格 Vuepress',
  author: 'lyh543',
  email: 'lyh543@outlook.com',

  port: 4000,
  dest: 'dist',
  // todo: 搞个新的 public 文件夹

  head: [
    ['link', {rel: 'icon', href: '/img/favicon.png'}]
  ],

  markdown: {
    lineNumbers: true,
    toc: {includeLevel: [2, 3, 4]}
  },

  plugins: [
    '@vuepress/plugin-back-to-top',
    'vuepress-plugin-smooth-scroll',
    'vuepress-plugin-table-of-contents',
    ['@maginapp/vuepress-plugin-katex', {delimiters: 'dollars'}],
    ['@vuepress/plugin-medium-zoom', {selector: 'img'}],
    ["@vuepress/plugin-pwa", {serviceWorker: true, updatePopup: true}],
    ['@vuepress/plugin-search', {searchMaxSuggestions: 10}],
    ['vuepress-plugin-clean-urls', {normalSuffix: '/'}],
    ['vuepress-plugin-sitemap', {hostname: 'https://blog.lyh543.cn/'}],
  ],

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

    // 去除链接中的 _posts
    if (regularPath.startsWith('/_posts'))
      $page.regularPath = regularPath.substr(7);
    // TODO： 去掉 .html。clean-urls 无效，是不是上面的问题？
  },

  theme: './theme',
  themeConfig: {
    dateFormat: 'YYYY-MM-DD',


    // nav 和 footer.contact 的图标默认来源：https://materialdesignicons.com/
    // footer.contact 也可以使用自己的图标（请仿造 bilibili 的格式）
    // 博客内链接请使用 to，外部链接请使用 href
    nav: [
      {text: '博客', iconOn: 'mdi-home', iconOff: 'mdi-home-outline', to: '/'},
      {text: '标签', iconOn: 'mdi-tag-multiple', iconOff: 'mdi-tag-multiple-outline', to: '/tag/'},
      {text: '时间线', iconOn: 'mdi-timeline', iconOff: 'mdi-timeline-outline', to: '/timeline/'},
      {text: 'RSS', iconOn: 'mdi-rss', iconOff: 'mdi-rss', href: '/feed.atom'},
      {text: '关于我', iconOn: 'mdi-account', iconOff: 'mdi-account-outline', to: '/about/'},
    ],

    footer: {
      contact: [
        {icon: 'mdi-github', href: 'https://github.com/lyh543/vuepress-theme-blog-vuetify/'},
        {icon: 'mdi-web', href: 'https://vuepress-theme-blog-vuetify.lyh543.cn/'},
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

    // Ref: https://vuepress-theme-blog.ulivz.com/config/#directories
    directories:[
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

    // Ref: https://vuepress-theme-blog.ulivz.com/config/#frontmatters
    frontmatters: [
      {
        id: "tags",
        keys: ['tag', 'tags'],
        path: '/tag/',
        // todo: 去掉 vue-route 对 tags 的警告
      },
    ],

    // Ref: https://vuepress-theme-blog.ulivz.com/config/#globalpagination
    globalPagination: {
      lengthPerPage: 10,
    },

    // Ref: https://vuepress-theme-blog.ulivz.com/config/#sitemap
    sitemap: {
      hostname: 'https://blog.lyh543.cn/'
    },
    
    // Ref: https://vuepress-theme-blog.ulivz.com/config/#comment
    // comment: {
    //   service: 'vssue',
    //   owner: 'lyh543',
    //   repo: 'lyh543.github.io',
    //   clientId: 'xxxxxxxxxxxxxxxxxxxx',
    //   clientSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    // },

    // Ref: https://vuepress-theme-blog.ulivz.com/config/#feed
    feed: {
      canonical_base: 'https://blog.lyh543.cn/',
      feeds: {
        rss: {enable: true},    // rss.xml
        atom: {enable: true},   // feed.atom
        json: {enable: true},   // feed.json
      }
    },

    // Ref: https://vuepress-theme-blog.ulivz.com/config/#summary
    summary: true,
    summaryLength: 200,

    // Ref: https://vuepress-theme-blog.ulivz.com/config/#paginationcomponent
    paginationComponent: 'SimplePagination',
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
