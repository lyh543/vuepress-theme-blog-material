<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      Screen Info
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      Width:  {{ $vuetify.breakpoint.width }}<br>
      Height: {{ $vuetify.breakpoint.height }}
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "ScreenInfo",
}
</script>