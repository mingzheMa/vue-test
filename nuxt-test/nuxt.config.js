export default {
  router: {
    middleware: "auth"
    // extendRoutes(routes, resolve) {
    //   // console.log(routes);
    //   // 注入命名视图
    //   const index = routes.findIndex(r => r.name === "index");
    //   routes[index] = {
    //     ...routes[index],
    //     components: {
    //       default: routes[index].component,
    //       ad: resolve(__dirname, "components/Ad.vue")
    //     },
    //     chunkNames: {
    //       ad: "components/Ad"
    //     }
    //   };
    // }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-test",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["view-design/dist/styles/iview.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/view-ui",
    // 只在客户端使用插件
    { src: "@/plugins/vueUtil", ssr: false },
    "@/plugins/appUtil",
    "@/plugins/injectUtil",
    { src: "@/plugins/axios.serve", ssr: true }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

  // axios配置
  axios: {
    proxy: true
  },

  // 配置代理
  proxy: {
    // "/mock/":"https://getman.cn"
    "/mock/": {
      target: "https://getman.cn"
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
