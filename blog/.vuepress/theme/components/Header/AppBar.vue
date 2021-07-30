<template>
  <v-app-bar
    ref="appbar"
    fixed
    app
    dark
    color="primary"
    height="250px"
    :src="appbarBackgroundUrl"
    shrink-on-scroll
    fade-img-on-scroll
  >
    <v-app-bar-nav-icon @click="$emit('toggleNavigation')" />

    <template v-if="showSearchBar">
      <v-fade-transition hide-on-leave>
        <v-btn
          icon
          @click="showSearchBar=false; keyword=''"
        >
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </v-fade-transition>

      <v-fade-transition hide-on-leave>
        <!--        <v-text-field-->
        <!--          v-model="keyword"-->
        <!--          hide-details-->
        <!--          prepend-icon="mdi-magnify"-->
        <!--          single-line-->
        <!--          @input="searchCallback"-->
        <!--        />-->
        <SearchBox />
      </v-fade-transition>
    </template>

    <template v-else>
      <v-fade-transition hide-on-leave>
        <v-app-bar-title
          id="app-bar-title"
          :style="appbarTitleStyle"
          v-text="$page.title || $siteTitle"
        />
      </v-fade-transition>

      <v-spacer />

      <v-fade-transition hide-on-leave>
        <v-btn
          icon
          @click="showSearchBar=true"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-fade-transition>
    </template>

    <!--    <template v-if="isAuthenticated">-->
    <!--      <v-avatar-->
    <!--        size="36"-->
    <!--        contain-->
    <!--      >-->
    <!--        <v-img :src="profile.avatar_url">-->
    <!--          <template #placeholder>-->
    <!--            <PicturePlaceholder size="36" />-->
    <!--          </template>-->
    <!--        </v-img>-->
    <!--      </v-avatar>-->

    <!--      &lt;!&ndash;  移动端太挤了放不下  &ndash;&gt;-->
    <!--      <template v-if="!mobile">-->
    <!--        <span class="ml-2">-->
    <!--          {{ profile.first_name }}-->
    <!--        </span>-->
    <!--      </template>-->
    <!--    </template>-->

    <v-btn
      icon
      @click="$emit('toggleSettings')"
    >
      <v-icon>mdi-cog-outline</v-icon>
    </v-btn>

    <!--    <v-progress-linear-->
    <!--      :active="$store.state.appbarLoading"-->
    <!--      indeterminate-->
    <!--      absolute-->
    <!--      bottom-->
    <!--      color="yellow accent-4"-->
    <!--    />-->
  </v-app-bar>
</template>


<script>
// import PicturePlaceholder from "@/components/ui/Base/picture-placeholder";
// import {getMyProfile} from "@/api/user";
import SearchBox from "@SearchBox"
import appbar_background_url from "@public/img/appbar_background.png";

export default {
  components: {
    SearchBox,
    // PicturePlaceholder,
  },

  data() {
    return {
      appbarBackgroundUrl: appbar_background_url,
      showSearchBar: false,
      keyword: '',
      appbarTitleSize: 20,
    }
  },

  computed: {
    mobile() {
      return this.$vuetify.breakpoint.xs;
    },
    appbarTitleStyle() {
      return "font-size: " + this.appbarTitleSize + "px"
    }
  },

  mounted() {
    // 监听 appbar 高度改变 appbar-title 大小
    // 这里选择 appbar.computedOpacity 作为监听对象（appbar 最小时为 0，最大时为 1）
    this.appbarTitleSize = 20 + this.$refs.appbar.computedOpacity * 20;
    this.$watch(
      () => this.$refs.appbar.computedOpacity,
      (val) => this.appbarTitleSize = 20 + val * 20
    );
  }
};
</script>