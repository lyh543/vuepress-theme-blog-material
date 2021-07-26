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
        text
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
    msg: '404 Not Found'
  }),
  created() {
    const path = this.$route.path;
    this.msg += ': ' + decodeURI(path);
  }
}
</script>