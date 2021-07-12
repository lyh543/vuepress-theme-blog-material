<template>
  <div
    class="bottom-tips"
    v-text="tips[index]"
  />
</template>

<script>
import moment from "@theme/utils/moment";

export default {
  props: {
    show: {
      type: Boolean
    },
  },
  data: () => ({
    tips: [
      `阮薇薇 ${new Date().getFullYear() - 2019} 岁啦~`,
      '听说不使用梯子反而会变快喔~',
      '怎么还有一堆 bug 没有修啊啊啊啊',
      'tljj 女装赛高！',
      '你很菜的时候会焦虑 当你像我这么强的时候就不会了'
    ],
    index: 0,
  }),

  watch: {
    show() {
      if (this.show)
        this.index = (this.index + 1) % this.tips.length;
    }
  },

  created() {
    this.index = moment().dayOfYear() % this.tips.length;
  }
}
</script>