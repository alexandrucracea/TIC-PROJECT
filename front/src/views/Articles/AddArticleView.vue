<template>
  <div class="edit-form">
    <div>
      <h2>Edit Article</h2>
    </div>
    <div>
      <form @submit.prevent="submitForm">
        <div class="label">Article Name</div>
        <input type="text" id="name" v-model.trim="name" />
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
        <div class="label">Description</div>
        <input type="text" id="description" v-model.trim="description" />
        <p v-if="errors.description" class="error">
          {{ errors.description }}
        </p>
        <div class="label">Colors</div>
        <input type="color" id="colors" v-model.trim="colors" />
        <p v-if="errors.colors" class="error">{{ errors.colors }}</p>
        <div class="label">Price</div>
        <input type="text" id="price" v-model.trim="price" />
        <p v-if="errors.price" class="error">{{ errors.price }}</p>
        <div>
          <div class="label">Available</div>
          <input
            type="checkbox"
            id="available"
            name="available"
            value="available"
            class="checkbox"
          />
        </div>
        <div class="label">Period</div>
        <input type="text" id="period" v-model.trim="period" />
        <p v-if="errors.period" class="error">{{ errors.period }}</p>
        <div class="label">Condition</div>
        <input type="text" id="condition" v-model.trim="condition" />
        <p v-if="errors.condition" class="error">
          {{ errors.condition }}
        </p>
        <div class="edit-content">
          <div class="label">Date</div>
          <input type="date" id="date" v-model.trim="date" />
          <p v-if="errors.date" class="error">{{ errors.date }}</p>
        </div>
        <div class="label">Year</div>
        <input type="text" id="year" v-model.trim="year" />
        <p v-if="errors.year" class="error">{{ errors.year }}</p>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "AddArticleView",
  data() {
    return {
      name: "ceva",
      description: "ceva",
      colors: [],
      price: "",
      period: "",
      condition: "",
      date: "",
      available: "",
      year: "",
      errors: {
        name: "",
        description: "",
        colors: "",
        price: "",
        period: "",
        condition: "",
        date: "",
        available: "",
        year: "",
      },
    };
  },
  methods: {
    async submitForm() {
      this.reseError();
      const valid = this.validateForm();
      if (!valid) {
        return;
      }
      const article = {
        name: this.name,
        description: this.description,
        colors: this.colors,
        price: this.price,
        period: this.period,
        condition: this.condition,
        date: this.date,
        available: this.available, //TODO de intrebat pe mihai de ce nu merge aici
        year: this.year,
      };
      await axios.post(
        `${process.env.VUE_APP_API_URL}/admin/articles`,
        article,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      this.$router.push(`/`);
    },
    reseError() {
      this.errors = {
        name: "",
        description: "",
        colors: "",
        price: "",
        period: "",
        condition: "",
        date: "",
        available: "",
        year: "",
      };
    },
    validateForm() {
      let valid = true;
      if (this.name.trim().length === 0) {
        this.errors.name = "Name of the article is required";
        valid = false;
      }
      if (this.description.trim().length === 0) {
        this.errors.description = "Description of the article is required";
        valid = false;
      }
      if (this.colors.trim().length === 0) {
        this.errors.colors = "The colors of the article is required";
        valid = false;
      }
      if (this.price.trim().length === 0) {
        this.errors.price = "Price of the article is required";
        valid = false;
      }
      if (this.condition.trim().length === 0) {
        this.errors.condition = "Condition of the article is required";
        valid = false;
      }
      if (this.date.trim().length === 0) {
        this.errors.date = "Date of the article is required";
        valid = false;
      }
      return valid;
    },
  },
};
</script>

<style scoped></style>
