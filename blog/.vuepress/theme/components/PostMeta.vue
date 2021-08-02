<!-- todo: delete-->
<template>
  <div class="post-meta">
    <div
      v-if="author"
      class="post-meta-author"
      itemprop="publisher author"
      itemtype="https://schema.org/Person"
      itemscope
    >
      <!--      <NavigationIcon />-->
      <span itemprop="name">{{ author }}</span>
      <span
        v-if="location"
        itemprop="address"
      > &nbsp; in {{ location }}</span>
    </div>
    <div
      v-if="date"
      class="post-meta-date"
    >
      <!--      <ClockIcon />-->
      <time
        pubdate
        itemprop="datePublished"
        :datetime="date"
      >
        {{ postDate }}
      </time>
    </div>
    <ul
      v-if="tags"
      class="post-meta-tags"
      itemprop="keywords"
    >
      <PostTag
        v-for="tag in resolvedTags"
        :key="tag"
        :tag="tag"
      />
    </ul>
  </div>
</template>

<script>
import PostTag from './PostTag.vue'
import {convertDatetimeToDate} from "../utils/posts";


export default {
  name: 'PostMeta',
  components: { PostTag },
  props: {
    tags: {
      type: [Array, String],
    },
    author: {
      type: String,
    },
    date: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  computed: {
    postDate() {
      return convertDatetimeToDate(this.date, this.$themeConfig.dateFormat);
    },
    resolvedTags() {
      if (!this.tags || Array.isArray(this.tags)) return this.tags;
      return [this.tags]
    },
  },
}
</script>