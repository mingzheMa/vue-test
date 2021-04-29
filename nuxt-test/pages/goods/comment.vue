<template>
  <div>
    <h2>comment</h2>

    <nuxt-link to="/goods/comment/1">comment1</nuxt-link>
    <nuxt-link to="/goods/comment/2">comment2</nuxt-link>
    <!-- 如果想在展示comment-id组件时替换当前组件则需要把当前组件写在comment/index中 -->
    <nuxt-child />
  </div>
</template>

<script lang="ts">
export default {
  name: "goods-comment",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped></style>
