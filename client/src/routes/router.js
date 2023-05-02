import { createWebHistory, createRouter } from "vue-router";

//import page and component here
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Menu from '../pages/Menu.vue';
import About from '../pages/About.vue';
import Promotion from '../pages/Promotion.vue';
import Table from '../pages/Table.vue';
import Register from '../pages/Register.vue';
import Myorder from '../pages/Order/Myorder.vue';
import Cart from '../pages/Cart/Cart.vue';
import Info from '../pages/Info.vue';
import Admin from '../pages/Admin/Admin.vue';
import Payment from '../pages/Payment/Payment.vue';
import AllOrder from '../pages/Admin/OrderManage/AllOrder.vue';
import OrderDetail from '../pages/Admin/OrderManage/OrderDetail.vue';


const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/menu", name: "Menu", component: Menu },
  { path: "/about", name: "About", component: About },
  { path: "/promotion", name: "Promotion", component: Promotion },
  { path: "/table", name: "Table", component: Table },
  { path: "/register", name: "Register", component: Register },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/myorder", name: "Myorder", component: Myorder },
  { path: "/info", name: "Info", component: Info },
  { path: "/admin", name: "Admin", component: Admin },
  { path: "/admin/allorder", name: "AllOrder", component: AllOrder },
  { path: "/admin/allorder/order=:id", name: "OrderDetail", component: OrderDetail },
  { path: "/payment", name: "Payment", component: Payment },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// router.beforeEach((from, to, next) => {
//   let isLogin = store.getters.getLogged;
//   if (isLogin) {
//     if (from.path === '/login') {
//       router.push('/');
//     }
//   }
//   next();
// })

export default router;