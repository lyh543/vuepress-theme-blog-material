<template>
  <div id="base-list-layout">
    <div
      class="ui-posts"
      itemscope
      itemtype="http://schema.org/Blog"
    >
      <article
        v-for="page in pages"
        :key="page.key"
        class="ui-post"
        itemprop="blogPost"
        itemscope
        itemtype="https://schema.org/BlogPosting"
      >
        <meta
          itemprop="mainEntityOfPage"
          :content="page.path"
        >

        <header
          class="ui-post-title"
          itemprop="name headline"
        >
          <a :href="page.path">
            {{ page.title }}
          </a>
        </header>

        <client-only v-if="page.excerpt">
          <!-- eslint-disable vue/no-v-html -->
          <p
            class="ui-post-summary"
            itemprop="description"
            v-html="page.excerpt"
          />
          <!-- eslint-enable vue/no-v-html -->
        </client-only>
        <p
          v-else
          class="ui-post-summary"
          itemprop="description"
        >
          {{ page.frontmatter.summary || page.summary }}
        </p>

        <footer>
          <div
            v-if="page.frontmatter.author"
            class="ui-post-meta ui-post-author"
            itemprop="publisher author"
            itemtype="http://schema.org/Person"
            itemscope
          >
            <NavigationIcon />
            <span itemprop="name">{{ page.frontmatter.author }}</span>
            <span
              v-if="page.frontmatter.location"
              itemprop="address"
            >
              &nbsp; in {{ page.frontmatter.location }}
            </span>
          </div>

          <div
            v-if="page.frontmatter.date"
            class="ui-post-meta ui-post-date"
          >
            <ClockIcon />
            <time
              pubdate
              itemprop="datePublished"
              :datetime="page.frontmatter.date"
            >
              {{ resolvePostDate(page.frontmatter.date) }}
            </time>
          </div>

          <div
            v-if="page.frontmatter.tags"
            class="ui-post-meta ui-post-tag"
            itemprop="keywords"
          >
            <TagIcon />
            <router-link
              v-for="tag in resolvePostTags(page.frontmatter.tags)"
              :key="tag"
              :to="'/tag/' + tag"
            >
              {{ tag }}
            </router-link>
          </div>
        </footer>
      </article>
    </div>

    <component
      :is="paginationComponent"
      v-if="$pagination.length > 1 && paginationComponent"
    />
  </div>
</template>

<script>
/* global THEME_BLOG_PAGINATION_COMPONENT */

import Vue from 'vue'
import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs/plugin/utc'
import { NavigationIcon, ClockIcon, TagIcon } from 'vue-feather-icons'
import {
  Pagination,
  SimplePagination,
} from '@vuepress/plugin-blog/lib/client/components'

dayjs.extend(dayjsPluginUTC)

export default {
  components: { NavigationIcon, ClockIcon, TagIcon },

  data() {
    return {
      paginationComponent: null,
    }
  },

  computed: {
    pages() {
      return this.$pagination.pages
    },
  },

  created() {
    this.paginationComponent = this.getPaginationComponent()
  },

  methods: {
    getPaginationComponent() {
      const n = THEME_BLOG_PAGINATION_COMPONENT
      if (n === 'Pagination') {
        return Pagination
      }

      if (n === 'SimplePagination') {
        return SimplePagination
      }

      return Vue.component(n) || Pagination
    },

    resolvePostDate(date) {
      return dayjs
        .utc(date)
        .format(this.$themeConfig.dateFormat || 'ddd MMM DD YYYY')
    },

    resolvePostTags(tags) {
      if (!tags || Array.isArray(tags)) return tags
      return [tags]
    },
  },
}
</script>
