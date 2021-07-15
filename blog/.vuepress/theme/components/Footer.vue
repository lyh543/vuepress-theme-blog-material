<!-- footer: 底栏 -->
<template>
  <v-footer
    padless
    inset
    app
    absolute
  >
    <v-card
      tile
      width="100%"
      class="lighten-1 text-center"
    >
      <!--   第一栏是图标   -->
      <v-card-text>
        <template v-for="{icon, iconDark, href} in contact">
          <v-btn
            :key="icon"
            class="mx-4"
            :href="href"
            target="_blank"
            icon
          >
            <!--  如果不是图标文件，而是 https://materialdesignicons.com/ 图标  -->
            <v-icon
              v-if="!icon.includes('.')"
              size="24px"
            >
              {{ icon }}
            </v-icon>
            <!--  如果是图标文件，且现在是深色模式 -->
            <v-img
              v-else-if="$vuetify.theme.dark && iconDark"
              :src="iconDark"
              max-width="24px"
            />
            <!--  如果是图标文件，且现在是浅色模式 -->
            <v-img
              v-else
              :src="icon"
              max-width="24px"
            />
          </v-btn>
        </template>
      </v-card-text>
      <v-divider />

      <!--   第二栏是版权   -->
      <v-card-text>
        <template v-for="{text, link = ''} in copyright">
          <a
            v-if="link.length > 0"
            :key="text"
            :href="link"
            target="_blank"
            class="footer-link"
            v-text="text"
          />
          <span
            v-else
            :key="text"
            class="footer-text"
            v-text="text"
          />
          |
        </template>
        <span class="footer-text">
          Theme
          <a
            href="https://github.com/lyh543/vuepress-theme-blog-vuetify/"
            target="_blank"
            class="footer-link"
          >
            vuepress-theme-blog-vuetify
          </a>
        </span>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>

export default {
  data() {
    return {
      contact: [],
      copyright: []
    }
  },

  created() {
    const {contact, copyright} = this.$themeConfig.footer;
    this.contact = contact;
    this.copyright = copyright;
  }
}
</script>
