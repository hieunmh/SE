<template>
  <div class="allOrder">
    <div class="box">
      <div class="box-content">
        <div class="manage">
          <RouterLink to="/admin"><button class="col-6 fw-bold" >Quản Lý Sản Phẩm</button></RouterLink>
          <RouterLink to="/admin/allorder"><button class="col-6 fw-bold" :disabled="true">Quản Lý Đơn Hàng</button></RouterLink>
        </div>

        <div class="row bar">
          <div class="col-1 text-center">
            <h4 class="fw-bold">ID</h4>
          </div>
          <div class="col-4 text-center">
            <h4 class="fw-bold">tên khánh hàng</h4>
          </div>

          <div class="col-4 text-center">
            <h4 class="fw-bold">Thời gian đặt đơn</h4>
          </div>

          <div class="col-3 text-center">
            <h4 class="fw-bold">chi tiết</h4>
          </div>
        </div>
        
        <div class="row" v-for="(order, index) in allOrder" :key="index">
          <div class="centre col-1 fw-bold">
            <h4>{{  index + 1 }}</h4>
          </div>
          <div class="centre col-4" style="">
            <h4 class="text-center fw-bold">{{ order.user.name }}</h4>
          </div>

          <div class="centre col-4">
            <h4 class="text-center fw-bold">{{ getTime(order.created_at)[2] + " - " + getTime(order.created_at)[1] + " - " + getTime(order.created_at)[0] }}</h4>
            <h4 class="text-center fw-bold">{{ getTime(order.created_at)[3] + " : " + getTime(order.created_at)[4] + " :  " + getTime(order.created_at)[5] }}</h4>
          </div>

          <div class="centre col-3">
            <RouterLink :to="`/admin/allorder/order=${index + 1}`" @click="scrollToTop()"><button class="btnn fw-bold">xem</button></RouterLink>
            <!-- <button class="btnn" @click="showOrder(index)">xem</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: "AllOrder",
  components: {
    
  },
  data() {
    return {  
      orderDetailId: null,
    }
  },

  methods: {
    ...mapMutations(['setShowOrderDetail', 'scrollToTop']),
    ...mapActions(['getAllOrder']),
    
    showOrder(index) {
      this.orderDetailId = this.allOrder[index];
      this.setShowOrderDetail(false);
    },


    getTime(time) {
      let year = new Date(time).getFullYear();
      let month = new Date(time).getMonth() + 1;
      let date = new Date(time).getDate();

      let hour = new Date(time).getHours();
      let minute = new Date(time).getMinutes();
      let second = new Date(time).getSeconds();

      if (month <= 10) {
        month = "0" + month;
      }

      if (date <= 10) {
        date = "0" + date;
      }

      if (parseInt(hour) <= 10) {
        hour = "0" + hour;
      }
      if (minute <= 10) {
        minute = "0" + minute;
      }

      if (second <= 10) {
        second = "0" + second;
      }
      
      return [year, month, date, hour, minute, second];
    }

  },

  computed: {
    ...mapState(['showOrderDetail', 'allOrder']),

  },

  created() {
    this.getAllOrder();
  },
}
</script>

<style lang="scss" scoped>
.allOrder {
  padding: 2rem 20%;

  .box {
    margin: 0;
    width: 100%;
    margin-bottom: 20px;
    padding: 0;

    .manage {
      a {
        &:nth-child(1) {
          button {
            border-radius: 0.7rem 0 0 0.7rem;
          }
        }
        &:nth-child(2) {
          button {
            border-radius: 0 0.7rem 0.7rem 0;
          }
        }
      }
      button {
        background: #f1f1f1;
        color: #ffa31a;
        font-size: 1.7rem;
        padding: 0.7rem 0;
      }
      button:disabled {
        background-color: #ffa31a;
        color: #fff;
      }
    }

    .box-content {
      padding: 0;
      border-image: none;

      .row {
        background-color: #f1f1f1;
        padding: 2rem 0;
        margin: 1rem 0;
        border-radius: 0.7rem;
      }

      .centre {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .image-box {
        padding: 0;
        display: flex;

        img {
          width: 8rem;
          height: 8rem;
          border-radius: 1rem;
        }
      }

      .item-qtt {
        display: flex;
        flex-direction: row;

        button {
          width: 3rem;
          height: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;

          i {
            padding: 0;
          }
        }

        input {
          text-align: center;
          height: 3rem;
          width: 4rem;
          font-size: 1.5rem;
          text-decoration: none;
        }
      }

      .cal-total {
        h4 {
          color: #ee4d2d;
        }
      }

      .item-price {
        .sale-price {
          width: 10rem;
          font-size: 1.5rem;
        }

        .sale {
          text-decoration: line-through;
          color: rgba($color: #000000, $alpha: 0.5);
        }
      }
    }
  }
}


@media (max-width: 992px) {
  .allOrder {
    padding: 2rem 15%;
  }
}

@media (max-width: 767px) {
  .allOrder {
    padding: 2rem 10%;
  }
}

@media (max-width: 576px) {
  .allOrder {
    padding: 2rem 5%;
  }
}

</style>