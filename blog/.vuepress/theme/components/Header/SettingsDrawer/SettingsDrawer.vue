<template>
  <v-navigation-drawer
    v-model="show"
    disable-route-watcher
    right
    fixed
    hide-overlay
    temporary
    width="300"
  >
    <v-toolbar flat>
      <v-toolbar-title>设置</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <div class="mx-0 mx-n3">
      <v-divider />
    </div>

    <v-container>
      <template v-if="isAuthenticated">
        <UserInfo />
        <div class="mb-3 mt-4 mx-n3">
          <v-divider />
        </div>
      </template>

      <!--      <ThemeSettings />-->
      <!--      <div class="mb-3 mt-4 mx-n3">-->
      <!--        <v-divider />-->
      <!--      </div>-->
      <!--      TODO: 加上主题设置  -->

      <SettingsTips :show="show" />
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import ThemeSettings from './Settings/ThemeSettings'
import UserInfo from "./Settings/UserInfo";
import SettingsTips from "./SettingsTips";

export default {

  components: {
    SettingsTips,
    UserInfo,
    ThemeSettings,
  },
  props: {
    toggleEvent: {
      type: Boolean,
      required: true,
    }
  },

  data() {
    return {
      show: false,
      isAuthenticated: false,
    }
  },


  watch: {
    toggleEvent() {
      this.show = !this.show;
    }
  }
}
</script>
