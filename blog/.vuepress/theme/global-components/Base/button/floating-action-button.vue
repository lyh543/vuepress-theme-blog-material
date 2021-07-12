<!-- 鼠标放置按钮之上可以看到提示的 floating-action-button -->
<!-- 照着 vuetify 官网的 FAB 改的 -->
<template>
  <v-tooltip top>
    <template #activator="{ on, attrs }">
      <v-fab-transition>
        <v-btn
          class="transition-swing"
          fab
          bottom
          x-large
          fixed
          right
          v-bind="{...attrs, ...$attrs}"
          v-on="on"
          @click="$emit('click')"
        >
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  inheritAttrs: false,
  // 不让组件的根元素继承 attribute，而手动将 $attrs 赋给 v-btn
  props: {
    icon: {
      type: String,
      default: 'mdi-plus'
    },
    tooltip: {
      type: String,
      default: ''
    }
  },
});
</script>