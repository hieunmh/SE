<template>
  <div>
    <div>
      <h1>Admin page</h1>
      <button @click="getOrder()" class="btnn">Get order</button>
      <button @click="getOrderDetail()" class="btnn">getOrderDetail</button>
    </div>    
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['admin']),
  },

  methods: {
    async getOrder() {
      let res = await axios.get('get-all-orders', {withCredentials: true});
      console.log(res.data);
    },

    async getOrderDetail() {
      let res = axios.get('order-by-user', {withCredentials: true});
      console.log(res.data);
    }
  }
}
</script>

<style lang="scss">

</style>