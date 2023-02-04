<template>
  <h1>Auction General Information</h1>
  <div>
    <h2>{{ name }}</h2>
    <p>{{ status }}</p>
    <p>{{ description }}</p>
    <li v-for="article in articles" :key="article.id">
      {{ article }}
      <!-- TODO de adaugat aici o vizualizare custom printr-o componenta -->
    </li>
    <p>{{ startDate }}</p>
    <!-- TODO de convertit acest tip de data -->
    <p>{{ endDate }}</p>
    <div>
      <button @click="handleEdit">Edit</button>
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

<style scoped></style>
