---
title: tips for developing vuepress theme
date: 2021-08-01
tags:
- vuepress
---

## titles

There are 4 titles in vuepress:

1. `$page.frontmatter.title`: the `title` info in frontmatter on top of every markdown page.
2. `$page.title`: real title of every page.
3. `$site.title`: title of site.
4. `$title`: title that will be rendered in `<head><title></title></head>` of HTML

----------------------

You can get page title and site title by `$page.title` and `$site.title` (alias: `$siteTitle`).

`$title` will be inserted in `<head><title></title></head>`, and shown on web browser tab.

```js
class ClientComputedMixin {
  get $title() {
    const page = this.$page
    const {metaTitle} = this.$page.frontmatter
    if (typeof metaTitle === 'string') {
      return metaTitle
    }

    const siteTitle = this.$siteTitle
    const selfTitle = page.frontmatter.home ? null : (
      page.frontmatter.title // explicit title
      || page.title // inferred title
    )
    return siteTitle
      ? selfTitle
        ? (selfTitle + ' | ' + siteTitle)
        : siteTitle
      : selfTitle || 'VuePress'
  }
}
```

---------------------

To change `$page.title`, you have different ways:

1. If you are adding title for one specific markdown page, just write a frontmatter:

```md
title: Your title
---

<!-- Put Your Markdown After Front Matter -->
```

2. If you are adding for one [additional page](https://vuepress.vuejs.org/zh/plugin/option-api.html#additionalpages) in `index.js`, just add title here:

```js
additionalPages: [
  {
    path: '/debug/',
    frontmatter: {layout: 'Debug', title: '调试信息'},
  },
  {
    path: '/timeline/',
    frontmatter: {layout: 'Timeline', title: '时间线'}
  },
]
```

3. If you are handling many pages based on some rules, you can write your rules in `extendPageData()` in `config.js` or `theme/index.js`:

```js
if (!$page.title && !$page.frontmatter.title && _filePath) {
    // get file name without extension
    const defaultTitle = _filePath
        .match(/[^\/\\]+$/i)[0]  // get string after last /
        .match(/^[^.]+/i)[0];    // get string before first .
    if (_strippedContent) {
        // find all markdown headings
        const headings = _strippedContent.match(/# .+/);
        if (headings.length > 0)
            $page.title = headings[0].replace(/# +/, "");
        else
            $page.title = defaultTitle;
    } else {
        $page.title = defaultTitle;
    }
}
```

-------------

To change `$site.title`, you should change your config in `config.js`:

```js
module.exports = {
  title: 'vuepress-theme-blog-material',
}
```



## tags

You can read all tags by `$tags` in any page. This object can be read as Map or Array.

```js
// read as map
this.$tags.map.markdown
this.$tags.getItemByName('markdown')

result == {
  "key": "markdown",
  "scope": "tags",
  "path": "/tags/markdown/",
  "pageKeys": [],
  "pages": []
}
```

```js
// read as array
this.$tags.list.find(tag => tag.name == 'markdown')
this.$tags.list[0] // if markdown is the first tag

result == {
  "name": "markdown",
  "pages": [],
  "path": "/tags/markdown/"
}
```

if you are at `/tags/markdown/`, you can read `$currentTags`:

```js
this.$currentTags == {
  "key": "markdown",
  "scope": "tags",
  "path": "/tags/markdown/",
  "pageKeys": [],
  "pages": []
}
```