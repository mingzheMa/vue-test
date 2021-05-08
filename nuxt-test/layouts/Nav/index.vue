<template>
  <div class="nav">
    <div>
      <nuxt-link to="/">index</nuxt-link>
      <nuxt-link to="/movie">movie</nuxt-link>
      <nuxt-link to="/table-demo">table-demo</nuxt-link>
      <nuxt-link to="/goods">goods</nuxt-link>
    </div>

    <div v-if="userInfo.token">
      {{ userNickName }}
      <a @click="logout">注销</a>
    </div>

    <div v-else>
      <nuxt-link to="/login">登录</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "Nav",

  computed: {
    ...mapState("user", ["userInfo"]),
    ...mapGetters("user", ["userNickName"])
  },

  data() {
    return {};
  },

  methods: {
    ...mapActions("user", ["logout"])
  }
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
