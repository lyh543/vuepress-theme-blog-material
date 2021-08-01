<template>
  <div class="blog-tags">
    <TagChip
      v-for="tag in $tags.list"
      :key="tag.name"
      :tag-name="tag.name"
    />
  </div>
</template>

<script>
import TagChip from "../global-components/TagChip";
export default {
  components: {TagChip},
  // created() {
  //   this.$router.push($front)
  // }
}
</script>