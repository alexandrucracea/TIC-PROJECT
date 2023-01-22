<template>
  <main>
    <h1>Articles</h1>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <router-link :to="'/articles/' + article.id">
          {{ article.name }}
        </router-link>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  name: "HomeView",
  created() {
    this.loadArticles();
  },
  computed: {
    articles() {
      console.log(this.$store.getters.getArticles);
      return this.$store.getters.getArticles;
    },
  },
  methods: {
    async loadArticles() {
      await this.$store.dispatch("loadArticles");
    },
  },
};
</script>
