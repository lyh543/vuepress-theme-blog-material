<!-- 全局布局，用于添加 header 和 footer -->
<template>
  <v-app>
    <ClientOnly>
      <Header />
    </ClientOnly>
    <v-main id="main-content">
      <v-fade-transition
        :duration="100"
        mode="out-in"
      >
        <DefaultGlobalLayout id="global-layout" />
      </v-fade-transition>
    </v-main>
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
}
</script>

<style>
#global-layout {
  word-wrap: break-word;
  /*margin-top: 300px;*/
  /*margin-bottom: 128px;*/
}
</style>
