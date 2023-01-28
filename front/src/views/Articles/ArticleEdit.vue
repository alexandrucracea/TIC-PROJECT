<template>
  <div>
    <p>Edit Article</p>
  </div>
  <div>
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
  name: "ArticleEdit",
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
    //todo de adaugat si celelalte campuri
  },
  created() {
    this.getArticle();
  },
  methods: {
    async getArticle() {
      const article = await axios.get(
        `${process.env.VUE_APP_API_URL}/articles/${this.id}`
      );
      const { name } = article.data || {};
      this.name = name;
      //TODO de adaugat si pentru drop downul de culori
    },
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
      };
      await axios.put(
        `${process.env.VUE_APP_API_URL}/admin/articles/${this.id}`,
        article,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      this.$router.push(`/articles/${this.id}`);
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
</script>
<style scoped>
.error {
  color: red;
}
</style>
