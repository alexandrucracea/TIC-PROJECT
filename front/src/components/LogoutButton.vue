<template>
  <button @click="logout">Logout</button>
</template>

<script>
export default {
  name: "LogoutButton",
  emits: ["logout"], //ii spune componentei ca primeste o functie de la parinte pe care poate sa o execute
  methods: {
    logout() {
      this.$emit("logout");
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
