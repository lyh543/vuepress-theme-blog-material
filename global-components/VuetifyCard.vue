<!-- 对于一个页面，二话不说先摆个 card -->
<template>
  <!-- 外层的 container、row、col 是为了限制 card 的布局 -->
  <v-container>
    <v-row class="justify-center">
      <v-col
        :cols="cols"
        :sm="sm"
      >
        <v-card v-bind="$attrs">
          <!-- 将多余属性绑定到 v-card 上  -->
          <!--  这里会把调用 VuetifyCard 处的 <template v-slot:progress> </template> 之间的代码插入  -->
          <template #progress>
            <slot name="progress" />
          </template>

          <!--  这里会把调用 VuetifyCard 处的 <template v-slot:before-card-text> </template> 之间的代码插入  -->
          <slot name="before-card-text" />

          <v-card-text>
            <slot /> <!--  这里会把调用 VuetifyCard 处的 <VuetifyCard> </VuetifyCard> 之间的代码插入  -->
          </v-card-text>

          <!--  这里会把调用 VuetifyCard 处的 <template v-slot:after-card-text> </template> 之间的代码插入  -->
          <slot name="after-card-text" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    // columns on mobile
    cols: {
      type: [Number, String],
      default: 12
    },
    // columns on PC
    sm: {
      type: [Number, String],
      default: 8
    }
  }
};
</script>