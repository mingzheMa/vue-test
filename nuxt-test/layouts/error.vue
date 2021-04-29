<template>
  <div>
    <p>error page</p>
    <p>错误页面，会替换布局中的Nuxt组件，当然也可以修改布局配置</p>

    <p>{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "error",

  layout:"test",

  props: {
    error: Object
  },

  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped></style>
