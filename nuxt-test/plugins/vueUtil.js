// 在vue实例上挂载方法
import Vue from "vue";

Vue.prototype.$console = content => {
  console.log(content);
};
