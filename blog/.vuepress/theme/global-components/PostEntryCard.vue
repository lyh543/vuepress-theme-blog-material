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
    <router-link :to="page.path">
      <v-card ripple>
        <header
          class="ui-post-title"
          itemprop="name headline"
        >
          <v-img
            height="240"
            :src="postImage"
          >
            <template #placeholder>
              <PicturePlaceholderAlt />
            </template>
            <v-card-title class="post-entry-card-title">
              {{ page.title }}
            </v-card-title>
          </v-img>
        </header>

        <v-card-text>
          <client-only v-if="page.excerpt">
            <!-- eslint-disable vue/no-v-html -->
            <p
              class="ui-post-summary"
              itemprop="description"
              v-html="page.excerpt"
            />
            <!-- eslint-enable vue/no-v-html -->
          </client-only>
          <p
            v-else
            class="ui-post-summary"
            itemprop="description"
          >
            {{ page.frontmatter.summary || page.summary }}
          </p>
        </v-card-text>

        <v-divider />

        <footer>
          <v-card-text class="presenter-list-area" />
        </footer>
      </v-card>
    </router-link>
  </article>
</template>

<script>
import PicturePlaceholderAlt from "./PicturePlaceholderAlt";
import {generatePostImage} from "../utils/posts";

export default {
  components: {PicturePlaceholderAlt},
  props: {
    page: {
      type: Object,
      required: true
    }
  },

  computed: {
    postImage() {
      return this.page.image ? this.page.image : generatePostImage(this.page.key);
    }
  }
}
</script>