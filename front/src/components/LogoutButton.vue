<template>
  <button v-if="isAuthenticated" @click="logout">Logout</button>
</template>

<script>
export default {
  name: "LogoutButton",
  props: {
    isLoggenIn: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["logout"], //ii spune componentei ca primeste o functie de la parinte pe care poate sa o execute
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
  computed: {
    isAuthenticated() {
      return this.isLoggenIn || this.$store.getters.token !== null;
    },
  },
};
</script>

<style scoped>
button {
  all: unset;
  cursor: pointer;
}
</style>
