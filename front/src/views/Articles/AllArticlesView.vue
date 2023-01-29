<template>
  <main>
    <p v-if="error !== null">{{ error }}</p>
    <h1>Articles</h1>
    <div>
      <div>
        <router-link :to="'/add-article'">
          <button>Add article</button>
        </router-link>
      </div>
      <ul>
        <li v-for="article in articles" :key="article.id">
          <div>
            <router-link :to="'/articles/' + article.id">
              {{ article.name }}
            </router-link>
          </div>
          <div v-if="isAdmin">
            <button @click="handleDelete(article.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  name: "AllArticlesView",
  data() {
    return {
      error: null,
    };
  },
  created() {
    this.error = null;
    this.loadArticles();
  },
  computed: {
    articles() {
      console.log(this.$store.getters.getArticles);
      return this.$store.getters.getArticles;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    async loadArticles() {
      await this.$store.dispatch("loadArticles");
    },
    async handleDelete(articleId) {
      this.error = null;
      try {
        await this.$store.dispatch("deleteArticle", articleId);
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped></style>
