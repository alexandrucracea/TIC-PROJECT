<template>
  <div class="edit-form">
    <div>
      <h2>Edit Article</h2>
    </div>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <div class="first">
            <div class="edit-content">
              <div class="label">Article Name</div>
              <input type="text" id="name" v-model.trim="name" />
              <p v-if="errors.name" class="error">{{ errors.name }}</p>
            </div>
            <div class="edit-content">
              <div class="label">Description</div>
              <input type="text" id="description" v-model.trim="description" />
              <p v-if="errors.description" class="error">
                {{ errors.description }}
              </p>
            </div>
            <div class="label">Colors</div>
            <!-- TODO la culori de sters din backend vectorul si salvat o culoare principala -->
            <input type="color" id="colors" v-model.trim="colors" />
            <p v-if="errors.colors" class="error">{{ errors.colors }}</p>
            <div class="edit-content">
              <div class="label">Price</div>
              <input type="text" id="price" v-model.trim="price" />
              <p v-if="errors.price" class="error">{{ errors.price }}</p>
            </div>
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
          <div class="second">
            <div class="edit-content">
              <div class="label">Period</div>
              <input type="text" id="period" v-model.trim="period" />
              <p v-if="errors.period" class="error">{{ errors.period }}</p>
            </div>
            <div class="edit-content">
              <div class="label">Period</div>
              <input type="text" id="period" v-model.trim="period" />
              <p v-if="errors.period" class="error">{{ errors.period }}</p>
            </div>
            <div class="edit-content">
              <div class="label">Condition</div>
              <input type="text" id="condition" v-model.trim="condition" />
              <p v-if="errors.condition" class="error">
                {{ errors.condition }}
              </p>
            </div>
            <div class="edit-content">
              <div class="label">Date</div>
              <input type="date" id="date" v-model.trim="date" />
              <p v-if="errors.date" class="error">{{ errors.date }}</p>
            </div>
          </div>
        </div>
        <button type="submit" class="button">Save</button>
      </form>
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
.error {
  color: red;
}
.edit-form {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 40px;
  margin-left: auto;
  margin-right: auto;
  background: #616283;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.edit-form h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
}

.edit-form .edit-content input {
  padding: 10px 0;
  font-size: 12px;
  color: #fff;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.edit-content {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: left;
}

input {
  width: 100%;
}

.label {
  text-align: left;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.edit-form .edit-content input:focus ~ div,
.edit-form .edit-content input:valid ~ div {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.edit-form form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}
.edit-form a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}
.wrapper {
  width: 100%;
  background-color: red;
}
.first {
  width: 45%;
  float: left; /* add this */
  margin-right: 5%;
}
.second {
  overflow: hidden;
  margin-left: 1%;
}
.button {
  width: 10%;
  display: center;
  margin-left: auto;
  margin-right: auto;
}
.checkbox {
  margin-right: auto;
  width: 10%;
}
</style>
