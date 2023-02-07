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
  --header-background: #984931;
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
/* Ipad */
@media only screen and (max-width: 1000px) {
  html {
    font-size: 50%;
  }
  .login-form {
    width: 50%;
    /* background-color: red; */
  }
  .articles-list {
    grid-template-columns: 50% 50%;
  }
  .sort-type {
    width: 15rem;
  }
}
/* mobile */
@media only screen and (max-width: 600px) {
  html {
    font-size: 50%;
  }
  .login-form {
    width: 50%;
    height: 3rem;
    /* background-color: blue; */
  }
  .articles-list {
    grid-template-columns: 100%;
  }
  .sort-type {
    width: 15rem;
    height: 3rem;
  }
}
/* desktop*/
@media only screen and (min-width: 1000px) {
  html {
    font-size: 80%;
  }
  .login-form {
    width: 50rem;
    /* background-color: yellow; */
  }
  .articles-list {
    grid-template-columns: 25% 25% 25% 25%;
  }
  .sort-type {
    width: 15rem;
    height: 3rem;
  }
}
</style>
