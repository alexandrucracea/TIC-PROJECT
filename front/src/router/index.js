import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ArticleInfo from "../views/Articles/ArticleInfo.vue";
import ArticleEdit from "../views/Articles/ArticleEdit.vue";
import AddArticleView from "../views/Articles/AddArticleView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/articles/:id",
    name: "article-info",
    component: ArticleInfo,
    props: true,
  },
  {
    path: "/articles/:id/edit",
    name: "article-edit",
    component: ArticleEdit,
    props: true,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"), //pt optimizare daca dorim sa o folosim
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/add-article",
    name: "add-article",
    component: AddArticleView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
