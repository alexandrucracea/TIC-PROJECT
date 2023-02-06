<template>
  <img src="../../pictures/login-background.jpg" class="background" />
  <div class="body">
    <div class="login-form">
      <h1>Welcome</h1>
      <form @submit.prevent="login" class="form">
        <div class="login-input email-input">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="login-input password-input">
          <span v-if="emailError" class="error">{{ emailError }}</span>
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>
        <div class="action">
          <button type="submit">Login</button>
          <span v-if="loginError" class="error">{{ loginError }}</span>
        </div>
      </form>
    </div>
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
          this.$router.replace("/auctions");
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
.background {
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
.body {
  width: 100vw;
  height: 92vh;
  display: flex;
  align-items: center;
  /* background-image: url("../../pictures/login-background.jpg");
  background-size: cover; */
}
.error {
  color: red;
}
button {
  padding: 0.8em 1.8em;
  border: 2px solid #2c3e50;
  position: relative;
  overflow: hidden;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  transition: 0.3s;
  z-index: 1;
  font-family: inherit;
  color: #2c3e50;
  margin-top: 2rem;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.714);
  cursor: pointer;
}

button::before {
  content: "";
  width: 0;
  height: 300%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background: #2c3e50;
  transition: 0.5s ease;
  display: block;
  z-index: -1;
}

button:hover::before {
  width: 105%;
}

button:hover {
  color: #efeff0;
}
h1 {
  padding: 3rem;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30rem;
  width: 80%;
  /* background-color: red; */
}
.login-form {
  background: #eaeaea95;
  /* width: 40%; */
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  height: 100vh;
  /* background-color: blue; */
}
.login-input {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
h1 {
  color: #2c3e50;
}
input {
  height: 2rem;
  width: 20rem;
  border: none;
  opacity: 0.7;
}
label {
  margin: 1.5rem 0;
  font-size: 1.2rem;
  /* color: var(--accent-color); */
  color: #2c3e50;
  font-weight: bold;
}
</style>
