<template>
  <v-tabs
    :value="currentIndex"
    align-with-title
    center-active
  >
    <v-tabs-slider color="yellow" />

    <v-tab
      v-for="tag in $tags.list"
      :key="tag.name"
      :to="tag.path"
    >
      {{ tag.name }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  computed: {
    currentTagName() {
      return this.$currentTags.key;
    },
    currentIndex() {
      return this.$tags.list.findIndex(tag => tag.name === this.currentTagName);
    }
  }

}
</script>