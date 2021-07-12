<!-- drawer: 侧边栏的抽屉 -->
<template>
  <v-navigation-drawer
    v-model="show"
    :width="250"
    fixed
    app
  >
    <!--      ripple-->
    <v-list-item
      class="px-2"
      @click="gotoDebug"
    >
      <v-list-item-avatar>
        <v-img :src="iconPath" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title style="font-size:15px">
          {{ $site.title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list
      dense
      nav
    >
<!--      ripple-->
      <v-list-item-group color="primary">
        <template v-for="item in items">
          <v-list-item
            :key="item.title"
            v-model="item.value"
            :to="item.to"
            :href="item.href"
            :target="item.href ? '_blank' : '_self'"
            active-class="grey lighten-3"
          >
            <v-list-item-action>
              <v-icon>{{ item.value ? (item.iconOn || item.iconOff) : item.iconOff }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>


<script>
export default {
  props: {
    toggleEvent: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      clickTotal: 0,
      latestClick: 0,
      iconPath: '/logo.png',
      show: null,   //在移动设备上关闭，在桌面环境下打开
      settingsOn: false,
      items: [
        {
          title: '沙龙',
          iconOn: 'mdi-view-dashboard',
          iconOff: 'mdi-view-dashboard-outline',
          to: '/activity',
          value: false,
        },
        {
          title: '用户',
          iconOn: 'mdi-account-multiple',
          iconOff: 'mdi-account-multiple-outline',
          to: '/user',
          value: false,
        },
        {
          title: '相册',
          iconOn: 'mdi-image-multiple',
          iconOff: 'mdi-image-multiple-outline',
          to: '/gallery',
          value: false,
        },
        {
          title: 'Onedrive',
          iconOn: 'mdi-cloud',
          iconOff: 'mdi-cloud-outline',
          href: 'https://demo4c-my.sharepoint.com/:f:/g/personal/uestcmsc_demo4c_onmicrosoft_com/Eq4PHVelleJCpDcY2HqjafcB-y6J0cPalW0Pn6J0wBSaXw?e=RJNaaB',
          requireLogin: true,
          value: false,
        },
        {
          title: 'RSS',
          iconOn: 'mdi-rss',
          iconOff: 'mdi-rss',
          href: '/feed',
          value: false,
        },
      ],
      itemsAdmin: [
        {
          title: 'Onedrive 状态',
          iconOn: 'mdi-sync',
          iconOff: 'mdi-cached',
          to: '/cloud/status',
          value: false,
        },
        {
          title: 'Onedrive 管理',
          iconOn: 'mdi-lock',
          iconOff: 'mdi-lock-outline',
          href: 'https://demo4c-my.sharepoint.com/personal/uestcmsc_demo4c_onmicrosoft_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fuestcmsc%5Fdemo4c%5Fonmicrosoft%5Fcom%2FDocuments%2Fcloud%2Fpublic',
          value: false,
        },

        {
          title: '后台管理',
          iconOn: 'mdi-account-cog',
          iconOff: 'mdi-account-cog-outline',
          href: '/admin/',
          requireSuperuser: true,
          value: false,
        },
      ]
    };
  },

  watch: {
    toggleEvent() {
      this.show = !this.show;
    }
  },

  methods: {

    // 连续点击五次跳转到 debug 页面
    gotoDebug() {
      let now = Date.now();
      if (now - this.latestClick > 500) // 0.5 秒未点击就视为不连续
        this.clickTotal = 0;
      this.clickTotal++;
      if (this.clickTotal > 5) this.$router.push({name: 'Debug'});
      this.latestClick = now;
    },
  }
};
</script>
