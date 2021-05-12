import { login, whoAmI } from "@/api/login.api";

export const state = () => ({
  userInfo: {}
});

export const getters = {
  userNickName(state) {
    return state.userInfo.nick_name || "";
  }
};

export const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload;
  }
};

export const actions = {
  async login({ commit }, form) {
    const user = await login(form);

    document.cookie = this.$cookie.serialize("token", user.token, {
      maxAge: 60
    });

    commit("setUserInfo", user);

    return user;
  },

  logout({ commit }) {
    document.cookie = this.$cookie.serialize("token", "", {
      maxAge: 0
    });

    commit("setUserInfo", {});

    this.$router.push("/login");
  },

  async whoAmI({ commit }, token) {
    const user = await whoAmI(token);
    commit("setUserInfo", user);
    return user;
  }
};
