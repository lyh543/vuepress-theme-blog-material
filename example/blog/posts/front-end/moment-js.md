---
title: moment.js -- JavaScript 时间处理神器
date: 2021-05-07 16:33:21
tags:
- JavaScript
- 前端
category:
- JavaScript
- 前端
---

## 简介

JavaScript 自带 [Date] 类，也带了非常多的工具，但是可能真要用的时候，却发现这个功能没有、那个功能也没有。于是就有了 moment.js（[英文官网]|[中文网]）。相较 Date 类，moment 对格式化输出、多语言、多时区的支持更加友好，还有很多小工具，十分安利。

[Date]:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date
[英文官网]:https://momentjs.com/
[中文网]:http://momentjs.cn/

## 安装

官网说的很明白了：

```sh
npm install moment --save   # npm
yarn add moment             # Yarn
Install-Package Moment.js   # NuGet
spm install moment --save   # spm
meteor add momentjs:moment  # meteor
bower install moment --save # bower (废弃)
```

## 引入

为了把默认时区配置为 `zh-CN`，可以另起一个 `utils/moment.js`，编写如下内容：

```js
import moment from 'moment'
moment.locale('zh-cn');
// 可以使用 moment(datetime).toChinese() 转换为展示给用户的时间
moment.prototype.toChinese = function() {
  return this.format('YYYY 年 MM 月 DD 日 HH:mm');
}
window.moment = moment; // 可以在浏览器中测试 moment
export default moment;
```

之后引入 `moment` 都从 `utils/moment.js` 中引入：

```js
import moment from "@/utils/moment";
```

## 使用

这里仅记录我在开发过程中用到的方法。

### 读入

#### 读取当前时间

moment 和 Date 类似：

```js
Date()
// Fri May 07 2021 16:47:52 GMT+0800 (中国标准时间)
moment()
// Moment {_isAMomentObject: true, _isUTC: false, _pf: {…}, _locale: Locale, _d: Fri May 07 2021 16:47:50 GMT+0800 (中国标准时间), …}

Date.now();
// 1620377346488
moment.now();
// 1620377349595
```

#### 读取 ISO 格式时间

Django 后端给的时间是以 [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) 格式给的，类似于 `2021-05-07T08:43:17+00:00` 或 `2021-05-07T08:43:17Z`（零时区可以使用 `Z` 表示）。

Date 是可以直接读取识别的，moment 也是一样。

```js
Date('2021-05-07T08:43:17+00:00')
// "Fri May 07 2021 16:49:41 GMT+0800 (中国标准时间)"
moment('2021-05-07T08:43:17+00:00')
// Moment {_isAMomentObject: true, _i: "2021-05-07T08:43:17+00:00", _f: "YYYY-MM-DDTHH:mm:ssZ", _tzm: 0, _isUTC: false, …}
```

### 输出

#### 输出时间戳

用 `.getTime()`。

```js
new Date().getTime()
// 1620377346488
moment().getTime()
// 1620377346488
```

#### 输出为 ISO 格式

Date 可以用 `Date.prototype.toISOString()` 格式化为 UTC 时区。想要格式化为当地时区，还得靠 `moment.prototype.format()`。

```js
new Date().toISOString()
// "2021-05-07T08:55:44.282Z"

moment().format()
// "2021-05-07T16:56:08+08:00"
```

#### 格式化输出

可以在 `moment().format()` 的参数中自定义格式。具体的格式可以见 [文档](http://momentjs.cn/docs/#/parsing/string-format/)。

```js
moment().format('YYYY-MM-DD HH:mm:ss')
// "2021-05-07 17:56:58"
```

#### 输出为 x 年前 / x 分钟前

使用 `moment.prototype.fromNow()`：

```js
moment('2000-01-01T00:00Z').fromNow()
// 21 年前
```

## 其他使用方法

### 将时间长度转为 HH:mm:ss

比如想要把 `1000s` 转为 `00:16:40`。

moment 并不记录时间段，但是由于它的时间戳是从 `1970.1.1 00:00` 开始经过的毫秒数，所以可以以毫秒形式输入 `1000*1000` 然后 format 成 `HH:mm:ss`。

不过这种方法不支持一天以上的时间 2333

```js
moment.utc(1000000).format('HH:mm:ss')
// "00:16:40"
moment.utc(10000000).format('HH:mm:ss')
// "02:46:40"
moment.utc(100000000).format('HH:mm:ss')
// "03:46:40"
```

如果需要支持的话，还是自己提前算一下天数吧。或者判断一下，如果大于 `86400000` 就显示 `大于一天`。