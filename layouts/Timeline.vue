<template>
  <v-container>
    <v-row class="justify-center">
      <v-col
        cols="12"
        sm="8"
      >
        <v-timeline
          align-top
          dense
        >
          <v-timeline-item
            key="total"
            icon="mdi-text"
            fill-dot
            :color="colors[0]"
          >
            <div class="py-2">
              共 {{ posts.length }} 篇
            </div>
          </v-timeline-item>
          <template v-for="(node, index) in timelineNodes">
            <v-timeline-item
              v-if="node.isDate"
              :key="node.date"
              icon="mdi-calendar"
              fill-dot
              :color="colors[(index+1) % colors.length]"
            >
              <div class="py-2">
                <strong>{{ node.date }}</strong> （{{ node.postsCount }} 篇）
              </div>
            </v-timeline-item>

            <v-timeline-item
              v-else
              :key="node.key"
              :color="colors[(index+1) % colors.length]"
              small
            >
              <v-row>
                <v-col
                  cols="3"
                  sm="2"
                >
                  {{ node.postDate.slice(5) }}
                </v-col>
                <v-col>
                  <router-link
                    :to="node.path"
                    class="no-decoration"
                  >
                    <strong>{{ node.title }}</strong>
                  </router-link>
                </v-col>
              </v-row>
            </v-timeline-item>
          </template>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {getPostDateOrLastUpdated} from "../utils/posts";
import {colors} from "../utils/constants";

export default {
  data() {
    return {
      posts: [],
      timelineNodes: [],
      colors,
    };
  },
  created() {
    this.timelineNodes = [];
    const dateFormat = this.$themeConfig.dateFormat;
    // calculate postTime and sort by postTime.
    this.posts = this.$site.pages
      .filter(page => page.id === 'post')
      .map(post => {
        post.postDate = getPostDateOrLastUpdated(post, dateFormat);
        return post;
      })
      .sort((post1, post2) => (post1.postDate < post2.postDate ? 1 : -1));

    /*
     * Copy posts to timeline node
     * and insert a date node when the current post and the previous post are posted in different month
     */
    let lastDateIndex = -1;
    for (let i = 0; i < this.posts.length; i++) {
      if (i === 0 || this.posts[i].postDate.slice(0, 7) !== this.posts[i - 1].postDate.slice(0, 7)) {
        if (lastDateIndex !== -1) {
          this.timelineNodes[lastDateIndex].postsCount = this.timelineNodes.length - lastDateIndex - 1;
        }
        lastDateIndex = this.timelineNodes.length;
        this.timelineNodes.push({
          isDate: true,
          date: this.posts[i].postDate.slice(0, 7)
        });
      }
      this.timelineNodes.push({
        ...this.posts[i],
        isDate: false
      });
    }
    if (lastDateIndex !== -1) {
      this.timelineNodes[lastDateIndex].postsCount = this.timelineNodes.length - lastDateIndex - 1;
    }
  }
}
</script>