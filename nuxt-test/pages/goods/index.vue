<template>
  <div>
    <h2>goods</h2>

    <ul>
      <nuxt-link
        :to="{ name: 'goods-id', params: { id: 1 }, query: { a: 1, b: 2 } }"
      >
        goods1
      </nuxt-link>
      <nuxt-link
        :to="{ name: 'goods-id', params: { id: 2 }, query: { a: 11, b: 22 } }"
      >
        goods2
      </nuxt-link>
      <nuxt-link to="/goods/3?a=111&b=222">goods3</nuxt-link>

      <nuxt-link to="/goods/comment">comment</nuxt-link>
    </ul>

    <br />

    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: "goods",

  // 该中间件为@nuxtjs/auth-next库生成的中间件，在nuxt.config > auth配置
  middleware: "auth",

  transition: "goods",

  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped></style>
