const path = require("path");
module.exports = {

  title: 'vuepress-theme-blog-vuetify',
  description: '正在开发中的 Material Design 风格 Vuepress',

  port: 4000,
  dest: 'dist',
  // todo: 搞个新的 public 文件夹

  head: [
    ['link', {rel: 'icon', href: '/favicon.png'}]
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

    nav: [
      {text: 'Blog', link: '/'},
      {text: 'Tags', link: '/tag/'},
      {text: 'Archive', link: '/archive/'},
    ],

    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/vuepressjs/vuepress-theme-blog',
        },
        {
          type: 'gitlab',
          link: '/',
        },
        {
          type: 'instagram',
          link: '/',
        },
        {
          type: 'linkedin',
          link: '/',
        },
        {
          type: 'mail',
          link: '/',
        },
        {
          type: 'messenger',
          link: '/',
        },
        {
          type:'music',
          link:'/'
        },
        {
          type: 'phone',
          link: '/',
        },
        {
          type: 'twitter',
          link: 'https://twitter.com/vuepressjs',
        },
        {
          type:'video',
          link:'/'
        },
        {
          type: 'web',
          link: '/',
        },
        {
          type: 'youtube',
          link: '/'
        }
      ],
      copyright: [
        {
          text: 'lyh543 © 2019 - 2021',
        },
        {
          text: '蜀ICP备19034464号',
          link: 'https://beian.miit.gov.cn/'
        },
        {
          text: '署名 - 非商业性 - 相同方式共享 4.0 国际协议',
          link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh',
        },
      ],
    },

    // Ref: https://vuepress-theme-blog.ulivz.com/config/#directories
    directories:[
      {
        id: 'post',
        dirname: '_posts',
        path: '/',
        itemPermalink: ':regular', // Permalink for matched pages.
        pagination: { // Pagination behavior
          lengthPerPage: 10,
        },
      },
    ],

    // Ref: https://vuepress-theme-blog.ulivz.com/config/#frontmatters
    frontmatters: [
      {
        id: "tag",
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
        rss: {enable: true},
        atom: {enable: true},
        json: {enable: true},
      }
    },

    // Ref: https://vuepress-theme-blog.ulivz.com/config/#summary
    summary: true,
    summaryLength: 200,

    // Ref: https://vuepress-theme-blog.ulivz.com/config/#paginationcomponent
    paginationComponent: 'SimplePagination',
  },


  configureWebpack: {
    // resolve: {
    //   alias: {
    //     '@theme': path.resolve(__dirname, 'theme'),
    //   }
    // },
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
