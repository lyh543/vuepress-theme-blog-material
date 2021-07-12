<template>
  <v-speed-dial
    v-model="fab"
    bottom
    right
    direction="top"
    transition="slide-y-reverse-transition"
  >
    <template #activator>
      <v-btn
        v-model="fab"
        color="blue darken-2"
        right
        bottom
        fixed
        fab
        x-large
        elevation="16"
      >
        <v-icon v-if="fab">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-account-circle
        </v-icon>
      </v-btn>
    </template>
    <v-btn
      fab
      dark
      small
      color="green"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="indigo"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="red"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<style scoped>
/* This is for documentation purposes and will not be needed in your application */
/*.v-speed-dial {*/
/*  position: fixed;*/
/*}*/

.v-btn--floating {
  position: relative;
}
</style>

<script>
export default {
  data() {
    return {
      fab: false
    }
  }
}
</script>