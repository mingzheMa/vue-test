<template>
  <div>
    <h1>movie details, movie id:{{ $route.params.id }}</h1>
    <nuxt-link to="/movie">&lt;back</nuxt-link>
  </div>
</template>

<script lang="ts">
export default {
  name: "movie-id",

  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang="less" scoped></style>
