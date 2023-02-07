<template>
  <the-header></the-header>
  <img src="../../../pictures/add-auction-background.jpg" class="background" />
  <main>
    <p v-if="error !== null">{{ error }}</p>
    <div class="choose-articles-container">
      <div v-if="!this.areArticlesAdded">
        <h1>Choose articles</h1>
        <div v-if="!this.anyAvailableArticles">
          <div>
            <div
              v-for="article in articles"
              :key="article.id"
              class="article-item"
            >
              <input
                type="checkbox"
                id="auction-item"
                name="auction-item"
                v-model="this.selectedArticles"
                :value="article"
                class="input"
              />
              <label for="aution-item">
                {{ article.name }}
              </label>
              <p></p>
              <hr style="width: 100%; height: 1px" />
            </div>
          </div>
        </div>
        <div v-else>There are no available articles to add</div>
        <button @click="handleAddArticlesToAuction" class="button-continue">
          Continue
        </button>
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
  name: "AddArticlesToAuctionView",
  data() {
    return {
      error: null,
      loadedArticles: [],
      areArticlesAdded: false,
      selectedArticles: [],
      anyAvailableArticles: false,
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
      console.log(this.loadedArticles.length);
      if (this.loadedArticles.length > 0) {
        this.anyAvailableArticles = true;
      } else {
        this.anyAvailableArticles = false;
      }
      this.areArticlesAdded = true;
    },
  },
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

.button-continue {
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

.button-continue::before {
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

.button-continue:hover::before {
  width: 150%;
}

.button-continue:hover {
  color: white;
}
</style>

//TODO de adaugat getters si setters
