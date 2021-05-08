export default function({ $axios, req, $cookie }) {
  // 请求拦截
  $axios.onRequest(config => {
    // const cookie = req.headers.cookie ? $cookie.parse(req.headers.cookie) : {};

    // if (cookie.token) {
    //   config.headers.Authorization = cookie.token;
    // }
    config.headers.Authorization = "cookie.token";

    return config;
  });

  // 响应拦截
  $axios.onResponse(res => res.data);

  // 错误拦截
  $axios.onError(err => {
    const code = parseInt(err.response && err.response.status);
    if (code === 401) {
      redirect("/login");
    }
  });
}
