<template>

  <div v-if="!showMyOrder">
    <MyOrderDetail :detailId="detailId"></MyOrderDetail>
  </div>



  <div v-else class="myorder">

    <div v-if="showDeleteOrder">
      <DeleteOrder :deleteId="deleteId"></DeleteOrder>
    </div>

    <div class="box">
      <div v-if="userOrder"  class="box-content">

        <div>
          <RouterLink to="/"><button class="btnn fw-bold"><i class="fa fa-arrow-left" style="margin-right: 0.5rem;"></i>Home</button></RouterLink>
        </div>

        <div class="row bar">
          <div class="col-1 text-center">
            <h4 class="fw-bold">ID</h4>
          </div>

          <div class="col-4 text-center">
            <h4 class="fw-bold">Thời gian đặt đơn</h4>
          </div>

          <div class="col-4 text-center">
            <h4 class="fw-bold">trạng thái</h4>
          </div>

          <div class="col-3 text-center">
            <h4 class="fw-bold">chi tiết</h4>
          </div>
        </div>
      
        <div class="row" v-for="(order, index) in userOrder" :key="index">
          <div class="centre col-1">
            <h4>{{ index + 1 }}</h4>
          </div>
          <div class="centre col-4" style="">
            <h4 class="text-center fw-bold">{{ getTime(order.created_at)[2] + " - " + getTime(order.created_at)[1] + " - " + getTime(order.created_at)[0] }}</h4>
            <h4 class="text-center fw-bold">{{ getTime(order.created_at)[3] + " : " + getTime(order.created_at)[4] + " :  " + getTime(order.created_at)[5] }}</h4>
          </div>

          <div class="centre col-4">
            <h4 class="text-center fw-bold">{{ order.status }}</h4>
          </div>

          <div class="centre col-3 detail">
            <button class="btn btn-info fw-bold" @click="showDetail(index)">xem</button>
            <button class="btn btn-danger fw-bold mt-2" @click="showCancelOrder(index)">hủy</button>
          </div>
        </div>
      </div>

      <div v-else class="box-content">
        <div class="image">
          <RouterLink to="/menu"><button class="btnn fw-bold"><i class="fa fa-arrow-left" style="margin-right: 0.5rem;"></i>Menu</button></RouterLink>
          <div>
            <img src="@/assets/images/no-orders.png" alt="">
          </div>
          <div>
            <p class="" style="font-size: 2rem; font-weight: 500;">Bạn không có sản phẩm nào trong đơn hàng !</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapMutations, mapState } from 'vuex';
import MyOrderDetail from './MyOrderDetail.vue';
import DeleteOrder from './DeleteOrder.vue';

export default {
  components: {
    MyOrderDetail,
    DeleteOrder
  },
  data() {
    return {
      detailId: null,
      deleteId: null,
    }
  },

  methods: {
    ...mapMutations(['scrollToTop', 'setShowMyOrder', 'setShowDeleteOrder', 'setUserOrder']),
    ...mapActions(['getUserOrder']),

    showDetail(index) {
      this.detailId = this.userOrder[index];
      this.setShowMyOrder(false);
      this.scrollToTop();
    },

    showCancelOrder(index) {
      this.deleteId = this.userOrder[index];
      this.setShowDeleteOrder(true);
      this.scrollToTop();
    },
    

    getTime(time) {
      let year = new Date(time).getFullYear();
      let month = new Date(time).getMonth() + 1;
      let date = new Date(time).getDate();

      let hour = new Date(time).getHours();
      let minute = new Date(time).getMinutes();
      let second = new Date(time).getSeconds();

      if (month < 10) {
        month = "0" + month;
      }

      if (date < 10) {
        date = "0" + date;
      }

      if (parseInt(hour) < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }

      if (second < 10) {
        second = "0" + second;
      }

      return [year, month, date, hour, minute, second];
    }
  },

  computed: {
    ...mapState(['user', 'userOrder', 'showMyOrder', 'showDeleteOrder', 'userOrderLength'])
  },

  
  created() {
    this.getUserOrder();
    // console.log(this.userOrderLength);
  },
  
}
</script>

<style lang="scss" scoped>
.myorder {
  padding: 2rem 20%;

  .box {
    margin: 0;
    width: 100%;
    margin-bottom: 20px;
    padding: 0;

    .box-content {
      padding: 0;
      border-image: none;

      .detail {
        button {
          width: 7rem;
          padding: .7rem 1.8rem;
          font-size: 1.7rem;
          cursor: pointer;
          color: #fff;
        }
      }
      .image {
        display: flex;
        flex-direction: column;
        div {
          margin: auto auto;
        }
      }

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
  .myorder {
    padding: 2rem 15%;
  }
}

@media (max-width: 767px) {
  .myorder {
    padding: 2rem 10%;
  }
}

@media (max-width: 576px) {
  .myorder {
    padding: 2rem 5%;
  }
}
</style>