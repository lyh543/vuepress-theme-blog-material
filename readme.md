# vuepress-theme-blog-vuetify

Material VuePress Blog Theme Powered By Vuetify.

## 博文路径

个人比较喜欢按文件夹对博客进行分类，URL 呈现博文的路径。如果喜欢使用日期作为 URL，可以进行配置。

## 图片

图片推荐使用相对路径，这样会交给 webpack 打包。

图片也可以使用绝对路径。其他文件最好使用绝对路径。

使用绝对路径时，请使用 `/blog/.vuepress/public` 文件夹。该文件夹下的文件会被复制到博客根目录下。

（说实话 VuePress 的设定有点怪，把博客的 public 文件和主题的 public 文件混在一起了。之后如果能改的话就尽量改）

## 代码块染色

使用 Prism 进行代码块染色。支持的语言列表请见 [Prism](https://prismjs.com/#languages-list)。

## LaTeX 公式

支持 LaTeX 公式。

行内公式：`$a+b$`

行间公式：

```latex
$$\left\{\begin{aligned}
I_0 &= 1 - e^{-1} \\
I_n &= 1-nI_{n-1} \quad (n=1,2,...)
\end{aligned} \right.$$
```

## 已知问题

* `npm run serve` 时不会生成 `sitemap.xml` 和 `rss.xml`，但是 `npm run build` 会生成。
