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
          sm="9"
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

    <VuetifyPagination v-if="$pagination.length > 1" />
  </div>
</template>

<script>
import PostEntryCard from "../global-components/PostEntryCard";
import VuetifyPagination from "../global-components/VuetifyPagination";


export default {
  components: {PostEntryCard, VuetifyPagination},

  data() {
    return {
      paginationComponent: null,
    }
  },

  computed: {
    pages() {
      return this.$pagination.pages
    },
  }
}
</script>
