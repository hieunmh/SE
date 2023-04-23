<template>
  <div>
    <h1>My Order Page</h1>
    <button @click="getOrderDetail()" class="btnn">getOrderDetail</button>
  </div>
</template>

<script>
import axios from 'axios';

  export default {
    data() {
      return {

      }
    },

    methods: {
      async getOrderDetail() {
        await axios.get('order-by-user', {withCredentials: true})
        .then((res) => console.log(res.data.Orders))
      }
    }
  }
</script>

<style lang="scss">

</style>