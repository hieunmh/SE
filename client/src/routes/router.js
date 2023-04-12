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
import Info from '../pages/Info.vue';
import Admin from '../pages/Admin.vue';
import axios from "axios";


const routes = [
  { path: "/", name: "Home", component: Home, },
  { path: "/login", name: "Login", component: Login, },
  { path: "/menu", name: "Menu", component: Menu, },
  { path: "/about", name: "About", component: About, },
  { path: "/promotion", name: "Promotion", component: Promotion, },
  { path: "/table", name: "Table", component: Table, },
  { path: "/register", name: "Register", component: Register, },
  { path: "/cart", name: "Cart", component: Cart, },
  { path: "/myorder", name: "Myorder", component: Myorder, },
  { path: "/info", name: "Info", component: Info, },
  { path: "/admin", name: "Admin", component: Admin, },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (from, to, next) => {
  let res = await axios.get('login', {withCredentials: true});
  if (res.data.cookie) {
    if (from.path === "/login") {
      router.push('/');
    }
    let info = await axios.get('info', {withCredentials: true});
    if (!info.data.role && from.path === "/admin") {
      alert("ĐM mày đéo phải admin");
      router.push('/');
    }
  }
  else {
    if (from.path === "/admin") {
      router.push('/');
    }
  }
  next();
})

export default router;