// 权限校验白名单
export default function({ $cookie, req, redirect }) {
  console.log(
    "middleware",
    "首次服务端调用，可以访问context，可以在nuxt.config，layouts，pages调用，并且调用顺序由外到内"
  );
}
