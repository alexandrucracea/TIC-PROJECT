<template>
  <the-header></the-header>
  <h1>Auctions</h1>
  <router-link :to="'/add-auction'">
    <button>Add auctions</button>
  </router-link>

  <ul>
    <li v-for="auction in auctions" :key="auction.id">
      <router-link :to="'/auctions/' + auction.id">
        {{ auction.name }}
      </router-link>
      <div v-if="isAdmin">
        <button @click="handleDelete(auction.id)">Delete</button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "AllAuctionsButton",
  data() {
    return {
      error: null,
    };
  },
  created() {
    this.error = null;
    this.loadAllAuctions();
  },
  computed: {
    auctions() {
      console.log(this.$store.getters.getAuctions);
      return this.$store.getters.getAuctions;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    async loadAllAuctions() {
      await this.$store.dispatch("loadAllAuctions");
    },
    async handleDelete(auctionId) {
      this.error = null;
      try {
        await this.$store.dispatch("deleteAuction", auctionId);
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped></style>
