<script>
/* global SEARCH_MAX_SUGGESTIONS, SEARCH_PATHS, SEARCH_HOTKEYS */
import VuetifySearchBox from "./VuetifySearchBox";
import TagTab from "./TagTab";

const appbar_background_url = "/theme/appbar_background.png";

export default {
  components: {
    TagTab,
    VuetifySearchBox,
  },

  data() {
    return {
      showSearchBox: false,
      keyword: '',
      titleSize: 20,
    }
  },

  computed: {
    mobile() {
      return this.$vuetify.breakpoint.xs;
    },
    imageUrl() {
      const image = this.$page.frontmatter.image;
      return image ? image : appbar_background_url;
    },
    titleStyle() {
      let style = {};
      // title will keep 20px on mobile
      if (!this.mobile) {
        style['fontSize'] = this.titleSize + 'px';
      }
      // show full title instead of '...', unless title is minimized.
      if (this.titleSize !== 20) {
        style['white-space'] = 'initial';
      }
      return style;
    }
  },

  mounted() {
    // 监听 appbar 高度改变 appbar-title 大小
    // 这里选择 appbar.computedOpacity 作为监听对象（appbar 最小时为 0，最大时为 1）
    this.titleSize = 20 + this.$refs.appbar.computedOpacity * 20;
    this.$watch(
      () => this.$refs.appbar.computedOpacity,
      (val) => this.titleSize = 20 + val * 20
    );

    // 监听
    document.addEventListener('keydown', this.onHotkey)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.onHotkey)
  },

  methods: {
    onHotkey(event) {
      if (event.target === document.body && SEARCH_HOTKEYS.includes(event.key)) {
        this.showSearchBox = true;
        event.preventDefault()
      }
    },
  },
};
</script>