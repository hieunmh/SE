import { createWebHistory, createRouter } from "vue-router";

//import page and component here
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Menu from '../pages/Menu.vue';
import ContactUs from '../pages/ContactUs.vue';
import Register from '../pages/Register.vue';
import Myorder from '../pages/Order/Myorder.vue';
import Cart from '../pages/Cart/Cart.vue';
import Info from '../pages/Info.vue';
import Admin from '../pages/Admin/Admin.vue';
import Payment from '../pages/Payment/Payment.vue';
import AllOrder from '../pages/Admin/OrderManage/AllOrder.vue';
import OrderDetail from '../pages/Admin/OrderManage/OrderDetail.vue';
import Usermanage from '../pages/Admin/Usermanage/Usermanage.vue';


const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/menu", name: "Menu", component: Menu },
  { path: "/contactus", name: "ContactUS", component: ContactUs },
  { path: "/register", name: "Register", component: Register },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/myorder", name: "Myorder", component: Myorder },
  { path: "/info", name: "Info", component: Info },
  { path: "/admin", name: "Admin", component: Admin },
  { path: "/admin/allorder", name: "AllOrder", component: AllOrder },
  { path: "/admin/allorder/order=:id", name: "OrderDetail", component: OrderDetail },
  { path: "/payment", name: "Payment", component: Payment },
  { path: "/payment", name: "Payment", component: Payment },
  { path: "/admin/usermanage", name: "UserManage", component: Usermanage },
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