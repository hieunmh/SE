<template>
  <div class="admin">
    <div class="box">
      <div class="box-content">
        <div class="row bar">
          <div class="col-1 text-center">
            <h4>ID</h4>
          </div>
          <div class="col-4 text-center">
            <h4>tên khánh hàng</h4>
          </div>

          <div class="col-4 text-center">
            <h4>số điện thoại</h4>
          </div>


          <div class="col-3 text-center">
            <h4>chi tiết</h4>
          </div>
        </div>
        
        <div v-for="(order, index) in allOrder" :key="index">
          <div class="row">
            <div class="centre col-1">
              <h4>{{ index + 1 }}</h4>
            </div>
            <div class="centre col-4" style="">
              <h4 class="text-center">{{ order.user.name }}</h4>
            </div>

            <div class="centre col-4 desc">
              <h4 class="text-center">{{ order.user.telephone }}</h4>
            </div>

            <div class="centre col-3 delete">
              <button @click="showOrder(index)" class="btnn">xem</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <OrderDetail v-if="showOrderDetail" :orderId="OrderId"></OrderDetail>

</template>

<script>
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';

import OrderDetail from '@/components/OrderDetail.vue';

export default {
  name: "Admin",

  components: {
    OrderDetail
  },

  data() {
    return {
      allOrder: [],
      OrderId: [],
    }
  },

  methods: {
    ...mapMutations(['setShowOrderDetail']),

    async getOrder() {
      await axios.get('get-all-orders', { withCredentials: true })
        .then((res) => {
          this.allOrder = res.data.Orders;
          console.log(res.data.Orders);
        })

    },

    showOrder(index) {
      this.OrderId = this.allOrder[index];
      // console.log(this.allOrder[index]);
      this.setShowOrderDetail(true);
    }
  },

  computed: {
    ...mapState(['admin', 'showOrderDetail']),
  },

  mounted() {
    this.getOrder();
  }
  
}
</script>

<style lang="scss" scoped>

.admin {
  background-color: #fff;
  padding: 2rem 20%;
  .box {
    .box-content {
      .row {
      // border: 1px solid #27ae60;
      padding: 2rem 0;
      margin: 1rem 0;
      background-color: #f1f1f1;
      .centre {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    }
  }
}

@media (max-width: 992px) {
  .admin {
    padding: 2rem 15%;
  }
}

@media (max-width: 767px) {
  .admin {
    padding: 2rem 10%;
  }
}

@media (max-width: 576px) {
  .admin {
    padding: 2rem 5%;
  }
}

</style>