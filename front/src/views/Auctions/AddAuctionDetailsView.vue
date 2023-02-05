<template>
  <div>
    <h1>Add auction</h1>
    <ul>
      <li v-for="article in this.loadedArticles" :key="article.id">
        {{ article.name }}
      </li>
    </ul>
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
      <div class="label">Status</div>
      <input type="text" id="status" v-model.trim="status" />
      <p v-if="errors.status" class="error">
        {{ errors.status }}
      </p>
      <div class="label">Name</div>
      <input type="text" id="name" v-model.trim="name" />
      <p v-if="errors.name" class="error">
        {{ errors.description }}
      </p>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AddAuctionDetailsView",
  props: {
    loadedArticles: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      description: "",
      status: "",
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
    this.articles = this.loadedArticles;
  },
  methods: {
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
      // console.log(this.articles[0].available);
      // console.log(this.articles[0].currentTarget.dataset.target);
      // for (const article in auction.articles) {
      //   article["available"] = false;
      //   console.log(article.available);
      //   await axios.put(
      //     `${process.env.VUE_APP_API_URL}/admin/articles/${article.id}`,
      //     article
      //   );
      // }
      await axios.post(
        `${process.env.VUE_APP_API_URL}/admin/auctions`,
        auction,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      for (let i = 0; i < this.articles.length; i++) {
        this.articles[i].available = false;
        await axios.put(
          `${process.env.VUE_APP_API_URL}/admin/articles/${this.articles[i].id}`,
          this.articles[i],
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } //TODO de adaugat asta si in update
      this.$router.push(`/`);
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
<style scoped></style>
//TODO de terminat partea asta
