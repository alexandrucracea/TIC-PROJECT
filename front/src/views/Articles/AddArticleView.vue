<template>
  <div>
    <h1>Add article</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Article Name</label>
        <input type="text" id="name" v-model.trim="name" />
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
        <!--de adaugat pentru fiecare input dupa ce adaug si restul campurilor-->
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddArticleView",
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
    async submitForm() {
      this.reseError();
      const valid = this.validateForm();
      if (!valid) {
        return;
      }
      const article = {
        name: this.name,
        description: "qd1H0FO1sY*bo&EmfwHT",
        colors: ["LimeGreen", "0x41fd10", "rgb(186,233,105)"],
        price: 872,
        period: "0iMCCxxYnX",
        condition: "D1h",
        date: new Date(),
        available: false,
        year: 2020,
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
      };
    },
    validateForm() {
      let valid = true;
      if (this.name.trim().length === 0) {
        this.errors.name = "Name of the article is required";
        valid = false;
      }
      return valid;
    },
  },
};
//TODO de adaugat aici toate campurile pentru care dorim sa facem aceste modificari
</script>

<style scoped></style>
