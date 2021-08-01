<template>
  <v-chip-group
    class="tag-chip-group"
    column
  >
    <TagChip
      v-for="tagName in tagNames"
      :key="tagName"
      :tag-name="tagName"
    />
  </v-chip-group>
</template>

<script>
import TagChip from "./TagChip";

export default {
  components: {TagChip},
  props: {
    tagNames: {
      type: Array,
      required: true
    }
  },
}
</script>