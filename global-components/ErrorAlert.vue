<!-- 可以单独作为一个 component 使用 -->
<template>
  <v-row v-if="asRow">
    <v-col>
      <v-alert
        elevation="4"
        :type="type"
        v-bind="$attrs"
      >
        {{ msg }}
      </v-alert>
    </v-col>
  </v-row>

  <v-container
    v-else
    fluid
  >
    <v-row justify="center">
      <v-col
        cols="12"
        sm="8"
      >
        <v-alert
          elevation="4"
          :type="type"
          v-bind="$attrs"
        >
          {{ msg }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    asRow: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'error'
    },
    msg: {
      type: [String, Object],
      default: '哎呀，出错了'
    }
  }
};
</script>