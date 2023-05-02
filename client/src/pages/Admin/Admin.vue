<template>
  <div>
    <div v-if="show">
      <Productmanage></Productmanage>
    </div>
  </div>


</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import AllOrder from './OrderManage/AllOrder.vue';
import Productmanage from './ProductManage/Productmanage.vue';

export default {
  name: "Admin",
  components: {
    AllOrder,
    Productmanage
  },
  data() {
    return {
      show: true,
    }
  },

  methods: {
    ...mapMutations(['scrollToTop']),
    ...mapActions(['getAllOrder', 'getProducts']),

    setShow(show) {
      this.show = show;
    }

  },

  computed: {
    ...mapState(['admin', 'allFoods']),

  },

  created() {
    // this.getAllOrder();
    // this.getProducts();
  }
  
}
</script>