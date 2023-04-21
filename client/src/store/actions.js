import router from "@/routes/router";
import axios from "axios"

export default {
  async getProducts(context) {
    await axios.get('products', {withCredentials: true})
    .then((res) => {
      context.commit("setFoods", res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  },

  async getCategory(context) {
    await axios.get('all-category', { withCredentials: true })
    .then((res) => {
      context.commit("setCategory", res.data.slice(0, 5));
    })

  },

  async checkLogin(context) {
    let res = await axios.get("login", { withCredentials: true });
    if (res.data.cookie) {
      if (router.currentRoute.value.path == "/login" || router.currentRoute.value.path == "/register") {
        router.push("/");
      }

      let data = await axios.get("info", { withCredentials: true });

      context.commit("setUser", data.data);
      context.commit("setLogged", true);

      if (data.data.role) {
        context.commit("setAdmin", "admin");
      }
      else {
        if (router.currentRoute.value.path == "/admin") {
          router.push('/');
        }
      }
    }
  },

  async getCart(context) {
    await axios.get("cart", { withCredentials: true })
    .then((res) => {
      context.commit("setCartItem", res.data.productsInCart);
      context.commit("setCartLength", res.data.productsInCart.length)
      console.log(res.data);
    })
  },

  setLoading(context) {
    context.commit("setLoading", false);
  } 
}