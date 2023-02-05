import axios from "axios";
import { createStore } from "vuex";

let timer;

export default createStore({
  state: {
    email: null,
    token: null,
    userId: null,
    articles: [],
    auctions: [],
    auctionArticles: [],
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
      return state.token !== null || localStorage.getItem("token") !== null;
    },
    getArticles(state) {
      return state.articles;
    },
    getAuctions(state) {
      return state.auctions;
    },
    isAdmin(state) {
      return (
        state.email === "alexandru.cracea29@email.com" ||
        localStorage.getItem("email") === "alexandru.cracea29@email.com"
      );
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
    setAuctions(state, payload) {
      state.auctions = payload;
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
    async loadAllAuctions({ commit }) {
      const auctions = await axios.get(
        `${process.env.VUE_APP_API_URL}/auctions`
      );
      commit("setAuctions", auctions.data);
    },
    async deleteArticle({ commit }, id) {
      await axios.delete(
        `${process.env.VUE_APP_API_URL}/admin/articles/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const articles = await axios.get(
        `${process.env.VUE_APP_API_URL}/articles`
      );
      commit("setArticles", articles.data);
    },
    async deleteAuction({ commit }, id) {
      await axios.delete(
        `${process.env.VUE_APP_API_URL}/admin/auctions/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const auctions = await axios.get(
        `${process.env.VUE_APP_API_URL}/auctions`
      );
      commit("setAuctions", auctions.data);
    },
    async updateArticleAvailability({ commit }, articlesUpdated) {
      for (let i = 0; i < articlesUpdated.length; i++) {
        articlesUpdated[i].available = false;
        await axios.put(
          `${process.env.VUE_APP_API_URL}/admin/articles/${articlesUpdated[i].id}`,
          articlesUpdated[i],
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      const articles = await axios.get(
        `${process.env.VUE_APP_API_URL}/articles`
      );
      commit("setArticles", articles.data);
    },
  },
  modules: {},
});
