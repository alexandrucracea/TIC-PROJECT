<template>
  <div>
    <h1>Login form</h1>
    <form @submit.prevent="login">
      <label for="email">Email</label>
      <input type="email" id="email" v-model.trim="email" />
      <span v-if="emailError" class="error">{{ emailError }}</span>
      <label for="password">Password</label>
      <input type="password" id="password" v-model.trim="password" />
      <span v-if="passwordError" class="error">{{ passwordError }}</span>
      <button type="submit">Login</button>
      <span v-if="loginError" class="error">{{ loginError }}</span>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: {
        email: "",
        password: "",
        login: "",
      },
    };
  },
  computed: {
    emailError() {
      return this.error.email;
    },
    passwordError() {
      return this.error.password;
    },
    loginError() {
      return this.error.login;
    },
  },
  methods: {
    async fetchData(user) {
      const response = await axios.post(
        `${process.env.VUE_APP_API_URL}/login`,
        user
      );
      return response?.data || {};
    },
    async login() {
      this.error = {
        email: "",
        password: "",
        login: "",
      };
      if (!this.email) {
        this.error.email = "Email is required";
        return;
      }
      if (!this.password) {
        this.error.password = "Password is required";
        return;
      }
      const user = {
        email: this.email,
        password: this.password,
      };
      try {
        const response = await this.fetchData(user);
        const { idToken, email, expiresIn, localId } = response;
        if (idToken) {
          this.$store.dispatch("login", {
            email,
            expiresIn,
            idToken,
            localId,
          });
          this.$router.replace("/");
        } else {
          this.error.login = "Token is not valid";
        }
      } catch (error) {
        this.error.login = "Invalid email or password";
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
