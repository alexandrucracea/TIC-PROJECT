<template>
  <the-header> </the-header>
  <main>
    <p v-if="error !== null">{{ error }}</p>
    <div>
      <img
        src="../../../pictures/article-background.jpg"
        alt="background"
        class="background"
      />
      <div>
        <router-link :to="'/add-article'">
          <button class="btn-add-article">Add article</button>
        </router-link>
      </div>
      <ul class="articles-list">
        <li
          v-for="article in articles"
          :key="article.id"
          class="article-container"
        >
          <div>
            <router-link :to="'/articles/' + article.id" class="article-name">
              {{ article.name }}
            </router-link>
          </div>
          <div v-if="isAdmin">
            <button @click="handleDelete(article.id)" class="btn-delete">
              Delete
            </button>
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

<style scoped>
.background {
  position: fixed;
  z-index: -1;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

.btn-add-article {
  padding: 0.8em 1.8em;
  border: none;
  position: relative;
  overflow: hidden;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  transition: 0.3s;
  z-index: 1;
  margin: 1rem;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
  color: #9d2601;
}

.articles-list {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  list-style: none;
  padding: 0;
}

.article-container {
  background-color: rgba(255, 255, 255, 0.579);
  height: 30vh;
  margin: 1rem;
  backdrop-filter: blur(10px);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.article-name {
  text-decoration: none;
  font-size: 1.2rem;
  color: var(--accent-color);
}

.btn-delete {
  padding: 0.8em 1.8em;
  border: none;
  position: relative;
  overflow: hidden;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  transition: 0.3s;
  z-index: 1;
  font-family: inherit;
  margin-top: 2rem;
  font-weight: bold;
  background-color: transparent;
  cursor: pointer;
  color: #9d2601;
}

.btn-delete::before {
  content: "";
  width: 0;
  height: 300%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background: #2c3e5087;
  transition: 0.5s ease;
  display: block;
  z-index: -1;
}

.btn-delete:hover::before {
  width: 105%;
}

.btn-delete:hover {
  color: #efeff0;
}
</style>
