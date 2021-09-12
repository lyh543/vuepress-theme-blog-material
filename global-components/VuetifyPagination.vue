<template>
  <v-pagination
    v-model="page"
    :length="$pagination.length"
    total-visible="7"
    @input="clickCallback"
  />
</template>

<script>
export default {
  computed: {
    page() {
      return this.$pagination.paginationIndex + 1;
    },
  },

  methods: {
    clickCallback(pageNum) {
      const link = this.$pagination.getSpecificPageLink(pageNum - 1);
      this.$router.push(link);
    },
  },
};
</script>