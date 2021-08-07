<template>
  <v-container>
    <v-row class="justify-center">
      <v-col
        cols="12"
        sm="8"
      >
        <v-expansion-panels>
          <ClientOnly>
            <ScreenInfo />
          </ClientOnly>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScreenInfo from "../components/debug-module/ScreenInfo";

export default {
  components: {ScreenInfo},
}
</script>