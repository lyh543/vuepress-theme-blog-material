<template>
  <v-chip
    link
    draggable
    :color="color"
    text-color="white"
    :to="tag.path"
  >
    {{ tagName }}
  </v-chip>
</template>

<script>
import '../utils';
import {colors} from "../utils/constants";


export default {
  props: {
    tagName: {
      type: String,
      required: true,
    },
  },

  computed: {
    tag() {
      return this.$tags.getItemByName(this.tagName);
    },
    color() {
      const colorIndex = Math.abs(this.tagName.hashCode()) % colors.length;
      return colors[colorIndex];
    }
  }
}
</script>