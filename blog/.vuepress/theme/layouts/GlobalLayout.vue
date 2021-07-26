<!-- global layout for adding header and footer -->
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

      <ClientOnly>
        <BackToTop />
      </ClientOnly>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import DefaultGlobalLayout from '@app/components/GlobalLayout'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import BackToTop from "../global-components/BackToTop";

export default {
  components: {
    BackToTop,
    DefaultGlobalLayout,
    Header,
    Footer,
  },
}
</script>
