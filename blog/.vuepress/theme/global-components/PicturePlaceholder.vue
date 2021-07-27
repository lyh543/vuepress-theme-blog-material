<!--  图片加载时的滚圈圈  -->
<!--  avatar 这类圆形图标推荐 size 和图标保持一致  -->
<!--  如果外层没有 <v-container> 需要自己加，如果有就别加，否则可能无法正确居中  -->
<template>
  <v-row
    class="fill-height"
    no-gutters
    align="center"
    justify="center"
  >
    <v-progress-circular
      indeterminate
      :color="color"
      :size="size"
      :width="widthInternal"
    />
  </v-row>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "amber"
    },
    size: {
      type: [Number, String],
      default: 32
    },
    width: {
      type: [Number, String],
      default: 0
    }
  },

  computed: {
    widthInternal() {
      return this.width || this.size / 8;
    }
  }
};
</script>