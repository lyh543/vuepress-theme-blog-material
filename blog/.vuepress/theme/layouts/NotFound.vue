<template>
  <ErrorAlert msg="404 Not Found"/>
</template>

<script>
import ErrorAlert from "../global-components/ErrorAlert";

export default {
  components: {ErrorAlert},
  created() {
    this.$frontmatter.title = 'test'
    console.log(this.$title)
  }
}
</script>