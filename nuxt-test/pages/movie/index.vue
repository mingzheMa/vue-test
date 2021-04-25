<template>
  <div>
    <h1>movie list</h1>

    <ul>
      <template v-for="num in 10">
        <li :key="num">
          <h2>
            <nuxt-link :to="`/movie/${num}`">
              {{ num }}
            </nuxt-link>
          </h2>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "movie",

  // key(route) {
  //   console.log(route);
  //   return route.fullPath;
  // },

  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped></style>
