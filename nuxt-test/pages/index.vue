<template>
  <div>
    <h3>本地数据</h3>
    <p>{{ staticData }}</p>

    <h3>跨域数据</h3>
    <p>{{ corsData }}</p>
  </div>
</template>

<script>
export default {
  name: "index",

  // middleware: "auth",
  middleware({ app }) {
    app.$console("app $console");
    app.$injectConsole("app $injectConsole");
    console.log("middleware", "页面调用");
  },

  validate(context) {
    console.log(
      "validate",
      "在服务端调用，路由参数校验，返回布尔值，如果为flase，则页面返回404"
    );
    return true;
  },

  async asyncData({ $axios, error }) {
    // await new Promise(res => {
    //   setTimeout(res, 1000);
    // });

    console.log("asyncData", "返回值混入data对象，用于请求数据");

    // 调用error方法返回状态码
    // error({
    //   statusCode: 404,
    //   message: "404"
    // });

    // 获取本地数据
    const staticData = await $axios.get("/data/text.json");

    // 跨域数据
    const corsData = await $axios.get("/mock/route/to/demo");

    return {
      staticData,
      corsData
    };
  },

  async fetch() {
    // await new Promise(res => {
    //   setTimeout(res, 1000);
    // });
    console.log("fetch", "可以获取store实例");
  },

  beforeCreate() {
    console.log("beforeCreate", "两端都会触发");
  },

  created() {
    console.log("created", "两端都会触发");
  },

  mounted() {
    // this.$injectConsole("vue $injectConsole");
    // this.$console("vue $console");
  },

  data() {
    return {};
  }
};
</script>
