import { createWebHistory, createRouter } from "vue-router";

//import page and component here
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Menu from '../pages/Menu.vue';
import About from '../pages/About.vue';
import Promotion from '../pages/Promotion.vue';
import Table from '../pages/Table.vue';
import Register from '../pages/Register.vue';
import Myorder from '../pages/Myorder.vue';
import Cart from '../pages/Cart.vue';


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/promotion",
    name: "Promotion",
    component: Promotion,
  },
  {
    path: "/table",
    name: "Table",
    component: Table,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/Myorder",
    name: "Myorder",
    component: Myorder,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;