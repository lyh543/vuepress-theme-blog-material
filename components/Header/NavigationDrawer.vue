<!-- drawer: 侧边栏的抽屉 -->
<template>
  <v-navigation-drawer
    v-model="show"
    :width="250"
    fixed
    app
  >
    <v-list>
      <v-list-item class="px-5">
        <v-list-item-avatar size="80">
          <v-img :src="avatar_url" />
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item @click="gotoDebugAfter5Clicks">
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ author }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list
      dense
      nav
    >
      <v-list-item-group color="primary">
        <template v-for="item in items">
          <v-list-item
            :key="item.title"
            :to="item.to"
            :href="item.href"
            :target="item.href ? '_blank' : '_self'"
            active-class="grey lighten-3"
          >
            <template #default="{active}">
              <v-list-item-action>
                <v-icon>{{ active ? (item.iconOn || item.iconOff) : item.iconOff }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>


<script>
const avatar_url = '/theme/avatar.png';

export default {
  props: {
    toggleEvent: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      author: '',
      email: '',
      avatar_url,
      items: [],
      clickTotal: 0,
      latestClick: 0,
      show: null,   // null 表示在移动设备上关闭，在桌面环境下打开
      settingsOn: false,
    };
  },

  watch: {
    toggleEvent() {
      this.show = !this.show;
    }
  },

  // create 后加载导航栏的选项
  created() {
    this.author = this.$themeConfig.author;
    this.email = this.$themeConfig.email;
    this.items = this.$themeConfig.nav;
  },

  methods: {
    // 连续点击五次跳转到 debug 页面
    gotoDebugAfter5Clicks() {
      let now = Date.now();
      if (now - this.latestClick > 500) // 0.5 秒未点击就视为不连续
        this.clickTotal = 0;
      if (this.clickTotal > 5) {
        this.$router.push('/debug/');
        this.clickTotal = 0;
      } else {
        this.clickTotal++;
        this.latestClick = now;
      }
    },
  }
};
</script>
