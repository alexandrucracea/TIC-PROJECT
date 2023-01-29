<template>
  <nav>
    <button>
      <router-link to="/">Home</router-link>
    </button>
    <button>
      <router-link to="/about">About</router-link>
    </button>
    <button v-if="isAuthenticated">
      <router-link to="/auctions">All auctions</router-link>
    </button>
    <button v-if="isAuthenticated">
      <router-link to="/articles">All articles</router-link>
    </button>
    <logout-button v-if="isAuthenticated" @logout="logout"></logout-button>
    <button v-else>
      <router-link to="/login">Login</router-link>
    </button>
  </nav>
</template>
<script>
import LogoutButton from "./LogoutButton.vue";

export default {
  name: "TheHeader",
  data() {
    return {
      isLoggenIn: false,
    };
  },
  components: {
    LogoutButton,
  },
  computed: {
    isAuthenticated() {
      return this.isLoggenIn || this.$store.getters.token !== null;
    },
  },
  created() {
    this.isLoggenIn = this.$store.getters.isAuthenticated;
  },
  methods: {
    logout() {
      this.isLoggenIn = false;
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
button {
  all: unset;
}
</style>

<!-- TODO de stilizat pe aici cum vrea sufletelul tau -->
