<!-- footer: 底栏 -->
<template>
  <v-footer
    padless
    inset
    app
    absolute
  >
    <v-card
      text
      tile
      width="100%"
      class="lighten-1 text-center"
    >
      <v-card-text>
        <template v-for="(item, index) in items">
          <v-btn
            :key="item.icon"
            class="mx-4"
            :href="item.href"
            target="_blank"
            icon
          >
            <v-icon
              v-if="!item.iconLocal"
              size="24px"
            >
              {{ item.icon }}
            </v-icon>
            <v-img
              v-else-if="$vuetify.theme.dark && item.iconDark"
              :src="item.iconDark"
              max-width="24px"
            />
            <v-img
              v-else
              :src="item.icon"
              max-width="24px"
            />
          </v-btn>
          <br v-if="index === 2 && $vuetify.breakpoint.width < 500">
        </template>
      </v-card-text>

      <v-divider />

      <v-card-text>
        Copyright © 2002-{{ new Date().getFullYear() }} UESTC-MSC
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    items: [{
      icon: 'mdi-home',
      href: 'https://uestc-msc.github.io/'
    },
    {
      icon: 'mdi-github',
      href: 'https://github.com/uestc-msc/uestcmsc_webapp_frontend/'
    },
    {
      icon: 'mdi-email',
      href: 'mailto:uestcmsc@demo4c.onmicrosoft.com'
    },
    {
      icon: '/img/bilibili.svg',
      iconDark: '/img/bilibili-dark.svg',
      iconLocal: true,
      href: 'https://space.bilibili.com/456910030/' // 当 mdi 库中不存在图标时，可以自己提供 png 或 svg
    },
    {
      icon: 'mdi-wechat',
      href: 'https://mp.weixin.qq.com/s/0Zf5wau55u2-x4L2ngpSQQ'
    },
    {
      icon: 'mdi-sina-weibo',
      href: 'https://weibo.com/uestcmstc'
    }],
  })
}
</script>