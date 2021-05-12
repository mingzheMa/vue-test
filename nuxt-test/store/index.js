export const actions = {
  nuxtServerInit({ dispatch }, { req }) {
    console.log("nuxtSeverInit", "服务器首次被访问调用，可以访问context对象");
    const cookie = req.headers.cookie && this.$cookie.parse(req.headers.cookie);
    if (cookie) {
      dispatch("user/whoAmI", cookie.token);
    }
  }
};
