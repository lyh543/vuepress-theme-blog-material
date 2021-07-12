<!-- 全局布局，用于添加 header 和 footer -->
<template>
  <v-app>
    <ClientOnly>
      <Header />
    </ClientOnly>
    <DefaultGlobalLayout id="global-layout" />
    <Footer />
  </v-app>
</template>

<script>
import DefaultGlobalLayout from '@app/components/GlobalLayout'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

export default {
  components: {
    DefaultGlobalLayout,
    Header,
    Footer,
  },

  data() {
    return {
      isMobileHeaderOpen: false,
    }
  },

  mounted() {
    this.$router.afterEach(() => {
      this.isMobileHeaderOpen = false
    })
  },
}
</script>

<style>
#vuepress-theme-blog__global-layout {
  word-wrap: break-word
}
</style>
