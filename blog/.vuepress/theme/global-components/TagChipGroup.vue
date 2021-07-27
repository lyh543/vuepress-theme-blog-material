<template>
  <v-chip-group
    class="tag-chip-group"
    column
  >
    <TagChip
      v-for="tag in tags"
      :key="tag.key"
      :tag="tag"
    />
  </v-chip-group>
</template>

<script>
import TagChip from "./TagChip";

export default {
  components: {TagChip},
  props: {
    tags: {
      type: Array,
      required: true
    }
  },
}
</script>