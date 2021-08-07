<template>
  <div>
    <header>
      <PostMeta
        :tags="$frontmatter.tags"
        :date="$frontmatter.date"
      />
    </header>
    <Toc />
  </div>
</template>

<script>
import PostMeta from "./PostMeta";
import Toc from "./Toc";

export default {
  components: {Toc, PostMeta}
}
</script>