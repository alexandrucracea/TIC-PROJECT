<template>
  <h1>Article Edit</h1>
  <div></div>
</template>

<script>
import axios from "axios";

export default {
  name: "AuctionEdit",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      name: "test",
      description: "test",
      colors: [],
      errors: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    async getAuction() {
      const auction = await axios.get(
        `${process.env.VUE_APP_API_URL}/auctions/${this.id}`
      );
      this.auction = auction?.data || {};
    },
  },
};
</script>

<style scoped></style>
