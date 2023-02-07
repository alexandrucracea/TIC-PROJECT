<template>
  <div class="nav">
    <nav>
      <!-- <button>
        <router-link to="/">Home</router-link>
      </button> -->
      <!-- <button>
        <router-link to="/about">About</router-link>
      </button> -->
      <button>
        <router-link to="/auctions">All auctions</router-link>
      </button>
      <button>
        <router-link to="/articles">All articles</router-link>
      </button>
      <logout-button v-if="isAuthenticated" @logout="logout"></logout-button>
      <button v-else>
        <router-link to="/login">Login</router-link>
      </button>
    </nav>
  </div>
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
      this.$router.replace("/auctions");
    },
  },
};
</script>

<style scoped>
.nav {
  background-color: rgba(255, 255, 255, 0);
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--header-background);
  color: white;
  height: 2.5rem;
}

button {
  background-color: transparent;
  border: none;
}

button a {
  background-color: transparent;
  text-decoration: none;
  color: white;
  width: 5rem;
  padding: 0.5rem;
  /* background-color: red; */
}

button a.router-link-active {
  all: unset;
  background-color: white;
  padding: 0.5rem;
  color: var(--header-background);
}
</style>

<!-- TODO de stilizat pe aici cum vrea sufletelul tau -->
