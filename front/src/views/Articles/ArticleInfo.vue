<template>
  <div>
    <div>
      <h1>Article General Information</h1>
      <div>
        <h2>{{ name }}</h2>
        <p>{{ period }}</p>
        <p>{{ date }}</p>
        <p>{{ condition }}</p>
        <ul>
          <li v-for="color in colors" :key="color">{{ color }}</li>
        </ul>
        <p>{{ description }}</p>
        <p>{{ price }}</p>
        <p>{{ year }}</p>
      </div>
    </div>
    <div>
      <button @click="handleEdit">Edit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ArticleGeneralInfo",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      article: null,
    };
  },
  created() {
    this.getArticle();
  },
  computed: {
    name() {
      return this.article?.name || "";
    },
    period() {
      return this.article?.period || "";
    },
    date() {
      return this.article?.date || "";
    },
    condition() {
      return this.article?.condition || "";
    },
    description() {
      return this.article?.description || "";
    },
    price() {
      return this.article?.price || "";
    },
    colors() {
      return this.article?.colors || [];
    },
    year() {
      return this.article?.year || "";
    },
  },
  methods: {
    async getArticle() {
      const article = await axios.get(
        `${process.env.VUE_APP_API_URL}/articles/${this.id}`
      );
      this.article = article?.data || {};
    },
    handleEdit() {
      this.$router.push("/articles/" + this.id + "/edit");
    },
  },
};
</script>
