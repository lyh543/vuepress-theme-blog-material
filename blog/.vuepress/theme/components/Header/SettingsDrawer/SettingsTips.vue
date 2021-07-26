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
      '怎么还有一堆 bug 没有修啊啊啊啊',
      '这里是彩蛋~'
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
