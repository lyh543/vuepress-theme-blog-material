<template>
  <div id="base-list-layout">
    <v-container
      class="ui-posts"
      itemscope
      itemtype="https://schema.org/Blog"
    >
      <v-row
        v-for="page in pages"
        :key="page.key"
        justify="center"
      >
        <v-col
          cols="12"
          md="9"
          class="pa-5"
        >
          <PostEntryCard
            :page="page"
            itemprop="blogPost"
            itemscope
            itemtype="https://schema.org/BlogPosting"
          />
        </v-col>
      </v-row>
    </v-container>

    <component
      :is="paginationComponent"
      v-if="$pagination.length > 1 && paginationComponent"
    />
  </div>
</template>

<script>
/* global THEME_BLOG_PAGINATION_COMPONENT */

import Vue from 'vue'
import {Pagination, SimplePagination} from '@vuepress/plugin-blog/lib/client/components'
import PostEntryCard from "../global-components/PostEntryCard";


export default {
  components: {PostEntryCard},

  data() {
    return {
      paginationComponent: null,
    }
  },

  computed: {
    pages() {
      return this.$pagination.pages
    },
  },


  created() {
    // this.$frontmatter.title = 'Hello world!';
    this.paginationComponent = this.getPaginationComponent()
  },

  methods: {
    getPaginationComponent() {
      const n = THEME_BLOG_PAGINATION_COMPONENT
      if (n === 'Pagination') {
        return Pagination
      }

      if (n === 'SimplePagination') {
        return SimplePagination
      }

      return Vue.component(n) || Pagination
    },
  },
}
</script>
