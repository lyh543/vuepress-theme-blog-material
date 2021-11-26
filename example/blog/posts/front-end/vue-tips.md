---
title: Vue 学习笔记
date: 2021-02-01 16:29:59
tags:
- 前端
- Vue
category:
- 前端
- Vue
---

[Vue.js](https://cn.vuejs.org/index.html) 是一个用于创建用户界面的开源 JavaScript 框架，也是一个创建单页应用的 Web 应用框架。目前正式版迭代到了 v2。值得一提的是，Vue 的作者是国人[尤雨溪](https://www.zhihu.com/people/evanyou)，最大的好处就是文档的中文支持非常快，目前还在 v3.x-beta 的教程仅支持中英文。

[Vuetify](https://vuetifyjs.com/zh-Hans/) 是一个纯手工精心打造的 Material 样式的 Vue UI 组件库。目前迭代到了 v2。

我开发的第一个（目前也是唯一一个） Vue 应用使用的组件库就是 Vuetify。可以说，Vue + Vuetify 让我入了前端的门。在本文中，我将聊聊作为一个前端萌新，在使用 Vue 和 Vuetify 的过程中，学到的前端技巧。

## Vue 教程？

零基础开始学习 Vue，我自然想到的是看[官方教程](https://cn.vuejs.org/v2/guide/)。然而官方教程并不是那么好懂：刚看到[安装部分](https://cn.vuejs.org/v2/guide/installation.html)，教程给出的数种安装方法就让我傻了眼，无从下手。

于是尝试去找别的教程，居然发现了尤雨溪在知乎上给出的学习路线：[新手向：Vue 2.0 的建议学习顺序](https://zhuanlan.zhihu.com/p/23134551)，其中第二点的 `就只用最简单的 <script>，把教程里的例子模仿一遍，理解用法。不推荐上来就直接用 vue-cli 构建项目，尤其是如果没有 Node/Webpack 基础。` 这句，对真·零基础新手非常友好。

## Vue 开发环境

我刚入坑时，想试试使用 Typescript 来开发 Vue。有人说 WebStorm 对 TS 的支持不行，得用 VS Code，于是我就用 VS Code 写了几天 Typescript。最后，还没写完账户管理部分，就放弃 Typescript 了。

Typescript 的静态类型确实很不错，但是写 Typescript 的时候，是各种 TSLint 报类型错。我也尝试写 `.d.ts` 文件，但是又遇到了没法引入等等问题。还有就是 TSLint 认为 `this.$router` 是 `undefined`，所以 `this.$router.push()` 等等都会报错。

上面这些问题或许有方法解决，但是问题实在太多，我最后还是选择使用 JavaScript + WebStorm 开发。

回来发现，WebStorm 还对 Vue Router 和 Vuex 有支持，输入 `store.commit()` 的时候居然能够提示函数名。真香。

## 部署 Vue 应用

如果你的 Vue App 使用了 vue-router 的 [history 模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html)，目前 (2021.2) 是不能使用 GitHub Pages 部署的。

从 uri 的角度理解，是因为 GitHub Pages 服务器会默认将对 `/activities/create` 的请求理解为 `/activities/create/index.html`，而 vue-router history 模式想要服务器理解为 `/index.html`。于是， GitHub Pages 会返回 404。

我尝试了网上的 hack `404.html` 和 `200.html` 的方法，但均无效。

一个解决方案是改用 hash 模式，此模式下链接会变为 `/#/activities/create`，这个 `#`(hash) 的存在，会让服务器将这个链接理解为 `/index.html#/activities/create`。但此法会让链接变丑。

另一个解决方案是用一台服务器来部署前端。Vue Router 文档中针对不同服务器提供了部署方法。不过对于 Caddy，我使用 Vue Router 文档提供的 `rewrite` 法不能正常运行。于是改用了 `try_files`，只对 Not Found 的文件进行 rewrite：

```
example.com {
    root * /path/to/dist
    try_files {path} /index.html
    file_server
}
```

最后一个解决方案是我最后采用的，就是白嫖 [Azure 的静态 Web 应用](https://azure.microsoft.com/zh-cn/services/app-service/static/)。Microsoft Learn 还写了一篇 [教程](https://docs.microsoft.com/zh-cn/learn/modules/publish-app-service-static-web-app-api/) 供大家参考。与 GitHub Pages 不同的是，Azure Static Web App 允许使用路由，只需要在开发 Vue 应用时，将以下 `route.json` 放在 `/public/` 目录下即可（抄 MS Learn 的作业真爽）。

```json
{
  "routes": [
    {
      "route": "/*",
      "serve": "/index.html",
      "statusCode": 200
    }
  ]
}
```

------------------

后来了解到，Vercel App 也支持部署。

## Vue 页面间数据传递

页面间需要传递数据，该怎么办呢？

对于 C 语言，不同函数传递数据无非是两个办法，使用全局变量和传递参数。

在 Vue 中也是类似的思想：全局变量（window 或 Vuex.store）和传递参数（params 或 query）。

### 1. window

`window` 就是 DOM 中的全局变量，你可以通过赋值，把任何数据（当前用户信息）、甚至函数和对象（如 Vue 组件）挂到 window 下。

### 2. Vuex

[Vuex](https://vuex.vuejs.org/zh/)

`Vuex.Store` 类似于 `window`，可以在不同的页面中使用、更改这些里面的数据。那为什么还需要这个工具呢？

个人理解，Store 更强调的是**状态**。因此，它和 `window` 有两个区别：

1. Store 存储的状态是需要在定义 Store 时就给出的，而不是像 window 一样，随时都可以为其添加新的数据、删除数据。
2. Store 可以随心所欲地读取，但是不能随心所欲地修改。为了防止对数据的错误修改，Store 要求将修改数据的操作，作为函数提前写入 Store 里（这些操作函数被称为 `mutation`），然后要求页面调用这些 `mutation` 来修改数据。在严格模式下，无论何时发生数据变更且不是由 mutation 函数引起的，将会抛出错误。

### 3. Vue Router 路由时添加 params 参数

可以传递任何对象，但参数不会出现在链接中（除非在 Router 中专门设置了）。

发送方：

```js
let profile = {id: 1};
$this.router.push({
  name: 'NextPage',
  params: {
    user_profile: profile,
    user_id: 233
  }
})
```

接收方：

```js
$this.route.params.user_id // 233
$this.route.params.user_profile // {id: 1}
```

如果 RouteConfig 中定义如下：

```js
const routes = [
  {
    path: '/user/:user_id',
    name: 'UserDetail',
    component: UserDetail,
    props: true,  // props 表示 activityId 参数可以传到组件
  },
]
```

url 会变为 `/user/233`。

### 4. Vue router 路由时添加 query 参数

和上一种方法类似，但是这种方法的参数会出现在 url 中，且只能传递字符串。

发送方：

```js
$this.router.push({
  name: 'NextPage',
  query: {
    id: '1'
  }
})
```

接收方：

```js
$this.route.params.query.id // 1
```

同时链接会变为：`原url?id=1`。

## Vue 生命周期之迷惑钩子函数

生命周期，最大的作用，就是进入一个页面的时候，对这个页面进行初始化；还有就是，从别的页面切换到这个页面的时候，对这个页面的数据初始化。

如果是一个没有缓存的页面，每进入一个页面都需要进行创建并挂载，那么 `created` 和 `mounted` 这两个生命周期钩子函数，二选一，在里面写上自己的初始化代码就可以了。

而对于 Vue 来说，如果使用 [`<keep-alive>`](https://cn.vuejs.org/v2/api/#keep-alive) 包裹组件，它会缓存不活动的组件实例，等再次调用时（即使不是同一个 url）并不会发生第二次 `created` 或 `mounted`。  
这可能会导致下面这种场景：对于用户信息页面，我们进入用户 1 的页面，此时发生 `created` 和 `mounted`，页面信息显示为用户 1 的信息；然后我们切换到用户 2 的页面，此时并没有发生 `created` 或 `mounted`，页面仍显示为用户 1 的信息。

因此，我们要采取别的方法。对于 [`<keep-alive>`](https://cn.vuejs.org/v2/api/#keep-alive) 包裹的组件，官方文档直接指明使用 `activated` 和 `deactivated`。的确，把初始化代码放在 `activated` 里，就能代替 `created` 的初始化功能了。

-----------------

不过有个地方很奇怪，如果用 [`<keep-alive>`](https://cn.vuejs.org/v2/api/#keep-alive) 包裹了一个带有 `<v-tab>` 的组件（tab 下有几个子组件）。我发现，第一次加载这个页面以及子组件时，子组件并不会触发 `activated`。

经过测试后发现，第一次加载这个页面以及子组件时，子组件并不会触发 `activated`只会触发 `created`；而在后面几次进入时，每次都会触发 `activated`，而不会触发 `created`。

目前尚不清楚不清楚为什么会这样。不过这样的话，可以改用 `created` 加 `activated`：将初始化函数封装为组件的一个 method，然后把 `created` 和 `activated` 写成调用这个 method：

```js
export default {
  //...

  methods: {
    //...

    fetchData() {
      // 初始化代码
      // ...
      // ...
    }
  },

  created() {
    this.fetchData();
  },

  activated() {
    this.fetchData();
  }
};
```

## 在单向数据流中实现双向同步数据

父组件使用 `.sync` 修饰符：

```html
<text-document v-bind:title.sync="myTitle"></text-document>
```

-----------

子组件使用 `computed`：

```js
  computed: {
    indexInternal: {
      get() {
        return this.index;
      },
      set(val) {
        this.emit('update:index', val);
      }
    },
  }
```
----------------------

子组件也可以使用 `watch`：

```js

  watch: {
    // 外部变量
    index() {
      if (this.indexInternal !== this.index) {
        this.indexInternal = this.index;
      }
    },
    // 内部变量
    indexInternal() {
      if (this.indexInternal !== this.index) {
        this.$emit('update:index', this.indexInternal);
      }
    },
  }
```

## Vuex 模块化太难用？

尝试一下 [vuex-pathify](https://github.com/davestewart/vuex-pathify)！其核心语法就如下图：

另外还直接提供了 `get`（类似于 mapGetters 的单向数据流）和 `sync`（这是 Vuex 没有的双向数据流！）。

----------------

但是啊但是，Webstorm 完全不支持对 vuex-pathify 进行自动补全，重构代码太麻烦了，再加上不熟悉 vuex-pathify，最终还是放弃了 vuex-pathify。~~快进到放弃 Vue 2~~

## Vuetify 间距系统

在抄 Vuetify 示例组件的时候常常看到 `class = "ma-0"` 等此类标识，这个是什么呢？

Vuetify 深受 Bootstrap 的启发，在这部分也一样。我在 Google 找到了 [Bootstrap 的间距](https://getbootstrap.com/docs/4.0/utilities/spacing/)。大概意思是：

`ma-0`

* `m` 表示 `margin`；也可以取 `p` 表示 `padding`；
* `a` 表示 `all`；也可以取 `t` `b` `l` `r` 分别表示四边；也可以使用 `x` 和 `y` 分别表示左右和上下；
* `0` 表示设置为 `0`；也可以取 1~5，间距从 0 依次增大；还可以取 `auto`。

所以，可以理解为 `class="ma-0"` 是 `style="margin: 0 !important"` 的简写。

------------------------

而 Vuetify 的 `ma-1` 和 Bootstrap 有一点不同，在最后的数字上：

* Vuetify 的数字取值范围在 `0~16`，且每个单位都代表 4px（即 `16` 代表 64px），还可以使用 `n16` 表示负 64px；而 Bootstrap 的 0 到 5 是从 `0` 到 `$spacer * 3` 不均匀增加的。

在 `vuetify.css` 也能看到这部分的定义：

## Vuetify 网格系统

Vuetify 网格深受 [Bootstrap 网格](https://getbootstrap.com/docs/4.0/layout/grid/)的启发，所以如果有 Bootstrap 基础，Vuetify 上手应该会很快，反之亦然。~~可惜我都没有~~

Vuetify 网格系统包含四个核心子组件：

* `v-container` 代表一个网格
* `v-row` 代表一行 (row)
* `v-col` 代表一列 (column)。注意 `v-col` 必须是 `v-row` 的子组件，即一定是 `v-container` > `v-row` > `v-col` 的顺序
* `v-spacer`：可以在 `v-row` 之间或 `v-col` 之间放置一个 `v-spacer`，这样父子组件之间的剩余宽度就会被分配到这里

下面我将借助两个实际的例子聊聊网格系统的作用。

-----------------

问：上图中用个几个网格 `v-container`？

答案是两个。

我刚接触 Vuetify 的时候，也觉得只需要一个网格将表单框起来、每个 row 对应一个输入项就可以了。

然而，当我只使用一个 `v-container` 时，效果图是这样的：

可以看到，最外层的 `v-card` 和边框合为一体了。而如果在 `v-card` 外面加一层 `v-container` `v-row` `v-col`，就可以把 `v-card` 框在中间的位置。

第一张图的部分代码如下：

```html
<template>
  <!-- 外层的 container、row、col 是为了限制 card 的布局 -->
  <v-container>
    <v-row class="justify-center">
      <v-col xs="12" md="8">
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="register">
              <!-- 内层的 container、col 是为了限制 form 的布局 -->
              <v-container>

                <v-col>
                  <v-text-field/>
                </v-col>

                <!-- 更多 text-field -->

                <v-col>
                  <v-text-field/>
                </v-col>

              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
```

[完整代码](https://github.com/uestc-msc/uestcmsc_webapp_frontend/blob/b7c51c915d28dda1c6058fa34b85764bacac29a2/src/components/sites/account/signup.vue)

顺便一提，Vuetify 网格系统文档中介绍到，Vuetify 配备了一个使用 flexbox 构建的 12 格网格系统。`<v-col xs="12" md="8">` 表示，对于 md 的屏幕，这列将占 8 格，也就是 2/3；对于 xs 的屏幕，这列将占据 12 格，也就是全部。

这和 Bootstrap 是也类似的，所以如果在 Vuetify 中遇到不懂的概念，除了在 Vuetify 文档中搜索，还可以尝试在 Bootstrap 里搜索。

-------------------------

再来一个例子，下图中用了几个网格系统？

答案是 3 个，在下图中有标出：

完整代码：

## 把别人的组件封装成自己的

### 无脑复制

大多数后端项目的缩进都是 4 spaces，但前端则是使用 2 spaces。因为前端实在是太容易套娃了，随随便便就能搞个五层、十层以上。上面的例子用了三个网格系统，每一个网格系统对应一个 `v-container`、`v-row` 和 `v-column`，光是网格系统也有九层缩进了……

所以，将别人的组件封装成自己的，不仅能减少重复代码量，还能大幅减少缩进。

比如，上面的[网格部分](#vuetify-网格系统)提到，最外层的 `v-card` 都需要加一个网格系统。所以我做了如下封装：

```html
<!-- /src/components/ui/base/simple-card.vue -->
<template>
  <v-container>
    <v-row class="justify-center">
      <v-col  xs="12" md="8">
        <v-card>
          <v-card-text>
            <slot/> <!--  这里会把调用 VuetifyCard 处的 <VuetifyCard> </VuetifyCard> 之间的代码插入  -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
};
</script>
```

这样，网格系统例 1 的部分代码就可以缩减为如下：

```html
<template>
  <VuetifyCard>
    <v-form @submit.prevent="register">
      <!-- 内层的 container、col 是为了限制 form 的布局 -->
      <v-container>

        <v-col>
          <v-text-field/>
        </v-col>

        <!-- 更多 text-field -->

        <v-col>
          <v-text-field/>
        </v-col>

      </v-container>
    </v-form>
  </VuetifyCard>
</template>

<script>
import VuetifyCard from "@/components/ui/base/simple-card";

export default {
  components: {VuetifyCard},
}
</script>
```

直接少了 4 层缩进。

### 把父组件 props 传递给子组件 props

现在的需求是，有些页面不想用 `xs="8"`，而想用 `xs="6"`。用编程中的函数来讲，就是想要默认参数。我们想要使用：

```html
<template>
  <
    VuetifyCard
    md="6"
  >
  <!-- ... -->
  <VuetifyCard>
</template>
```

就能在子组件中渲染出 `<v-col md="6">`。而在其他时候，依然渲染 `<v-col md="8">`。

只需要使用在子组件的 component 定义中添加 `props` 即可。

```html
<!-- /src/components/ui/base/simple-card.vue -->
<template>
  <v-container>
    <v-row class="justify-center">
      <v-col :xs="xs" :md="md">
        <v-card>
          <v-card-text>
            <slot/> <!--  这里会把调用 VuetifyCard 处的 <VuetifyCard> </VuetifyCard> 之间的代码插入  -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  props: {
    xs: {
      type: Number,
      default: 12
    },
    md: {
      type: Number,
      default: 8
    }
  }
};
</script>
```

props 就类似于函数的参数，`default` 即是默认参数。

### 将父组件所有多余的 props 自动传给子组件

这个问题出现在我想要封装 [tooltips](https://vuetifyjs.com/zh-Hans/components/tooltips/) 和 [fab](https://vuetifyjs.com/zh-Hans/components/floating-action-buttons/) 的时候。

首先我们依照 Vuetify 给的模板编写的可用的代码如下：

```html
<template>
  <!-- 鼠标放置按钮之上可以看到提示 -->
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        large
        buttom
        absolute
        right
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </template>
    <span>Tooltips</span>
  </v-tooltip>
</template>
```

我们先按上文，将 Tooltips 和 图标的内容改为 props：

```html
<!-- /src/components/ui/base/floating-action-button.vue -->
<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        large
        buttom
        absolute
        right
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'mdi-plus'
    },
    tooltip: {
      type: String,
      default: ''
    }
  },
};
</script>
```

这样就可以通过下面的形式调用这个组件了。

```html
<template>
  <FloatingActionButton />
</template>

<script>
import FloatingActionButton from "@/components/ui/base/floating-action-button";

export default {
  components: {FloatingActionButton},
}
</script>
```

自定义了 `tooltip` 和 `icon` 后我们发现，由于 `v-btn` 上能设置的属性可就太多了（如 `disabled` `color` `loading` 等等），把这些一个一个写到 props 里，实在不美观。有没有简洁的方法，使得我写 `<FloatingActionButton loading disabled/>` 就能把这两个参数传给子组件的 `v-btn` 中呢？

----------------

Vue [文档](https://cn.vuejs.org/v2/guide/components-props.html#%E9%9D%9E-Prop-%E7%9A%84-Attribute)中提到了这种情况。Vue 把这里的 `disabled` `color` 等称为**非 Prop 的 Attribute**。

> 一个**非 prop 的 attribute** 是指传向一个组件，但是该组件并没有相应 prop 定义的 attribute。

文档指出，这些非 prop 的 attribute，会默认替换/合并**根组件**已有的 attribute。不巧的是，我们的 `<FloatingActionButton>` 的根组件是 `<v-tooltips>`，所以这些 attribute 被默认放到了 `<v-tooltips>` 上。

为了打破这种默认情况，我们需要先在 component 定义中加入 `inheritAttrs: false` 禁止继承给根组件 `<v-tooltips>`，然后手动给需要的组件绑定 `$attrs`，类似于下面：

```html
<!-- /src/components/ui/base/floating-action-button.vue -->
<template>
  <!-- 鼠标放置按钮之上可以看到提示 -->
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        large
        buttom
        absolute
        right
        v-bind="attrs"
        v-bind="$attrs"
        v-on="on"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  inheritAttrs: false,
  // 不让组件的根元素继承 attribute，而手动将 $attrs 赋给 v-btn
  props: {
    icon: {
      type: String,
      default: 'mdi-plus'
    },
    tooltip: {
      type: String,
      default: ''
    }
  },
};
</script>
```

对于其他组件，就是这个效果。然而，对于这个组件，问题在于 Vuetify 的模板代码包含了一个 `v-bind="attrs"`，和我们的 `v-bind` 冲突了。我们需要把这两个 `v-bind` 合并。

而对于 JS，可以使用 `{...$attrs, ...attrs}` 的语法合并这两个 Object 为一个。于是，我们将 `template` 部分代码改为：


```html
<!-- /src/components/ui/base/floating-action-button.vue -->
<template>
  <!-- 鼠标放置按钮之上可以看到提示 -->
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        large
        buttom
        absolute
        right
        v-bind="{...$attrs, ...attrs}"
        v-on="on"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>
```

就可以使用了。

```html
<FloatingActionButton
  icon="mdi-pencil"
  color="primary"
  tooltip="编辑"
  @click="gotoEditUserDetail"
/>
```

### 让子组件 click 事件能触发父组件的 v-on:click 事件

还是接着上面的 tooltips + fab。

其实非常简单，只需要在 template 中添加一行 `@click="$emit('click')"`，让子组件 `<v-btn>` 的 `v-on:click` 事件设置为触发 `click` 事件，让其向上传递即可，如下：

```html
<!-- /src/components/ui/base/floating-action-button.vue -->
<template>
  <!-- 鼠标放置按钮之上可以看到提示 -->
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        large
        buttom
        absolute
        right
        v-bind="{...attrs, ...$attrs}"
        v-on="on"
        @click="$emit('click')"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>
```

`<script>` 部分则完全不需要修改。

### 嵌套 slot

这里的场景是想要把某个自定义组件封装成一个组件（下称为中间层），以供（外层）复用。该自定义组件中用到的 Vuetify 组件（内层）用到了 slot 语法，想把这个内层的 slot 暴露给外层。

外层的写法和 Vuetify 的写法一样：

```html
<PasswordEditDialog
  :user="userProfile"
>
  <template v-slot:activator="{on, attrs}">
    <v-btn
      color="warning"
      v-bind="attrs"
      v-on="on"
    >
      修改密码
    </v-btn>
  </template>
</PasswordEditDialog>
```

中间层需要注意的是， `v-bind` 的东西是整个`插槽 prop`：

```html
<v-dialog
  v-model="dialog"
  transition="dialog-bottom-transition"
>
  <template v-slot:activator="defaultProps">
    <slot  name="activator" v-bind="defaultProps"/>
  </template>
</v-dialog>
```

## Vuetify 网格居中

对于我来说，居中、向右对齐一直是个头疼的问题。各种组件的对齐方法都不同，况且对齐还分为了上下对齐和左右对齐。网上似乎也没有什么总结性的帖子，就只好记录一下自己编码的时候遇到的坑了。

但是最后发现遇到的大部分问题都可以用网格系统来解决。

### 网格系统中的居中理论

网格系统中，如果想要上下对齐，可以使用 `<v-row>` 的 `align` 和 `align-content` 属性；想要左右对齐，可以使用 `<v-row>` 的 `justify` 属性。[ v-row 文档](https://vuetifyjs.com/zh-Hans/api/v-row/)

对于 `align` 和 `align-content` 的区别，请看：[知乎 - 弹性盒子 align-items 与 align-content 的区别](https://zhuanlan.zhihu.com/p/87146411)。简单来说，`align` 或 CSS 中的 `align-items` 控制当前行中的列的行为，而 `align-content` 控制的是所有行的行为。

上图是 `align`，下图是 `align-content`。

----------------------------

而 `<v-col>` 也提供了一个 `align-self`，不过不知道有什么用。[v-col 文档](https://vuetifyjs.com/zh-Hans/api/v-col/)

### 利用 css text-align 居中

但是以上都没有解决我的需求。我的需求是让下面的 button 能在网格居中，而不是像下图一样靠左。

在 Google “按钮居中 css” -- 跳转到 [csdn](https://blog.csdn.net/xiasohuai/article/details/80613404) 找到了一种方法：在按钮的上一层（在这里就是 `<v-col>`）加一个 css: `text-align: center`：

```html
<v-col style="text-align: center">
```

但是这个方法并不能使右边的 `v-switch` 居中（可能只能居中文字？）。

----------

顺便一提，Vuetify 中，`style="text-align: center"` 可以用 `class="text-center"` 简写。

### 利用 v-row justify center

真正的解决方法在 [GitHub issue](https://github.com/vuetifyjs/vuetify/issues/7741) 上找到了：在 `<v-col>` 内 再添加一层 `<v-row justify="center">`：

```html
<v-container>
  <v-row align="center">
    <v-col cols="4">
      <v-row justify="center">
        <v-fade-transition>
          <v-btn
            color="warning"
            @click="showChangePasswordForm=!showChangePasswordForm"
          >
            {{ showChangePasswordForm ? '不想改了' : '修改密码' }}
          </v-btn>
        </v-fade-transition>
      </v-row>
    </v-col>

    <v-col cols="4">
      <v-row justify="center">
        <v-switch
          label="订阅邮件推送"
          v-model="userProfile.subscribe_email"
          :disabled="submitting"
        />
      </v-row>
    </v-col>

    <v-col cols="4">
      <v-row justify="center">
        <v-btn
          :disabled="!formValid"
          :loading="submitting"
          :color="submitColor"
          @click="submit"
        >
          <v-icon v-if="success">
            mdi-check
          </v-icon>
          <template v-else>
            更新信息
          </template>
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
<v-container>
```

### 利用 v-row fill-height 上下居中

在阅读 [利用 `<v-img>` 构建一个 Gallery](https://vuetifyjs.com/zh-Hans/components/images/#section-6805683c) 的代码中注意到，示例代码能让 `<v-progress-circular>` 上下和左右居中。

使用 `v-row` 就可以完成左右居中，而必须同时加上 `v-row class="fill-height ma-0"` 才可以上下居中。

## Vuetify 显示头像

Vuetify 用一个 `v-card` 来展示头像、用 `v-responsive` 控制 card 为正方形、再配上 `v-skeleton-loader` 作为占位符会比较舒服。

```html
<v-container>
  <v-row align="end">
    <v-col cols="4">
      <v-row justify="start">
      <v-card>
        <v-responsive aspect-ratio="1" width="200px">
        <v-img
          :src="userProfile.avatar_url"
          aspect-ratio="1"
        >
          <template v-slot:placeholder>
              <v-responsive>
                <v-skeleton-loader type="image@3"/>
                <!--  一个 image 固定 200px，要想 height 变大，就得多几个 image  -->
              </v-responsive>
          </template>
        </v-img>
        </v-responsive>
      </v-card>
      </v-row>
    </v-col>
  </v-row>
</v-container>
```

额 就是编码 gif 的时候颜色有点失真。

## 编辑页面弹窗阻止用户退出

直接 Google 没搜到结果，过几天换了一个关键词搜，居然就搜到了。

[文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload)

文档说的很清楚了。放在 Vue 里面，如果放弃老浏览器的兼容，直接在 `activated` 函数加一行即可。另外，退出页面时也记得取消这个函数。

```html
<script>
export default {
  //...
  activated() {
    window.onbeforeunload = () => '系统可能不会保存您所做的更改。';

    // 其他 activated 触发的事件
  },

  deactivated() {
    window.onbeforeunload = null;
  },
}
</script>
```

顺便一提，由于安全问题，弹窗显示的内容在较新的浏览器中都不允许自定义。

## to 和 href

对于超链接和路由，可以使用 Vue Router 提供的 `to` 属性，也可以使用 html 提供的 `href` 属性。`to` 属性经过编译后也会变成 `href` 属性。

二者的区别在于：

1. `to` 只能针对 Vue 内的页面，`href` 对 Vue 内外的页面都可以使用；
2. `to` 跳转 Vue 内页面不会刷新、不会丢失 Store 数据，而 `href` 会；

二者对不同 url 的表现如下：

属性-值|`to`|`href`
-|-|-
`/` 开头的页内链接，如 `/foo/bar`|跳转|跳转
完整 url，如 `https://google.com/`|强行解释为站内链接，错误错误|跳转
Vue Router 语法，如 `{name: 'foo'}`|跳转|不跳转

所以，结论就是：对站内的链接用 `to`，对站外的链接用 `href`。

如果一个 Array（比如侧边栏）包含跳转到站内的 item，也包含跳转到站外的 item 呢？

答案是：混用 `to` 和 `href`！

```html
<!-- 部分 html -->
<template v-for="item in items">
  <v-list-item
    :to="item.to"
    :href="item.href"
    ripple
    active-class="grey lighten-3"
  >
    <v-list-item-action>
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: '活动',
          icon: 'mdi-compass',
          to: '/activity',
        },
        {
          title: '用户',
          icon: 'mdi-account-multiple',
          to: '/user',
        },
        {
          title: '相册',
          icon: 'mdi-image-multiple',
          to: '/gallery',
        },
        {
          title: '云盘',
          icon: 'mdi-cloud',
          href: 'https://drive.google.com/',
        }
      ]
    }
  }
}
```

编译出来后，每个标签都包含且包含一个 `href` 属性。


