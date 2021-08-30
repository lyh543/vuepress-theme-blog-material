<template>
  <v-tooltip
    :top="top"
    :bottom="bottom"
    :left="left"
    :right="right"
    :disabled="!tooltip"
  >
    <template #activator="{ on, attrs }">
      <v-list-item
        v-bind="attrs"
        v-on="on"
      >
        <v-list-item-icon v-if="icon">
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <slot />
        </v-list-item-content>
      </v-list-item>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    tooltip: {
      type: String,
      default: ''
    },
    tooltipPosition: {
      type: String,
      default: "bottom",
      validator: (value) => ['top', 'bottom', 'left', 'right'].indexOf(value) !== -1
    },
  },
  computed: {
    top() {
      return this.tooltipPosition === "top"
    },
    bottom() {
      return this.tooltipPosition === "bottom"
    },
    left() {
      return this.tooltipPosition === "left"
    },
    right() {
      return this.tooltipPosition === "right"
    },
  }
}
</script>