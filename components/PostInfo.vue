<template>
  <v-list :v-ripple="false">
    <header>
      <ListItem
        v-if="postDate"
        icon="mdi-text-box-plus-outline"
        tooltip="创建日期"
        tooltip-position="left"
      >
        <time
          itemprop="datePublished"
          :datetime="$page.frontmatter.date"
          v-text="postDate"
        />
      </ListItem>

      <ListItem
        v-if="lastUpdated"
        icon="mdi-pencil"
        tooltip="最后修改"
        tooltip-position="left"
      >
        <time
          itemprop="lastUpdated"
          :datetime="$page.lastUpdated"
          v-text="lastUpdated"
        />
      </ListItem>

      <ListItem
        v-if="postTags"
        icon="mdi-tag"
        tooltip="标签"
        tooltip-position="left"
      >
        <div>
          <TagChip
            v-for="tagName in postTags"
            :key="tagName"
            :tag-name="tagName"
            class="mb-2 mr-2"
          />
        </div>
      </ListItem>
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
import TagChip from "../global-components/TagChip";
import ListItem from "../global-components/ListItem";

export default {
  components: {ListItem, TagChip, Toc},
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