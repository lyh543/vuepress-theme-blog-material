<!--<template>-->
<!--  <footer class="footer">-->
<!--    <div class="footer-left-wrap">-->
<!--      <ul-->
<!--        v-if="contact"-->
<!--        class="contact"-->
<!--      >-->
<!--        <li-->
<!--          v-for="item in contact"-->
<!--          :key="item.iconComponent"-->
<!--          class="contact-item"-->
<!--        >-->
<!--          <NavLink :link="item.link">-->
<!--            <component :is="item.iconComponent" />-->
<!--            {{ item.text }}-->
<!--          </NavLink>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->

<!--    <div class="footer-right-wrap">-->
<!--      <ul-->
<!--        v-if="copyright"-->
<!--        class="copyright"-->
<!--      >-->
<!--        <li-->
<!--          v-for="item in copyright"-->
<!--          :key="item.text"-->
<!--          class="copyright-item"-->
<!--        >-->
<!--          <NavLink-->
<!--            v-if="item.link"-->
<!--            :link="item.link"-->
<!--          >-->
<!--            {{ item.text }}-->
<!--          </NavLink>-->
<!--          <template v-else>-->
<!--            {{ item.text }}-->
<!--          </template>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
<!--  </footer>-->
<!--</template>-->

<!--<script>-->
<!--import {-->
<!--  CodepenIcon,-->
<!--  CodesandboxIcon,-->
<!--  FacebookIcon,-->
<!--  GithubIcon,-->
<!--  GitlabIcon,-->
<!--  GlobeIcon,-->
<!--  InstagramIcon,-->
<!--  LinkedinIcon,-->
<!--  MailIcon,-->
<!--  MessageSquareIcon,-->
<!--  MusicIcon,-->
<!--  PhoneIcon,-->
<!--  TwitterIcon,-->
<!--  VideoIcon,-->
<!--  YoutubeIcon,-->
<!--} from 'vue-feather-icons'-->

<!--export default {-->
<!--  components: {-->
<!--    CodepenIcon,-->
<!--    CodesandboxIcon,-->
<!--    FacebookIcon,-->
<!--    GithubIcon,-->
<!--    GitlabIcon,-->
<!--    GlobeIcon,-->
<!--    InstagramIcon,-->
<!--    LinkedinIcon,-->
<!--    MailIcon,-->
<!--    MessageSquareIcon,-->
<!--    MusicIcon,-->
<!--    PhoneIcon,-->
<!--    TwitterIcon,-->
<!--    VideoIcon,-->
<!--    YoutubeIcon,-->
<!--  },-->

<!--  computed: {-->
<!--    contact() {-->
<!--      return (-->
<!--        (this.$themeConfig.footer && this.$themeConfig.footer.contact) ||-->
<!--        []-->
<!--      )-->
<!--        .map(({ type, link }) => {-->
<!--          return {-->
<!--            iconComponent: this.getIconComponentName(type),-->
<!--            link,-->
<!--          }-->
<!--        })-->
<!--        .filter(({ iconComponent }) => iconComponent)-->
<!--    },-->

<!--    copyright() {-->
<!--      return (-->
<!--        (this.$themeConfig.footer && this.$themeConfig.footer.copyright) || []-->
<!--      )-->
<!--    },-->
<!--  },-->

<!--  methods: {-->
<!--    getIconComponentName(contactType) {-->
<!--      switch (contactType) {-->
<!--        case 'codepen':-->
<!--          return 'CodepenIcon'-->
<!--        case 'codesandbox':-->
<!--          return 'CodesandboxIcon'-->
<!--        case 'facebook':-->
<!--          return 'FacebookIcon'-->
<!--        case 'github':-->
<!--          return 'GithubIcon'-->
<!--        case 'gitlab':-->
<!--          return 'GitlabIcon'-->
<!--        case 'instagram':-->
<!--          return 'InstagramIcon'-->
<!--        case 'linkedin':-->
<!--          return 'LinkedinIcon'-->
<!--        case 'mail':-->
<!--          return 'MailIcon'-->
<!--        case 'messenger':-->
<!--          return 'MessageSquareIcon'-->
<!--        case 'music':-->
<!--          return 'MusicIcon'-->
<!--        case 'phone':-->
<!--          return 'PhoneIcon'-->
<!--        case 'twitter':-->
<!--          return 'TwitterIcon'-->
<!--        case 'video':-->
<!--          return 'VideoIcon'-->
<!--        case 'web':-->
<!--          return 'GlobeIcon'-->
<!--        case 'youtube':-->
<!--          return 'YoutubeIcon'-->
<!--        default:-->
<!--          return ''-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style lang="stylus" scoped>-->
<!--ol, ul-->
<!--  list-style none-->
<!--  margin 0-->
<!--  padding 0-->

<!--.footer-->
<!--  min-height 60px-->
<!--  box-sizing border-box-->
<!--  background-color $footerBgColor-->
<!--  display flex-->
<!--  padding 15px 32px-->

<!--  .footer-left-wrap-->
<!--    line-height 30px-->
<!--    flex 1-->
<!--    display flex-->

<!--    .contact-->
<!--      display flex-->
<!--      flex-wrap wrap-->
<!--      justify-content center-->

<!--      .contact-item-->
<!--        margin-right 10px-->

<!--        a-->
<!--          font-size 12px-->
<!--          color $footerColor-->
<!--          text-decoration none-->
<!--          transition color 0.3s-->

<!--          &:hover-->
<!--            color #FFF-->

<!--  .footer-right-wrap-->
<!--    flex 1-->
<!--    display flex-->
<!--    align-items center-->
<!--    justify-content center-->

<!--    @media (min-width: $MQNarrow)-->
<!--      justify-content flex-end-->

<!--    .copyright-->
<!--      display flex-->
<!--      justify-content flex-end-->

<!--      .copyright-item-->
<!--        flex 0 0 auto-->
<!--        padding 0 10px-->
<!--        position relative-->
<!--        line-height 12px-->
<!--        border-right 1px solid $footerColor-->
<!--        font-size 12px-->
<!--        color $footerColor-->

<!--        &:last-child-->
<!--          border-right none-->

<!--        a-->
<!--          color currentColor-->
<!--          text-decoration none-->
<!--          transition color 0.3s-->

<!--          &:hover-->
<!--            color rgba(255, 255, 255, 0.9)-->

<!--@media (max-width: $MQMobile)-->
<!--  .footer-->
<!--    min-height 100px-->
<!--    flex-direction column-->

<!--    .footer-left-wrap-->
<!--      align-items center-->
<!--      justify-content center-->

<!--    .footer-right-wrap-->
<!--      .copyright-->
<!--        display block-->

<!--        .copyright-item-->
<!--          line-height 1-->
<!--          border-right none-->
<!--          text-align center-->
<!--</style>-->

<!-- footer: 底栏 -->
<!-- todo: 底栏挡住了一部分 content，似乎是 $vuetify.application.insetFooter 值错误 -->
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

<style lang="stylus">
.footer-text
  color: rgba(0, 0, 0, 0.35)

.footer-link {
  color: rgba(0, 0, 0, 0.5) !important;
  text-decoration: none;
  font-weight: 400
}

.footer-link:hover {
  color: rgb(25, 118, 210) !important;
}

</style>