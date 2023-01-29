import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ArticleInfo from "../views/Articles/ArticleInfo.vue";
import ArticleEdit from "../views/Articles/ArticleEdit.vue";
import AddArticleView from "../views/Articles/AddArticleView.vue";
import AllAuctionsView from "../views/Auctions/AllAuctionsView";
import AllArticlesView from "../views/Articles/AllArticlesView";
import AuctionInfo from "../views/Auctions/AuctionInfo";
import AuctionEditView from "../views/Auctions/AuctionEditView";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  // ARTICLES
  {
    path: "/articles",
    name: "load-all-articles",
    component: AllArticlesView,
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
  {
    path: "/auctions",
    name: "load-all-auctions",
    component: AllAuctionsView,
  },
  // AUCTIONS
  {
    path: "/auctions/:id",
    name: "auction-info",
    component: AuctionInfo,
    props: true,
  },
  {
    path: "/auctions/:id/edit",
    name: "auction-edit",
    component: AuctionEditView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
