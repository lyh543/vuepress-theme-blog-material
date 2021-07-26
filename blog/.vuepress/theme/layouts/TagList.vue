<template>
  <div class="blog-tags">
    <BlogTag
      v-for="tag in $frontmatterKey.list"
      :key="tag.name"
      :tag="tag"
    />
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
    }
  },
}
</script>