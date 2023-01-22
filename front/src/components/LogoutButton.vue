<template>
  <button @click="logout">Logout</button>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/login");
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
