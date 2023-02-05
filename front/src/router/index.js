import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ArticleInfo from "../views/Articles/ArticleInfo.vue";
import ArticleEdit from "../views/Articles/ArticleEdit.vue";
import AddArticleView from "../views/Articles/AddArticleView.vue";
import AllAuctionsView from "../views/Auctions/AllAuctionsView.vue";
import AllArticlesView from "../views/Articles/AllArticlesView.vue";
import AuctionInfo from "../views/Auctions/AuctionInfo.vue";
// import AuctionEditView from "../views/Auctions/AuctionEditView.vue";
import AddAuctionView from "../views/Auctions/AddAuctionDetailsView.vue";
import AddAuctionArticlesView from "../views/Auctions/AddAuctionArticlesView.vue";
import EditAuctionArticlesView from "../views/Auctions/EditAuctionArticlesView.vue";
// import EditAuctionArticlesDetails from "../views/Auctions/EditAuctionArticlesDetails.vue";

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
  // {
  //   path: "/auctions/:id/edit",
  //   name: "auction-edit",
  //   component: AuctionEditView,
  //   props: true,
  // },
  {
    path: "/add-auction",
    name: "add-auction-articles",
    component: AddAuctionArticlesView,
    props: true,
  },
  {
    path: "/add-auction",
    name: "add-auction",
    component: AddAuctionView,
    props: true,
  },
  {
    path: "/edit-auction/:id",
    name: "edit-auction",
    component: EditAuctionArticlesView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
