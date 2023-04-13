<template>
  <div>
    <h1>{{ productName }}</h1>
    <h1>{{ productPrice }} VND</h1>
    <img :src="productImage" alt="">
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductDetail',
  data() {
    return {
      productId: this.$route.params.id,
      productName: null,
      productPrice: null,
      productImage: null
    }
  },

  methods: {
    async getProductById() {
      let res = await axios.get(`products/${this.productId}`, {withCredentials: true});
      this.productName = res.data.name;
      this.productPrice = res.data.price;
      this.productImage = res.data.image;
    }
  },

  created() {
    this.getProductById();
  }
}
</script>

<style lang="scss">

</style>