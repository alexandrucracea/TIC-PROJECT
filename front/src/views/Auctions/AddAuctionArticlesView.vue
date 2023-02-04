<template>
  <main>
    <p v-if="error !== null">{{ error }}</p>
    <div>
      <div v-if="!this.areArticlesAdded">
        <h1>Choose articles</h1>
        <div>
          <ul>
            <li v-for="article in articles" :key="article.id">
              <input
                type="checkbox"
                id="auction-item"
                name="auction-item"
                v-model="this.selectedArticles"
                :value="article"
              />
              <label for="aution-item">
                {{ article.name }}
              </label>
            </li>
          </ul>
          <button @click="handleAddArticlesToAuction">Adauga</button>
        </div>
      </div>
      <div v-else>
        <AddAuctionView
          :loadedArticles="this.selectedArticles"
        ></AddAuctionView>
      </div>
    </div>
  </main>
</template>
<script>
import AddAuctionView from "./AddAuctionDetailsView.vue";
export default {
  //TODO de schimbat available in false atunci cand il adaugam
  name: "AddArticlesToAuctionView",
  data() {
    return {
      error: null,
      loadedArticles: [],
      areArticlesAdded: false,
      selectedArticles: [],
    };
  },
  components: {
    AddAuctionView,
  },
  created() {
    this.error = null;
    this.loadArticles();
  },
  computed: {
    articles() {
      return this.$store.getters.getArticles.filter(
        (article) => article.available === true
      );
    },
  },
  methods: {
    async loadArticles() {
      await this.$store.dispatch("loadArticles");
    },
    handleAddArticlesToAuction() {
      this.loadedArticles = this.articles;
      this.areArticlesAdded = true;
    },
  },
};
</script>
<style scoped></style>

//TODO de adaugat getters si setters
