export default function(context) {
  console.log(
    "middleware",
    "服务端调用，可以访问context，可以在nuxt.config，layouts，pages调用，并且调用顺序由外到内"
  );
}
