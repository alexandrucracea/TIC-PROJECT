<template>
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
    </div>
  </div>
</template>

<script>
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
  },
  methods: {
    async getArticle() {
      this.article = await this.$store.dispatch("loadArticle", this.id);
    },
  },
};
</script>
