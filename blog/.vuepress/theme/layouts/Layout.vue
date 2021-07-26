<!-- default layout for page -->
<template>
  <div>
    <PostList v-if="$pagination" />
    <Content v-else />
  </div>
</template>
<script>
import PostList from "./PostList";
export default {
  components: {PostList},
  created() {
  }
}
</script>
