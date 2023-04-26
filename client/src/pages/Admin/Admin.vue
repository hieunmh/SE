<template>
  <div>
    <div v-if="show">
      <Productmanage></Productmanage>
    </div>
  </div>


</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import serverUrl from '@/axios';
import AllOrder from './AllOrder.vue';
import Productmanage from './Productmanage.vue';

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