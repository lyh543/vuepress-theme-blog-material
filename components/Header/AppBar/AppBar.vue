<template>
  <v-app-bar
    ref="appbar"
    fixed
    app
    dark
    color="primary"
    height="250px"
    :src="imageUrl"
    shrink-on-scroll
    fade-img-on-scroll
  >
    <v-app-bar-nav-icon @click="$emit('toggleNavigation')" />

    <template v-if="showSearchBox">
      <v-fade-transition hide-on-leave>
        <v-btn
          icon
          @click="showSearchBox=false; keyword=''"
        >
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </v-fade-transition>

      <v-fade-transition hide-on-leave>
        <VuetifySearchBox />
      </v-fade-transition>
    </template>

    <template v-else>
      <v-fade-transition hide-on-leave>
        <v-app-bar-title
          id="app-bar-title"
          :style="titleStyle"
          v-text="$page.title || $siteTitle"
        />
      </v-fade-transition>

      <v-spacer />

      <v-fade-transition hide-on-leave>
        <v-btn
          icon
          @click="showSearchBox=true"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-fade-transition>
    </template>

    <v-btn
      icon
      @click="$emit('toggleSettings')"
    >
      <v-icon>mdi-cog-outline</v-icon>
    </v-btn>

    <template
      v-if="$currentTags"
      #extension
    >
      <TagTab />
    </template>
  </v-app-bar>
</template>


<script>
import VuetifySearchBox from "./VuetifySearchBox";
import TagTab from "./TagTab";

const appbar_background_url = "/theme/appbar_background.png";

export default {
  components: {
    TagTab,
    VuetifySearchBox,
  },

  data() {
    return {
      showSearchBox: false,
      keyword: '',
      titleSize: 20,
    }
  },

  computed: {
    imageUrl() {
      const image = this.$page.frontmatter.image;
      return image ? image : appbar_background_url;
    },
    mobile() {
      return this.$vuetify.breakpoint.xs;
    },
    titleStyle() {
      return {fontSize: this.titleSize + "px"};
    }
  },

  mounted() {
    // 监听 appbar 高度改变 appbar-title 大小
    // 这里选择 appbar.computedOpacity 作为监听对象（appbar 最小时为 0，最大时为 1）
    this.titleSize = 20 + this.$refs.appbar.computedOpacity * 20;
    this.$watch(
      () => this.$refs.appbar.computedOpacity,
      (val) => this.titleSize = 20 + val * 20
    );
  }
};
</script>