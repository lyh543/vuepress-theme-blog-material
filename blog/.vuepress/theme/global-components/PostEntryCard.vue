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
      class="post-entry"
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
            <v-card-subtitle class="post-entry-card-subtitle">
              <time
                pubdate
                itemprop="datePublished"
                :datetime="page.frontmatter.date"
              >
                {{ postDate }}
              </time>
            </v-card-subtitle>
          </div>
        </v-img>

        <v-card-text class="post-summary">
          <ClientOnly v-if="page.excerpt">
            <!-- eslint-disable vue/no-v-html -->
            <p
              itemprop="description"
              v-html="page.excerpt"
            />
            <!-- eslint-enable vue/no-v-html -->
          </ClientOnly>
          <p
            v-else
            itemprop="description"
          >
            {{ page.frontmatter.summary || page.summary }}
          </p>
        </v-card-text>

        <v-divider />

        <footer>
          <v-card-actions class="tag-list-area py-0">
            <TagChipGroup :tags="page.frontmatter.tags" />
          </v-card-actions>
        </footer>
      </v-card>
    </router-link>
  </article>
</template>

<script>
import PicturePlaceholderAlt from "./PicturePlaceholderAlt";
import {generatePostImage, convertDatetimeToDate} from "../utils/posts";
import TagChipGroup from "./TagChipGroup";

// todo: tag 上下的间距很不正常
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
      return generatePostImage(this.page);
    },
    postDate() {
      return convertDatetimeToDate(this.page.frontmatter.date, this.$themeConfig.dateFormat);
    }
  }
}
</script>