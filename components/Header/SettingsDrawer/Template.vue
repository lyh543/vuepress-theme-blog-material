<template>
  <!--  从 Vuetify 源码抄过来的  -->
  <div>
    <span class="mb-0 pl-1 text-subtitle-2 font-weight-black text--primary">
      {{ title }}
    </span>

    <v-item-group
      v-model="internalValue"
      class="mx-auto row row--dense"
      mandatory
    >
      <v-col
        v-for="item in items"
        :key="item.value"
        cols="6"
      >
        <v-item :value="item.value">
          <template #default="{ active, toggle }">
            <v-card
              class="v-card--group py-3 px-4 text-center position-relative cursor-pointer d-flex align-center justify-space-between"
              :color="active ? 'primary' : `grey ${$vuetify.theme.dark ? 'darken' : 'lighten'}-3`"
              rounded
              flat
              @click="toggle"
            >
              {{ item.text }}
              <v-icon v-text="item.icon" />
            </v-card>
          </template>
        </v-item>
      </v-col>
    </v-item-group>
  </div>
</template>