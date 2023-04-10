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
  }
}