<template>
  <the-header></the-header>
  <img src="../../../pictures/edit-article-background.jpg" class="background" />
  <div class="edit-form">
    <div class="page-content">
      <div class="edit-form">
        <div>
          <form @submit.prevent="submitForm">
            <div class="input-alingmnet">
              <div class="label title">Edit Article {{ name }}</div>
            </div>
            <div class="input-alingmnet">
              <div class="label">Edit Name</div>
              <input type="text" id="name" v-model.trim="name" />
              <p v-if="errors.name" class="error">{{ errors.name }}</p>
            </div>
            <div class="input-alingmnet">
              <div class="label">Edit Description</div>
              <input type="text" id="description" v-model.trim="description" />
              <p v-if="errors.description" class="error">
                {{ errors.description }}
              </p>
            </div>
            <div class="input-alingmnet">
              <div class="label">Colors</div>
              <input type="color" id="colors" v-model.trim="colors" />
              <p v-if="errors.colors" class="error">{{ errors.colors }}</p>
            </div>
            <div class="input-alingmnet">
              <div class="label">Price</div>
              <input type="text" id="price" v-model.trim="price" />
              <p v-if="errors.price" class="error">{{ errors.price }}</p>
            </div>
            <div class="input-alingmnet">
              <div>
                <div class="label">Available</div>
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  value="available"
                  v-model="available"
                  class="checkbox"
                />
              </div>
            </div>
            <div class="input-alingmnet">
              <div class="label">Period</div>
              <input type="text" id="period" v-model.trim="period" />
              <p v-if="errors.period" class="error">{{ errors.period }}</p>
            </div>
            <div class="input-alingmnet">
              <div class="label">Condition</div>
              <input type="text" id="condition" v-model.trim="condition" />
              <p v-if="errors.condition" class="error">
                {{ errors.condition }}
              </p>
            </div>
            <div class="input-alingmnet">
              <div class="label">Date</div>
              <input type="date" id="date" v-model.trim="date" />
              <p v-if="errors.date" class="error">{{ errors.date }}</p>
            </div>
            <div class="input-alingmnet">
              <div class="label">Year</div>
              <input type="text" id="year" v-model.trim="year" />
              <p v-if="errors.year" class="error">{{ errors.year }}</p>
            </div>
            <div>
              <button type="submit">Save</button>
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
  name: "ArticleEdit",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  //TODO aici de rezolvat probleme pentru available si de adaugat campul pe year
  data() {
    return {
      name: "test",
      description: "test",
      colors: [],
      price: "",
      period: "",
      condition: "",
      date: "",
      available: null,
      year: "",
      checked: false,
      errors: {
        name: " ",
        description: " ",
        colors: " ",
        price: " ",
        period: " ",
        condition: " ",
        date: " ",
        available: " ",
      },
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    async getArticle() {
      const article = await axios.get(
        `${process.env.VUE_APP_API_URL}/articles/${this.id}`
      );
      const {
        name,
        description,
        colors,
        price,
        period,
        condition,
        date,
        available,
      } = article.data || {};
      this.name = name;
      this.description = description;
      this.colors = colors;
      this.price = price;
      this.condition = condition;
      this.period = period;
      this.date = date;
      this.available = available;
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
        description: this.description,
        colors: this.colors,
        price: this.price,
        period: this.period,
        condition: this.condition,
        date: this.date,
        available: this.available,
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
        colors: "",
        price: "",
        period: "",
        condition: "",
        date: "",
        available: "",
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
      // if (this.price.trim().length === 0) {
      //   this.errors.price = "Price of the article is required";
      //   valid = false;
      // }
      if (this.condition.trim().length === 0) {
        this.errors.condition = "Condition of the article is required";
        valid = false;
      }
      if (this.date.trim().length === 0) {
        this.errors.date = "Date of the article is required";
        valid = false;
      }
      // if (this.name.trim().length === 0) {
      //   this.errors.name = "Name of the article is required";
      //   valid = false;
      // }
      return valid;
    },
  },
};
</script>
<style scoped>
.background {
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  /* opacity: 0.8; */
}
.title {
  font-weight: bold;
}
.edit-form {
  /* background-color: rgba(255, 255, 255, 0.579); */
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  height: 93vh;
}
.input-alingmnet {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  width: 20vw;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  /* padding-top: 0.1rem; */
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  /* padding: 0.1%; */
}
form {
  background-color: rgba(255, 255, 255, 0.737);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* background-color: blue; */
  width: 60vw;
  padding: 1%;
  z-index: -1;
  /* opacity: 0.9; */
}
.label {
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
}
input {
  width: 100%;
  border: none;
  padding: 0.3rem;
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
  /* margin-top: 0.5rem; */
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
