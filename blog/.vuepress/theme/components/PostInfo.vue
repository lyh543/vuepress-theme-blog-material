<template>
  <v-list :v-ripple="false">
    <header>
      <v-list-item v-if="postDate">
        <v-list-item-icon>
          <v-icon>mdi-text-box-plus-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <time
            itemprop="datePublished"
            :datetime="$page.frontmatter.date"
            v-text="postDate"
          />
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="lastUpdated">
        <v-list-item-icon>
          <v-icon>mdi-pencil</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <time
            itemprop="lastUpdated"
            :datetime="$page.lastUpdated"
            v-text="lastUpdated"
          />
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="postTags">
        <v-list-item-icon>
          <v-icon>mdi-tag</v-icon>
        </v-list-item-icon>
        <TagChipGroup :tag-names="postTags" />
      </v-list-item>
    </header>

    <v-list v-if="!!($page.headers && $page.headers.length)">
      <v-subheader>TABLE OF CONTENTS</v-subheader>
      <Toc />
    </v-list>
  </v-list>
</template>

<script>
import Toc from "./Toc";
import {getLastUpdatedDate, getPostDate} from "../utils/posts";
import TagChipGroup from "../global-components/TagChipGroup";

export default {
  components: {TagChipGroup, Toc},
  computed: {
    postDate() {
      return getPostDate(this.$page, this.$themeConfig.dateFormat)
    },
    lastUpdated() {
      return getLastUpdatedDate(this.$page, this.$themeConfig.dateFormat);
    },
    postTags() {
      return this.$page.frontmatter.tags;
    },
  }
}
</script>