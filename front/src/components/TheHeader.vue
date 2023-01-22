<template>
  <nav>
    <button>
      <router-link to="/">Home</router-link>
    </button>
    <button>
      <router-link to="/about">About</router-link>
    </button>
    <button v-if="isAuthenticated">
      <logout-button></logout-button>
    </button>
    <button v-else>
      <router-link to="/login">Login</router-link>
    </button>
  </nav>
</template>
<script>
import LogoutButton from "./LogoutButton.vue";

export default {
  components: {
    LogoutButton,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
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
