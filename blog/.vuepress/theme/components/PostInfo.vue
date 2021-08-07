<template>
  <v-list :v-ripple="false">
    <header>
      <v-list-item v-if="postDate">
        <v-list-item-icon>
          <v-icon>mdi-clock</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <time
            itemprop="datePublished"
            :datetime="$page.frontmatter.date"
            v-text="postDate"
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

    <v-list>
      <v-subheader>TABLE OF CONTENTS</v-subheader>
      <Toc />
    </v-list>
  </v-list>
</template>

<script>
import Toc from "./Toc";
import {convertDatetimeToDate} from "../utils/posts";
import TagChipGroup from "../global-components/TagChipGroup";

export default {
  components: {TagChipGroup, Toc},
  computed: {
    postDate() {
      const date = this.$page.frontmatter.date;
      const dateFormat = this.$themeConfig.dateFormat;
      return date ? convertDatetimeToDate(date, dateFormat) : "";
    },
    postTags() {
      return this.$page.frontmatter.tags;
    },
  }
}
</script>