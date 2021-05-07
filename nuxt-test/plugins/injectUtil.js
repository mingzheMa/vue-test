// 使用inject方法同时注册在Vue，context，vuex上，并自动添加$前缀
import cookie from "cookie";
export default (context, inject) => {
  inject("cookie", cookie);
  inject("injectConsole", content => console.log(content));
};
