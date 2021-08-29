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
        <component :is="layout" />
      </v-fade-transition>
    </v-main>
    <!--    <ClientOnly>-->
    <!--      <BackToTop />-->
    <!--    </ClientOnly>-->
    <Footer />
  </v-app>
</template>

<script>
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import Layout from "./Layout";
import NotFound from "./NotFound";
import PostList from "./PostList";
import Post from "./Post";

export default {
  components: {
    Header,
    Footer,
    Post,
    PostList,
  },
  computed: {
    layout() {
      if (this.$frontmatter.layout)
        return this.$frontmatter.layout
      if (!this.$page.path)
        return NotFound;
      return Layout;
    }
  },
}
</script>
