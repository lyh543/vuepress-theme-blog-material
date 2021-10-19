<template>
  <AppbarMobile
    v-if="mobile"
    @toggle:navigation="$emit('toggle:navigation')"
    @toggle:settings="$emit('toggle:settings')"
  />
  <AppBarPC
    v-else
    @toggle:navigation="$emit('toggle:navigation')"
    @toggle:settings="$emit('toggle:settings')"
  />
</template>

<script>
import AppbarMobile from "./AppBarMobile";
import AppBarPC from "./AppBarPC";

export default {
  components: {AppBarPC, AppbarMobile},

  computed: {
    mobile() {
      return this.$vuetify.breakpoint.xs;
    }
  }
}
</script>