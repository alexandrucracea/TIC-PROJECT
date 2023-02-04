<template>
  <div>
    <button @click="handleEditAuctionArticles">
      Modificati componenta articolelor existente in licitatiei
      <!-- TODO de intrebat Mihai cum fac aici cu selected checkbox -->
    </button>
    <button @click="handleEditAddAuctionArticles">
      Adaugati articole in licitatie
    </button>
    <button>Editati detaliile licitatiei</button>
    <div v-if="this.isEditingAuctionArticles">
      <h1>Choose articles</h1>
      <div>
        <ul>
          <li v-for="article in articles" :key="article.id">
            <input
              type="checkbox"
              name="auction-item"
              v-model="this.selectedArticles"
              :value="article"
            />
            <label for="aution-item">
              {{ article.name }}
            </label>
          </li>
        </ul>
        <div>
          <button @click="saveUpdatedAuctionArticles">
            Salveaza modificarile
          </button>
        </div>
      </div>
    </div>
    <div v-if="this.isAddingAuctionArticles">
      <h1>Choose articles</h1>
      <div>
        <ul>
          <li v-for="article in availableArticles" :key="article.id">
            <input
              type="checkbox"
              name="auction-item"
              v-model="this.selectedNewArticles"
              :value="article"
            />
            <label for="aution-item">
              {{ article.name }}
            </label>
          </li>
        </ul>
        <div>
          <button @click="saveAddedAuctionArticles">
            Salveaza modificarile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "EditArticlesOfAuctionView",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      error: null,
      loadedArticles: [],
      allArticles: [],
      areArticlesAdded: false,
      isEditingAuctionArticles: null,
      isAddingAuctionArticles: null,
      selected: true,
      selectedArticles: [],
      selectedNewArticles: [],
      // isEditingAuctionDetails: null,
    };
  },
  created() {
    this.error = null;
    this.loadAuctions();
    this.loadArticles();
    this.isEditingAuctionArticles = false;
    this.isAddingAuctionArticles = false;
  },
  computed: {
    articles() {
      return this.$store.getters.getAuctions.find(
        (auction) => auction.id === this.id
      ).articles;
      //TODO getAuctionArticles
    },
    availableArticles() {
      return this.$store.getters.getArticles.filter(
        (article) => article.available === true
      );
    },
    auction() {
      return this.$store.getters.getAuctions.find(
        (auction) => auction.id === this.id
      );
    },
  },
  methods: {
    async loadAuctions() {
      await this.$store.dispatch("loadAllAuctions");
      // this.isEditingAuctionArticles = true;
      //TODO loadAuctionArticles
    },
    async loadArticles() {
      await this.$store.dispatch("loadArticles");
    },
    handleEditAuctionArticles() {
      this.loadedArticles = this.articles;
      this.isEditingAuctionArticles = true;
    },
    handleEditAddAuctionArticles() {
      this.loadedArticles = this.articles;
      this.isAddingAuctionArticles = true;
      this.allArticles = this.availableArticles;
    },
    async saveUpdatedAuctionArticles() {
      const auction = this.auction;
      auction.articles = this.selectedArticles;
      await axios.put(
        `${process.env.VUE_APP_API_URL}/admin/auctions/${this.id}`,
        auction,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      this.$router.push(`/`);
    },
    async saveAddedAuctionArticles() {
      const auction = this.auction;
      auction.articles = this.loadedArticles.concat(this.selectedNewArticles);
      await axios.put(
        `${process.env.VUE_APP_API_URL}/admin/auctions/${this.id}`,
        auction,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // TODO -> cand adaugam articole sa setam available pe false si daca le scoatem din licitatie sa fie pe true
      this.$router.push(`/`);
    },
  },
};
</script>
<style scoped></style>
