<template>
  <div>
    <v-container>
      <v-row class="justify-center">
        <v-col cols="12" sm="9">
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
        </v-col>

        <v-col v-if="!xs" cols="3">
          <v-card style="position: fixed; max-width: 15%">
            <PostInfo />
          </v-card>
        </v-col>
      </v-row>
    </v-container>

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
