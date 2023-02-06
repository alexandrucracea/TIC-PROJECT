<template>
  <the-header></the-header>
  <!-- TODO de adaugat erorile -->
  <img
    src="../../../pictures/auction-background.jpg"
    alt="background"
    class="background"
  />
  <router-link :to="'/add-auction'">
    <button class="btn-add-auction">Add auctions</button>
  </router-link>

  <div class="table-container">
    <div class="tbl-header">
      <table cellpadding="0" cellspacing="0" border="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th v-if="isAdmin">Delete</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="tbl-content">
      <table cellpadding="0" cellspacing="0" border="0">
        <tbody v-for="auction in auctions" :key="auction.id">
          <tr>
            <td class="auction-link">
              <router-link :to="'/auctions/' + auction.id" class="auction-name">
                {{ auction.name }}
              </router-link>
            </td>
            <td>{{ auction.startDate }}</td>
            <td>{{ auction.endDate }}</td>
            <td>{{ auction.status }}</td>
            <td v-if="isAdmin">
              <button @click="handleDelete(auction.id)" class="btn-delete">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
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

<style scoped>
.background {
  position: fixed;
  z-index: -1;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
.btn-add-auction {
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
.table-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10rem;
  margin-right: 10rem;
  margin-top: 4rem;
}
table {
  width: 100%;
  table-layout: fixed;
}
.tbl-header {
  background-color: rgba(255, 255, 255, 0.921);
}
.tbl-content {
  height: 30rem;
  overflow-x: auto;
  margin-top: 0px;
  border: none;
}
th {
  /* padding: 20px 15px; */
  text-align: left;
  font-weight: 500;
  font-size: 1.2rem;
  color: #2c3e50c1;
  text-transform: uppercase;
  font-weight: bold;
  font-size: medium;
  padding: 0.5rem;
}
.auction-name {
  text-decoration: none;
  color: #2c3e50c1;
}
td {
  padding: 0.5rem;
  text-align: left;
  vertical-align: middle;
  font-weight: 400;
  font-size: 0.8rem;
  color: #2c3e50c1;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.852);
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
}
button {
  padding-left: 0%;
}
.btn-delete {
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
