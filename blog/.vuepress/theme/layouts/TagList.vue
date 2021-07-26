<template>
  <div class="blog-tags">
    <TagChip
      v-for="tag in $frontmatterKey.list"
      :key="tag.name"
      :tag="tag"
    />
  </div>
</template>

<script>
import TagChip from "../global-components/TagChip";
export default {
  components: {TagChip},
  props: {
    tags: {
      type: Array,
    }
  },
}
</script>