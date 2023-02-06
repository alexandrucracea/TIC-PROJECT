<template>
  <the-header></the-header>
  <h1>About action {{ name }}</h1>
  <div class="content-card">
    <div class="content-container">
      <div class="content-label">
        <p>Auction Name</p>
        <p>Status</p>
        <p>Description</p>
        <p>Articles</p>
        <!-- <p>Colors</p> -->
        <p>Start Date</p>
        <p>End Date</p>
      </div>
      <div class="content-values">
        <h2>{{ name }}</h2>
        <p>{{ status }}</p>
        <p>{{ description }}</p>
        <li v-for="article in articles" :key="article.id">
          {{ article.name }}
          <!-- TODO de adaugat aici o vizualizare custom printr-o componenta -->
        </li>
        <p>{{ startDate }}</p>
        <!-- TODO de convertit acest tip de data -->
        <p>{{ endDate }}</p>
      </div>
    </div>
    <div>
      <button @click="handleEdit" class="edit-button">Edit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AuctionGeneralInfo",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      auction: null,
    };
  },
  created() {
    this.getAuction();
  },
  computed: {
    status() {
      return this.auction?.status || "";
    },
    name() {
      return this.auction?.name || "";
    },
    description() {
      return this.auction?.description || "";
    },
    articles() {
      return this.auction?.articles || "";
    },
    endDate() {
      return this.auction?.endDate || "";
    },
    startDate() {
      return this.auction?.startDate || "";
    },
  },
  methods: {
    async getAuction() {
      const auction = await axios.get(
        `${process.env.VUE_APP_API_URL}/auctions/${this.id}`
      );
      this.auction = auction?.data || {};
    },
    handleEdit() {
      this.$router.push("/edit-auction/" + this.id);
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 1rem;
  font-weight: 400;
}
.content-card {
  /* background-color: yellow; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  /* height: 80vh; */
}
.content-container {
  height: 70vh;
  width: 60vw;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  background-color: rgba(194, 191, 191, 0.242);
  border: 1px solid rgba(255, 255, 255, 0.222);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 0.7rem;
  transition: all ease 0.3s;
  cursor: pointer;
  /* padding: 4rem 4rem 4rem 4rem; */
  /* margin: 4rem 4rem; */
}
.content-container:hover {
  box-shadow: 0px 0px 20px 1px #9d25014c;
  border: 1px solid rgba(255, 255, 255, 0.454);
}
.content-label {
  height: 70vh;
  width: 25vw;
  /* background-color: blue; */
  float: left;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.5rem;
}
p {
  padding: 1rem;
}
.content-values {
  /* background-color: green; */
  height: 70vh;
  width: 25vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 1.3rem;
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
  font-family: inherit;
  margin-top: 2rem;
  font-weight: bold;
  background-color: transparent;
  cursor: pointer;
  color: #9d2601;
}
button::before {
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

button:hover::before {
  width: 105%;
}
button:hover {
  color: #e3e3e3;
}
</style>
