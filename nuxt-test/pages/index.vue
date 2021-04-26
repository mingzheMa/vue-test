<template>
  <div>
    index

    {{ a }}
  </div>
</template>

<script>
export default {
  name: "index",

  // middleware: "auth",
  middleware() {
    console.log("middleware", "页面调用");
  },

  validate(context) {
    console.log(
      "validate",
      "在服务端调用，路由参数校验，返回布尔值，如果为flase，则页面返回404"
    );
    return true;
  },

  async asyncData(context) {
    await new Promise(res => {
      setTimeout(res, 1000);
    });

    console.log("asyncData", "返回值混入data对象，用于请求数据");

    return {
      a: 2,
      b: 3
    };
  },

  async fetch() {
    await new Promise(res => {
      setTimeout(res, 1000);
    });
    console.log("fetch", "可以获取store实例");
  },

  beforeCreated() {
    console.log("beforeCreated", "两端都会触发");
  },

  created() {
    console.log("created", "两端都会触发");
  },

  data() {
    return {
      a: 1
    };
  }
};
</script>
