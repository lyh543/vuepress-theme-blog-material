<template>
  <v-treeview
    activatable
    dense
    hoverable
    transition
    :items="tree"
    @update:active="gotoAnchor"
  />
</template>

<script>
import {buildTocTree} from "../utils/posts";

export default {
  computed: {
    tree() {
      return buildTocTree(this.$page.headers);
    }
  },

  mounted() {
    // smooth scrolling when clicking an anchor link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  },

  methods: {
    gotoAnchor(event) {
      console.log(event);
      if (event.length > 0) {
        // fixme: bug
        // window.location.href = '#' + event[0];
        var url = location.href;               //Save down the URL without hash.
        location.href = "#" + event[0];                 //Go to the target element.
        history.replaceState(null, null, url);   //Don't like hashes. Changing it back.
      }
    }
  }
}
</script>

<style lang="stylus">
.toc-link
  text-decoration: none
  color: rgba(0,0,0,0.87)
</style>