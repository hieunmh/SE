<template>
  <div>
    <button class="btnn" @click="getPayment">Click</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Payment",
  data() {
    return {

    }
  },

  methods: {
    async getPayment() {
      let res = await axios.post('payment', {},{withCredentials: true});
      console.log(res);
    }
  },

  computed: {

  }

}
</script>

<style lang="scss">

</style>