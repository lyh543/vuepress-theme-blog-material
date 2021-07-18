<template>
  <v-container
    fluid
  >
  <ErrorAlert
    as-row
    :msg="msg"
  />
    <v-row justify="center">
      <v-btn
        to="/"
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
  mounted() {
    this.msg += ': ' + this.$route.path;
  }
}
</script>