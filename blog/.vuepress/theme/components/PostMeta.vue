<!-- todo: delete-->
<template>
  <div class="post-meta" />
</template>

<script>
import PostTag from './PostTag.vue'
import {convertDatetimeToDate} from "../utils/posts";


export default {
  name: 'PostMeta',
  components: { PostTag },
  computed: {
    postDate() {
      const date = this.$page.frontmatter.date;
      const dateFormat = this.$themeConfig.dateFormat;
      return date ? convertDatetimeToDate(date, dateFormat) : "";
    },
  },
}
</script>