---
title: Vue 的调试方法
date: 2021-04-22 22:11:39
tags:
- 前端
- Vue
category:
- 前端
- Vue
---

写算法、写后端开发的时候，在 IDE 打断点、条件断点、检测变量用的飞起，但是在 JS 以及 Vue 的前端开发中，这一套就有一些变化了。一是因为调试工具从各家 IDE 变为了浏览器，二是因为 Vue 的每个组件的变量不能在浏览器中直接访问，三是因为 Vue 代码需要转化为原生 JS 执行，所以看报错总会有一堆 `vue.runtime.esm.js` 之类的、来自 Vue 框架本身代码的报错，而不是指向具体某一行的报错。

经过一段时间的摸索，博主发现了几种调试的方法。

## 输出变量调试法

在刚学 C 语言、还不会用 IDE 的时候，我很喜欢使用 `printf` 输出变量进行调试。在 JavaScript 里，可以使用 `console.log()` 输出变量。

能不能在浏览器里的 Console 进行调试呢？答案也是可以的，只要在调试的时候，在代码里把 Vue 组件绑在 window 上。

在 Vue 组件的 `activated` 或 `onload` 函数开头加上一行：

```js
window.my_component = this;
```

然后就可以在浏览器 Console 窗口使用 `window.my_component` 访问到组件的 `this` 及其变量啦~

## 断点调试法

通过打断点进行调试，也是常见的调试方法之一。我们在浏览器找到自己写的代码，然后就可以在代码上打断点了。

不过，我们的代码不是在 `localhost:8080` 目录，而是在 `webpack:\\` 目录下：

不过这也是因为我配置了 webpack。如果实在找不到，还可以在 Source 这个页面按 `Ctrl+Shift+F` 全局搜索自己的代码内容；或者在你的代码的某个地方 `console.log(1)`，然后在 Console 部分找到对应的超链接跳转到代码。

## Chrome 插件 Vue.js devtools

Vue 也提供了 [Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 和 Firefox 插件，利用插件，可以方便的查看当前页面的结构，以及观察 Vuex、Vue Router 的状态。
