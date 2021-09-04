<template>
  <v-treeview
    activatable
    dense
    hoverable
    transition
    :items="tree"
    @update:active="clickToc"
  />
</template>

<script>
import {buildTocTree} from "../utils/posts";
import $ from 'jquery';


function jumpToAnchor(hash) {
  // Using jQuery's animate() method to add smooth page scroll
  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
  $('html, body').animate({
    scrollTop: $(hash).offset().top - 56
  }, 800, function(){
    // Add hash (#) to URL when done scrolling (default click behavior)
    window.location.hash = hash;
  });
}


export default {
  computed: {
    tree() {
      return buildTocTree(this.$page.headers);
    }
  },

  mounted() {
    $("a").on('click', function(event) {
      const hash = decodeURI(this.hash);
      // Make sure this.hash has a value before overriding default behavior
      if (hash !== "") {
        jumpToAnchor(hash);
      }
    });
  },

  methods: {
    clickToc(titles) {
      if (titles.length > 0) {
        jumpToAnchor(`#${titles[0]}`);
      }
    },
  }
}
</script>

<style lang="stylus">
.toc-link
  text-decoration: none
  color: rgba(0, 0, 0, 0.87)

//:target
//  padding-top: 65px;
//  margin-top: -65px;

</style>