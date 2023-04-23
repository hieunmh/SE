import router from "@/routes/router";
import axios from "axios"

export default {
  async getProducts(context) {
    await axios.get('products', {withCredentials: true})
    .then((res) => {
      context.commit("setFoods", res.data);
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


  async getCart(context) {
    await axios.get("cart", { withCredentials: true })
    .then((res) => {
      context.commit("setCartItem", res.data.productsInCart);
      context.commit("setCartLength", res.data.productsInCart.length)
    })
  },

  setLoading(context) {
    context.commit("setLoading", false);
  } 
}