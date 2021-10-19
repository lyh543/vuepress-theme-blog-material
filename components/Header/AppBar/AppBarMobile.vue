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
    <v-app-bar-nav-icon @click="$emit('toggle:navigation')" />

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
        <VuetifySearchBox @close:searchbox="showSearchBox=false; keyword=''" />
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
      class="mx-0"
      icon
      @click="$emit('toggle:settings')"
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
import AppBarMixins from "./AppBarMixins";

export default {
  mixins: [AppBarMixins]
};
</script>