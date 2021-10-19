<template>
  <div id="searchbox">
    <v-text-field
      ref="input"
      v-model="query"
      style="margin-top: 8px"
      hide-details
      single-line
      clearable
      :placeholder="placeholder"
      prepend-icon="mdi-magnify"
      autofocus
      @click:clear="query=''"
    />

    <v-fade-transition>
      <v-sheet
        v-if="showSuggestions"
        elevation="8"
        light
        rounded
      >
        <v-list-item
          v-for="post in suggestions"
          :key="post.path"
          link
          dense
          :to="post.path"
          @click="$emit('close:searchbox')"
        >
          <v-list-item-title>
            <div class="d-inline-block">
              {{ post.title || post.path }}
            </div>
            <v-list-item-subtitle
              v-if="post.header"
              class="d-inline-flex"
            >
              &gt; {{ post.header.title }}
            </v-list-item-subtitle>
          </v-list-item-title>
        </v-list-item>
      </v-sheet>
    </v-fade-transition>
  </div>
</template>

<script>
// https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/plugin-search/SearchBox.vue
import matchQuery from '@vuepress/plugin-search/match-query'

/* global SEARCH_MAX_SUGGESTIONS, SEARCH_PATHS, SEARCH_HOTKEYS */
export default {
  name: 'VuetifySearchBox',

  data() {
    return {
      query: '',
    }
  },

  computed: {
    placeholder() {
      return this.$site.themeConfig.searchPlaceholder || '按 / 即可跳到搜索框';
    },
    showSuggestions() {
      return this.query
        && this.suggestions
        && this.suggestions.length;
    },

    suggestions() {
      const query = this.query.trim().toLowerCase()
      if (!query) {
        return
      }

      const {pages} = this.$site
      const max = this.$site.themeConfig.searchMaxSuggestions || SEARCH_MAX_SUGGESTIONS
      const localePath = this.$localePath
      const res = []
      for (let i = 0; i < pages.length; i++) {
        if (res.length >= max) break
        const p = pages[i]
        // filter out results that do not match current locale
        if (this.getPageLocalePath(p) !== localePath) {
          continue
        }

        // filter out results that do not match searchable paths
        if (!this.isSearchable(p)) {
          continue;
        }

        if (matchQuery(query, p)) {
          res.push(p)
        } else if (p.headers) {
          for (let j = 0; j < p.headers.length; j++) {
            if (res.length >= max) break
            const h = p.headers[j]
            if (h.title && matchQuery(query, p, h.title)) {
              res.push(Object.assign({}, p, {
                path: p.path + '#' + h.slug,
                header: h
              }))
            }
          }
        }
      }
      return res
    },
  },

  mounted() {
    // fix searchbox width when it's initialized
    const element = document.getElementById('searchbox');
    const clientWidth = element.clientWidth;
    element.style.width = clientWidth + 'px';

    document.addEventListener('keydown', this.onHotkey);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.onHotkey);
  },

  methods: {
    getPageLocalePath(page) {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
          return localePath
        }
      }
      return '/'
    },

    isSearchable(page) {
      let searchPaths = SEARCH_PATHS

      // all paths searchables
      if (searchPaths === null) {
        return true
      }

      searchPaths = Array.isArray(searchPaths) ? searchPaths : new Array(searchPaths)

      return searchPaths.filter(path => {
        return page.path.match(path)
      }).length > 0
    },

    onHotkey(event) {
      if (event.srcElement === document.body && SEARCH_HOTKEYS.includes(event.key)) {
        this.$refs.input.focus()
        event.preventDefault()
      }
    }
  }
}
</script>
