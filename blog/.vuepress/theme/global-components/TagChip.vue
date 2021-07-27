<template>
  <v-chip
    link
    draggable
    :color="tagInternal.color"
    text-color="white"
    :to="tagInternal.path"
  >
    {{ tagInternal.name }}
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
    tag: {
      type: [Object, String],
      required: true
    },
  },

  data() {
    return {
      tagInternal: {},
    };
  },

  created() {
    const tag = this.tag;
    if (typeof tag == 'string')
      this.tagInternal = {name: tag, path: `/tag/${tag}/`}
    else
      this.tagInternal = Object.assign({}, tag);

    const colorIndex = Math.abs(this.tagInternal.name.hashCode()) % colors.length;
    this.tagInternal.color = colors[colorIndex];
  }
}
</script>