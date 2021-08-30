<template>
  <div />
</template>

<script>
export default {
  beforeMount() {
    // redirect to first tag
    const firstTagPath =this.$tags.list[0].path;
    this.$router.push(firstTagPath);
  }
}
</script>