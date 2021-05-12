export async function login(form) {
  console.log("login", form);

  const user = await Promise.resolve({
    nick_name: "mmz",
    token: Math.random()
  });

  return user;
}

export async function whoAmI(token) {
  console.log("whoAmI", token);

  const user = await Promise.resolve({
    nick_name: "mmz",
    token
  });

  return user;
}
