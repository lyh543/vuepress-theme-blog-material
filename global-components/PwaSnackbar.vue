<template>
  <SWUpdatePopup v-slot="{ enabled, reload, message, buttonText }">
    <v-snackbar
      id="pwa-snackbar"
      :value="enabled"
      bottom
      right
      timeout="-1"
      vertical
    >
      {{ message }}
      <template #action="{ attrs }">
        <v-btn
          id="pwa-button"
          v-bind="attrs"
          depressed
          @click="reload"
        >
          {{ buttonText }}
        </v-btn>
      </template>
    </v-snackbar>
  </SWUpdatePopup>
</template>

<script>
// https://vuepress.vuejs.org/plugin/official/plugin-pwa.html#customize-the-ui-of-sw-update-popup
// https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/layouts/default/PwaSnackbar.vue
import SWUpdatePopup from '@vuepress/plugin-pwa/lib/SWUpdatePopup.vue'

export default {
  components: { SWUpdatePopup }
}
</script>
<style lang="stylus">
#pwa-snackbar
  padding-bottom: 0 !important
  p
    line-height: normal // v-snackbar__content sets this to 1.25rem 🤔
    margin-bottom: 0 !important

#pwa-button
  margin-right: 8px
  background-color: #1867c0 !important;
  border-color: #1867c0 !important;
</style>