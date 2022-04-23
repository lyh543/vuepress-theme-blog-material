<template>
  <v-container
    fluid
  >
    <ErrorAlert
      :msg="msg"
    />
    <v-row justify="center">
      <v-btn
        to="/"
        plain
      >
        Take me home
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import ErrorAlert from "../global-components/ErrorAlert";

export default {
  components: {ErrorAlert},
  data: () => ({
    msg: '404 Not Found. Would you like to search what you are looking for? ↗↗↗'
  }),
  created() {
    const path = this.$route.path;
    this.msg = `404 Not Found: ${decodeURI(path)}.\nWould you like to search what you are looking for? ↗↗↗`;
  }
}
</script>