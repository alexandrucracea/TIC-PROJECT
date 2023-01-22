import axios from "axios";
import { createStore } from "vuex";

let timer;

export default createStore({
  state: {
    email: null,
    token: null,
    userId: null,
    articles: [],
  },
  getters: {
    email(state) {
      return state.email;
    },
    token(state) {
      return state.token;
    },
    userId(state) {
      return state.userId;
    },
    isAuthenticated(state) {
      return state.token !== null;
    },
    getArticles(state) {
      return state.articles;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.email = payload.email;
      state.token = payload.token;
      state.userId = payload.userId;
    },
    setArticles(state, payload) {
      state.articles = payload;
    },
  },
  actions: {
    login: ({ commit, dispatch }, responseData) => {
      const expiresIn = +responseData.expiresIn * 1000;

      localStorage.setItem("email", responseData.email);
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);

      timer = setTimeout(function () {
        dispatch("logout");
      }, expiresIn);

      commit("setUser", {
        email: responseData.email,
        token: responseData.idToken,
        userId: responseData.localId,
      });
    },
    logout({ commit }) {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      clearTimeout(timer);

      commit("setUser", {
        email: null,
        token: null,
        userId: null,
      });
    },
    async loadArticles({ commit }) {
      const articles = await axios.get(
        `${process.env.VUE_APP_API_URL}/articles`
      );
      commit("setArticles", articles.data);
    },
    async loadArticle(_, id) {
      const articles = await axios.get(
        `${process.env.VUE_APP_API_URL}/articles/${id}`
      );
      return articles?.data || {};
    },
  },
  modules: {},
});
