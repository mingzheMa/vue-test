// 使用inject方法同时注册在Vue，context，vuex上，并自动添加$前缀
export default (context, inject) => {
  inject("injectConsole", content => console.log(content));
};
