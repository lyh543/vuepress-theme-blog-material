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
        <v-img
          height="240"
          :src="postImage"
        >
          <template #placeholder>
            <PicturePlaceholderAlt/>
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

        <v-card-text>
          <ClientOnly v-if="page.excerpt">
            <!-- eslint-disable vue/no-v-html -->
            <p
              class="ui-post-summary"
              itemprop="description"
              v-html="page.excerpt"
            />
            <!-- eslint-enable vue/no-v-html -->
          </ClientOnly>
          <p
            v-else
            class="ui-post-summary"
            itemprop="description"
          >
            {{ page.frontmatter.summary || page.summary }}
          </p>
        </v-card-text>

        <v-divider/>

        <footer>
          <v-card-text class="presenter-list-area"/>
        </footer>
      </v-card>
    </router-link>
  </article>
</template>

<script>
import PicturePlaceholderAlt from "./PicturePlaceholderAlt";
import {generatePostImage, getPostDate} from "../utils/posts";

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
    },
    postDate() {
      return getPostDate(this.page.frontmatter.date);
    }
  }
}
</script>