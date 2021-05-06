// 在服务端app属性上添加方法
export default ({ app }) => {
  app.$console = content => {
    console.log(content);
  };
};
