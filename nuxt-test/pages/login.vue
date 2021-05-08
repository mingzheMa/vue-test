<template>
  <div>
    <label>
      user:
      <input v-model="form.user" type="text" />
    </label>

    <label>
      password:
      <input v-model="form.password" type="password" />
    </label>

    <button @click="submit">submit</button>
  </div>
</template>

<script>
import { login } from "@/api/login.api";

export default {
  name: "login",

  layout: "outside",

  data() {
    return {
      form: {
        user: "",
        password: ""
      }
    };
  },

  methods: {
    async submit() {
      await login(this.form);

      this.$router.push("/");
    }
  }
};
</script>
