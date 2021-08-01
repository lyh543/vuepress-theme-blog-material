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

// https://vuetifyjs.com/zh-Hans/styles/colors/
const colors = [
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'red',
  'pink',
  'purple',
  'deep-purple'
];


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