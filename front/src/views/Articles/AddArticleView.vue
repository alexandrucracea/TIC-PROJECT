<template>
  <the-header></the-header>
  <img src="../../../pictures/add-article-background.jpg" class="background" />
  <div class="page-content">
    <div class="edit-form">
      <div>
        <form @submit.prevent="submitForm">
          <div class="input-alingmnet">
            <div class="label">Article Name</div>
            <input type="text" id="name" v-model.trim="name" />
            <p v-if="errors.name" class="error">{{ errors.name }}</p>
          </div>
          <div class="input-alingmnet">
            <div class="label">Description</div>
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
</template>
<script>
import axios from "axios";
export default {
  name: "AddArticleView",
  data() {
    return {
      name: "",
      description: "",
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
      this.$router.push(`/articles`);
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

<style scoped>
.background {
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
.edit-form {
  background-color: rgba(255, 255, 255, 0.579);
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  height: 95vh;
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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* background-color: blue; */
  width: 60vw;
  padding: 1%;
  z-index: -1;
}
.label {
  font-size: 1.2rem;
  text-align: center;
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
