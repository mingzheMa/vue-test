import cookie from "cookie";
export async function login(form) {
  console.log("login", form);

  const user = await Promise.resolve({
    nick_name: "mmz",
    token: Math.random()
  });

  document.cookie = cookie.serialize("token", user.token, {
    maxAge: 60
  });

  return user;
}
