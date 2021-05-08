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
import { mapActions } from "vuex";

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
    ...mapActions("user", ["login"]),

    async submit() {
      await this.login(this.form);

      this.$router.push("/");
    }
  }
};
</script>
