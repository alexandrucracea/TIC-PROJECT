<template>
  <the-header></the-header>
  <img
    src="../../../pictures/edit-auction-details-background.jpg"
    class="background"
  />
  <div>
    <button @click="handleEditAuctionArticles">Delete articles</button>
    <button @click="handleEditAddAuctionArticles">Add articles</button>
    <button @click="handleEditAuctionDetails">Edit details</button>
    <div v-if="this.isEditingAuctionArticles">
      <div class="choose-articles-container">
        <h1>Choose articles</h1>
        <div>
          <div
            v-for="article in articles"
            :key="article.id"
            class="article-item"
          >
            <input
              type="checkbox"
              name="auction-item"
              v-model="this.loadedArticles"
              :value="article"
              class="input"
            />
            <label for="aution-item">
              {{ article.name }}
            </label>
            <p></p>
            <hr style="width: 100%; height: 1px" />
          </div>
          <div>
            <button @click="saveUpdatedAuctionArticles" class="button-save">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="this.isAddingAuctionArticles">
      <h1>Choose articles</h1>
      <div>
        <div v-for="article in availableArticles" :key="article.id">
          <input
            type="checkbox"
            name="auction-item"
            v-model="this.selectedNewArticles"
            :value="article"
            class="input"
          />
          <label for="aution-item">
            {{ article.name }}
          </label>
        </div>
        <div>
          <button @click="saveAddedAuctionArticles">Save</button>
        </div>
      </div>
    </div>
    <div v-if="this.isEditingAuctionDetails">
      <EditAuctionDetailsView
        :loadedArticles="this.loadedArticles"
        :id="this.id"
      ></EditAuctionDetailsView>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import EditAuctionDetailsView from "./EditAuctionDetailsView.vue";

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
      isEditingAuctionArticles: false,
      isAddingAuctionArticles: false,
      selected: true,
      selectedArticles: [],
      selectedNewArticles: [],
      isEditingAuctionDetails: false,
    };
  },
  created() {
    this.error = null;
    this.loadAuctions();
    this.loadArticles();
    this.isEditingAuctionArticles = false;
    this.isAddingAuctionArticles = false;
    this.isEditingAuctionDetails = false;
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
      this.isAddingAuctionArticles = false;
      this.isEditingAuctionDetails = false;
    },
    handleEditAddAuctionArticles() {
      this.loadedArticles = this.articles;
      this.isAddingAuctionArticles = true;
      this.isEditingAuctionArticles = false;
      this.isEditingAuctionDetails = false;
      this.allArticles = this.availableArticles;
    },
    handleEditAuctionDetails() {
      this.loadedArticles = this.articles;
      this.isEditingAuctionDetails = true;
      this.isAddingAuctionArticles = false;
      this.isEditingAuctionArticles = false;
    },
    async saveUpdatedAuctionArticles() {
      const auction = this.auction;
      auction.articles = this.loadedArticles;
      console.log(auction.articles);
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
      try {
        await this.$store.dispatch(
          "updateArticleAvailability",
          auction.articles,
          false
        );
      } catch (error) {
        this.error = error.message;
      }
      // TODO -> cand adaugam articole sa setam available pe false si daca le scoatem din licitatie sa fie pe true
      this.$router.push(`/`);
    },
  },
  components: { EditAuctionDetailsView },
};
</script>
<style scoped>
.background {
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  /* opacity: 0.8; */
}

h1 {
  padding: 1rem;
}

.choose-articles-container {
  background-color: rgba(240, 248, 255, 0.388);
  backdrop-filter: blur(5px);
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.article-item {
  list-style: none;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
}
.article-item hr {
  border: none;
  background-color: #9d2601;
  height: 2px;
  margin-top: 1rem;
}

.input {
  -webkit-appearance: none;
  background-color: #fafafa;
  border: 1px solid #cacece;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 9px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
  margin-right: 1rem;
}

.input:active,
.input:checked:active {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px 1px 3px rgba(0, 0, 0, 0.1);
}

.input:checked {
  background-color: #e9ecee;
  border: 1px solid #adb8c0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
    inset 15px 10px -12px rgba(255, 255, 255, 0.1);
  color: #99a1a7;
}

.input:checked:after {
  content: "\2714";
  font-size: 14px;
  position: absolute;
  top: 0px;
  left: 3px;
  color: #9d2601;
}

button {
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

.button-save {
  padding-top: 0.8em;
  padding-bottom: 0.8em;
  border: none;
  position: relative;
  overflow: hidden;
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  transition: 0.3s;
  z-index: 1;
  font-family: inherit;
  /* margin-top: 2rem; */
  font-weight: bold;
  background-color: transparent;
  cursor: pointer;
  color: #9d2601;
  margin-bottom: 1rem;
}

.button-save::before {
  content: "";
  width: 0;
  height: 300%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background: #9d2601;
  transition: 0.5s ease;
  display: block;
  z-index: -1;
}

.button-save:hover::before {
  width: 150%;
}

.button-save:hover {
  color: white;
}
</style>
