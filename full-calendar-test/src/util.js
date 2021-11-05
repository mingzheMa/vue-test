import Vue from "vue";
export const comp2Dom = (comp, ...parmas) => {
  const vm = new Vue({
    render: (h) => h(comp, ...parmas),
  });

  vm.$mount();
  return vm.$el;
};
