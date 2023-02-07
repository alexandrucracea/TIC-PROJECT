<template>
  <div>
    <!-- <h1>Edit auction {{ name }}</h1> -->
    <div class="main-form">
      <h2>Articles:</h2>
      <div
        v-for="article in this.loadedArticles"
        :key="article.id"
        class="article"
      >
        {{ article.name }}
      </div>
      <div class="page-content">
        <div class="edit-form">
          <form @submit.prevent="submitForm">
            <div class="label">Start Date</div>
            <input type="date" id="start-date" v-model="startDate" />
            <p v-if="errors.date" class="error">{{ errors.startDate }}</p>
            <div class="label">End Date</div>
            <input type="date" id="end-date" v-model="endDate" />
            <p v-if="errors.date" class="error">{{ errors.endDate }}</p>
            <div class="label">Description</div>
            <input type="text" id="description" v-model.trim="description" />
            <p v-if="errors.description" class="error">
              {{ errors.description }}
            </p>
            <p>Status</p>
            <select name="select-status" v-model="status">
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            <p v-if="errors.status" class="error">
              {{ errors.status }}
            </p>
            <div class="label">Name</div>
            <input type="text" id="name" v-model.trim="name" />
            <p v-if="errors.name" class="error">
              {{ errors.description }}
            </p>
            <div>
              <button type="submit" class="button-save">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "EditAuctionDetailsView",
  props: {
    loadedArticles: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      description: "",
      status: [],
      articles: [],
      name: "",
      errors: {
        startDate: "",
        endDate: "",
        description: "",
        status: "",
        name: "",
      },
    };
  },
  created() {
    this.getAuction();
    this.articles = this.loadedArticles;
  },
  methods: {
    async getAuction() {
      const auction = await axios.get(
        `${process.env.VUE_APP_API_URL}/auctions/${this.id}`
      );
      const { startDate, endDate, description, status, articles, name } =
        auction.data || {};
      this.startDate = startDate;
      this.endDate = endDate;
      this.description = description;
      this.status = status;
      this.articles = articles;
      this.name = name;
      //TODO de adaugat si pentru drop downul de culori
    },
    async submitForm() {
      this.reseError();
      const valid = this.validateForm();
      if (!valid) {
        return;
      }
      const auction = {
        startDate: this.startDate,
        endDate: this.endDate,
        description: this.description,
        status: this.status,
        name: this.name,
        articles: this.articles,
      };
      await axios.post(
        `${process.env.VUE_APP_API_URL}/admin/auctions`,
        auction,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //TODO de adaugat asta si in update
      // try {
      //   await this.$store.dispatch("updateArticleAvailability", this.articles);
      // } catch (error) {
      //   this.error = error.message;
      // }
      this.$router.push(`/auctions`);
    },
    reseError() {
      this.errors = {
        startDate: "",
        endDate: "",
        description: "",
        status: "",
        name: "",
      };
    },
    //TODO de adaugat validari sa nu trimitem obiecte undefined
    validateForm() {
      let valid = true;
      if (this.startDate.trim().length === 0) {
        this.errors.name = "StartDate is required";
        valid = false;
      }
      if (this.endDate.trim().length === 0) {
        this.errors.description = "EndDate is required";
        valid = false;
      }
      if (this.description.trim().length === 0) {
        this.errors.colors = "Description is required";
        valid = false;
      }
      if (this.status.trim().length === 0) {
        this.errors.price = "Status is required";
        valid = false;
      }
      if (this.name.trim().length === 0) {
        this.errors.condition = "Name is required";
        valid = false;
      }
      return valid;
    },
  },
};
</script>
<style scoped>
h2 {
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
}

.article {
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  padding: 0.8rem;
  border-top: 1px solid rgba(55, 53, 53, 0.579);
  border-bottom: 1px solid rgba(55, 53, 53, 0.579);
}
.edit-form {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
}

.main-form {
  margin-left: 10rem;
  margin-right: 10rem;
  background-color: rgba(240, 248, 255, 0.388);
  backdrop-filter: blur(5px);
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
  margin-top: 1rem;
}

.label {
  padding: 0.5rem;
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

input {
  padding: 0.1rem 0.5rem;
  width: 100%;
  border: none;
}

.button-save:hover {
  color: white;
}
</style>
//TODO de terminat partea asta
