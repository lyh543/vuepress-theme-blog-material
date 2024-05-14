<template>
  <div>
    <container class="article-column-container">
      <div class="article-column">
        <article
          class="vuepress-blog-theme-content"
          itemscope
          itemtype="https://schema.org/BlogPosting"
        >
          <v-card>
            <v-container>
              <Content itemprop="articleBody" class="markdown-body" />
              <v-divider v-if="$site.themeConfig.comment.service" class="ma-4" />
              <Comment />
            </v-container>
          </v-card>
        </article>
      </div>

      <div v-if="!xs" cols="3">
        <v-card style="position: fixed; max-width: 15%">
          <PostInfo />
        </v-card>
      </div>
    </container>

    <v-bottom-sheet v-if="xs" v-model="sheet">
      <template #activator="{ on, attrs }">
        <v-fab-transition>
          <v-btn
            v-if="xs"
            fab
            dark
            fixed
            bottom
            right
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-information-variant</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>

      <v-sheet>
        <v-container>
          <PostInfo />
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import Comment from "../components/Comment";
import PostInfo from "../components/PostInfo";
// import 'prismjs/plugins/line-numbers/prism-line-numbers.js'

export default {
  components: {
    PostInfo,
    Comment,
  },
  data() {
    return {
      sheet: false,
    };
  },
  computed: {
    xs() {
      return this.$vuetify.breakpoint.xs;
    },
  },
};
</script>

<style>
.article-column-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 20px;
}

.article-column {
  /* for mobile */
  width: calc(100% - 20px);

  /* for desktop */
  @media (min-width: 600px) {
    width: 750px;
  }
}
</style>