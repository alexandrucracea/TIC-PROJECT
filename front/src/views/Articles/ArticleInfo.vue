<template>
  <the-header></the-header>
  <div>
    <h1>About {{ name }}</h1>
    <div class="content-card">
      <div class="content-container">
        <div class="content-label">
          <p>Article Name</p>
          <p>Period</p>
          <p>Date</p>
          <p>Condition</p>
          <!-- <p>Colors</p> -->
          <p>Description</p>
          <p>Price</p>
          <p>Year</p>
        </div>
        <div class="content-values">
          <p>{{ name }}</p>
          <p>{{ period }}</p>
          <p>{{ date }}</p>
          <p>{{ condition }}</p>
          <!-- <ul>
            <li v-for="color in colors" :key="color">{{ color }}</li>
          </ul> -->
          <p>{{ color }}</p>
          <p>{{ description }}</p>
          <p>{{ price }}</p>
          <p>{{ year }}</p>
        </div>
      </div>
      <div class="edit-button">
        <button @click="handleEdit">Edit</button>
      </div>
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
<style scoped>
h1 {
  text-align: center;
  margin: 1rem;
  font-weight: 400;
}
.content-card {
  /* background-color: yellow; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  /* height: 80vh; */
}
.content-container {
  height: 70vh;
  width: 60vw;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  background-color: rgba(194, 191, 191, 0.242);
  border: 1px solid rgba(255, 255, 255, 0.222);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 0.7rem;
  transition: all ease 0.3s;
  cursor: pointer;
  /* padding: 4rem 4rem 4rem 4rem; */
  /* margin: 4rem 4rem; */
}
.content-container:hover {
  box-shadow: 0px 0px 20px 1px #9d25014c;
  border: 1px solid rgba(255, 255, 255, 0.454);
}
.content-label {
  height: 70vh;
  width: 25vw;
  /* background-color: blue; */
  float: left;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.5rem;
}
p {
  padding: 1rem;
}
.content-values {
  /* background-color: green; */
  height: 70vh;
  width: 25vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 1.3rem;
}
button {
  padding: 0.8em 1.8em;
  border: none;
  position: relative;
  overflow: hidden;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  transition: 0.3s;
  z-index: 1;
  font-family: inherit;
  margin-top: 2rem;
  font-weight: bold;
  background-color: transparent;
  cursor: pointer;
  color: #9d2601;
}
button::before {
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

button:hover::before {
  width: 105%;
}
button:hover {
  color: #e3e3e3;
}
</style>
