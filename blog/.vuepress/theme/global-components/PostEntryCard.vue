<!--  activity card  -->
<template>
  <article
    :key="page.key"
    class="ui-post"
    itemprop="blogPost"
    itemscope
    itemtype="https://schema.org/BlogPosting"
  >
    <meta
      itemprop="mainEntityOfPage"
      :content="page.path"
    >
    <router-link
      :to="page.path"
      class="no-decoration"
    >
      <v-card ripple>
        <v-img
          height="240"
          :src="postImage"
        >
          <template #placeholder>
            <PicturePlaceholderAlt />
          </template>

          <div style="position: absolute; bottom: 0">
            <v-card-title class="post-entry-card-title">
              <header
                class="ui-post-title"
                itemprop="name headline"
              >
                {{ page.title }}
              </header>
            </v-card-title>
            <v-card-subtitle
              v-if="postDate"
              class="post-entry-card-subtitle"
            >
              <time
                itemprop="datePublished"
                :datetime="page.frontmatter.date"
                v-text="postDate"
              />
            </v-card-subtitle>
          </div>
        </v-img>

        <v-card-text class="post-summary">
          <p itemprop="description">
            {{ page.frontmatter.summary || page.summary }}
          </p>
        </v-card-text>

        <template v-if="page.frontmatter.tags">
          <v-divider />

          <footer>
            <v-card-actions class="tag-list-area py-0">
              <TagChipGroup :tag-names="page.frontmatter.tags" />
            </v-card-actions>
          </footer>
        </template>
      </v-card>
    </router-link>
  </article>
</template>

<script>
import PicturePlaceholderAlt from "./PicturePlaceholderAlt";
import {convertDatetimeToDate, generatePostImage} from "../utils/posts";
import TagChipGroup from "./TagChipGroup";

export default {
  components: {TagChipGroup, PicturePlaceholderAlt},
  props: {
    page: {
      type: Object,
      required: true
    }
  },

  computed: {
    postImage() {
      return generatePostImage(this.page)
    },
    postDate() {
      const date = this.page.frontmatter.date;
      const dateFormat = this.$themeConfig.dateFormat;
      return date ? convertDatetimeToDate(date, dateFormat) : "";
    },
  },
}
</script>