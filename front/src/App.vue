<template>
  <!-- <the-header></the-header> -->
  <router-view />
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bitter:wght@300;400;500;600;700&display=swap");

#app {
  font-family: Oswald;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  /* background-image: url("../pictures/login-background.jpg");
  background-size: cover;
  background-repeat: initial;
  background-size: 100vh; */
  /* height: 100%;
  width: 100%; */
}
* {
  margin: 0;
  --accent-color: #374a67;
  font-family: Bitter;
}
body {
  background-color: #eaeaea;
  height: 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
