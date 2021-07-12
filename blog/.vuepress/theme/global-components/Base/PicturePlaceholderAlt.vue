<!--  图片加载时的骨架装载器  -->
<template>
  <v-responsive :aspect-ratio="aspectRatio">
    <v-skeleton-loader
      type="image@10"
    />
    <!--  一个 image 固定 200px，要想 height 变大，就得多几个 image  -->
  </v-responsive>
</template>

<script>
export default {
  props: {
    aspectRatio: {
      type: String | Number,
      default: ''
    }
  }
};
</script>