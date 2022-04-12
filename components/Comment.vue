<template>
  <div v-if="commentService === 'giscus'">
    <script
      src="https://giscus.app/client.js"
      v-bind="commentConfig"
      async
    ></script>
  </div>
  <VssueComment v-else-if="commentService !== ''" />
</template>

<script>
import { Comment as VssueComment } from "@vuepress/plugin-blog/lib/client/components";

export default {
  name: "Comment",
  components: {
    VssueComment,
  },
  data() {
    return {
      commentConfig: {},
      commentService: "",
    };
  },
  created() {
    this.commentConfig = this.$site.themeConfig.comment;
    this.commentService = this.commentConfig.service;
  },
};
</script>

<style scoped></style>
