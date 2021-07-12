<!--  activity card  -->
<template>
  <v-card
    @click="gotoActivityDetail"
  >
    <v-img
      height="240"
      :src="activity.bannerUrl"
    >
      <template #placeholder>
        <PicturePlaceholderAlt />
      </template>
      <v-card-title class="activity-card-title">
        {{ activity.title }}
      </v-card-title>
      <CheckInStatusButton :activity="activity" />
    </v-img>

    <v-card-text>
      <div class="subtitle-1">
        {{ formattedTime }}
      </div>
      <div class="subtitle-1">
        {{ activity.location }}
      </div>
    </v-card-text>

    <v-divider />

    <v-card-text class="presenter-list-area">
    </v-card-text>
  </v-card>
</template>

<script>
import moment from "@theme/utils/moment";
import PicturePlaceholderAlt from "./PicturePlaceholderAlt";

export default {
  components: {PicturePlaceholderAlt},
  props: {
    activity: {
      type: Object,
      required: true
    }
  },

  data() {
    return {};
  },
  computed: {
    formattedTime() {
      return moment(this.activity.datetime).toChinese();
    }
  },

  methods: {
    gotoActivityDetail() {
      this.$router.push({
        name: 'ActivityDetail',
        params: {
          activity: this.activity,
          activityId: this.activity.id
        }
      })
    },
  }
}
</script>