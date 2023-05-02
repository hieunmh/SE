<template>
  <div class="order-detail">
    <div class="box">
      <div class="box-content">
        <div>
          <button @click="$router.go(-1)" class="btnn"><i class="fa fa-arrow-left"></i></button>
        </div>

        <div class="row client-info">
          <div class="col-6 text-center"><h3 class="fw-bold">ID: </h3></div>

          <div class="col-6 text-center"><h3 class="fw-bold">{{ this.$route.params.id  }}</h3></div>

          <div class="col-6 text-center"><h3 class="fw-bold">tên khánh hàng:</h3></div>

          <div class="col-6 text-center"><h3 class="fw-bold">{{ orderDetail.user.name }}</h3></div>

          <div class="col-6 text-center"><h3 class="fw-bold">số điện thoại:</h3></div>

          <div class="col-6 text-center">
            <h3 class="fw-bold">
              {{ orderDetail.user.telephone.substring(0, 4) + " - " 
               + orderDetail.user.telephone.substring(4, 7) + " - " 
               + orderDetail.user.telephone.substring(7, 10) }}
            </h3>
          </div>

          <div class="col-12 row text-center">
            <h3 class="col-6 d-flex flex-column justify-content-center fw-bold">Thời gian đặt đơn:</h3>
            <div class="col-6 text-center">
              <h3 class="fw-bold">{{ getTime(orderDetail.created_at)[2] + " - " + getTime(orderDetail.created_at)[1] + " - " + getTime(orderDetail.created_at)[0] }}</h3>
              <h3 class="fw-bold">{{ getTime(orderDetail.created_at)[3] + " : " + getTime(orderDetail.created_at)[4] + " : " + getTime(orderDetail.created_at)[5] }}</h3>
            </div>
          </div>


          <div class="col-6 text-center"><h3 class="fw-bold">Địa chỉ:</h3></div>

          <div class="col-6 text-center"><h3 class="fw-bold">{{ orderDetail.address }}</h3></div>  

          <div class="col-6 text-center d-flex flex-column justify-content-center"><h3 class="fw-bold">trạng thái:</h3></div>

          <div class="col-6 d-flex justify-content-center text-center fw-bold">
            <select name="format" @input="updateStatus($event)">
              <option value="" selected>{{ orderDetail.status }}</option> 
              <option value="Đang xử lý" v-if="orderDetail.status != 'Đang xử lý'">Đang xử lý</option>
              <option value="Đang giao hàng" v-if="orderDetail.status != 'Đang giao hàng'">Đang giao hàng</option>
              <option value="Đã giao hàng" v-if="orderDetail.status != 'Đã giao hàng'">Đã giao hàng</option>
            </select> 
          </div>
        </div>

        <div class="row bar">
          <div class="col-sm-6 col-8 text-center">
            <h4 class="fw-bold">Sản phẩm</h4>
          </div>

          <div class="col-sm-2 d-sm-inline d-none">
            <h4 class="text-center fw-bold">Đơn giá</h4>
          </div>

          <div class="col-sm-2 col-2">
            <h4 class="text-center fw-bold">Số lượng</h4>
          </div>

          <div class="col-sm-2 col-2 text-center">
            <h4 class="fw-bold">Thành tiền</h4>
          </div>
        </div>
      
        <div class="row" v-for="(o, index) in orderDetail.order_items" :key="index">
          <div class="centre col-sm-2 col-4 image-box" style="">
            <img :src="`${imgUrl}${o.product.image}`" alt="">
          </div>

          <div class="centre col-sm-4 col-4">
            <h4 class="item-total fw-bold d-sm-none d-inline text-dark text-decoration-line-through" v-if="parseInt(o.product.price) != parseInt(o.product.salePrice)"> {{ o.product.price }}</h4>
            <h4 class="item-total fw-bold d-sm-none d-inline">{{ parseInt(o.product.salePrice) }}</h4>
            <h4 class="item-name fw-bold">{{ o.product.name }}</h4>
          </div>


          <div class="centre col-sm-2 d-sm-flex d-none cal-total">
            <h4 class="item-total text-dark text-decoration-line-through fw-bold" v-if="parseInt(o.product.price) != parseInt(o.product.salePrice)"> {{ o.product.price }}</h4>
            <h4 class="fw-bold">{{ parseInt(o.product.salePrice) }}</h4>
          </div>

          <div class="centre col-sm-2 col-2  item-qtt">
            <h4 class="fw-bold">{{ o.quantity }}</h4>
          </div>

          <div class="centre col-2 delete">
            <h4 class="fw-bold">{{ o.quantity * o.product.salePrice }}</h4>
          </div>
        </div>

        <div class="row col-12">
          <div class="col-10 d-flex justify-content-end">
            <h4 class="fw-bold">Tổng số tiền ( {{ this.orderDetail.order_items.length }} sản phẩm ): </h4>
          </div>

          <div class="col-2 centre">
            <h4 class="fw-bold">{{ parseInt(orderDetail.total) }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import serverUrl from '@/axios';
import axios from 'axios';

export default {
  name: "OrderDetail",
  data() {
    return {
      imgUrl: serverUrl,
      index: null,
      orderDetail: null,
    }
  },

  methods: {
    ...mapMutations(['setShowOrderDetail']),

    async updateStatus(event) {
      let data = {
        statusOrder: event.target.value,
        order_id: this.orderDetail.id,
      }

      await axios.post('/admin/update-status', data, {withCredentials: true})

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
    },
  },

  computed: {
    ...mapState(['allOrder']),
  },

  created() {
    this.orderDetail = this.allOrder[this.$route.params.id - 1];
  }

}
</script>

<style lang="scss" scoped>
.order-detail {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 2rem 20%;
  height: auto;
  // overflow-y: scroll !important;

  select {
    outline: none;
    appearance: none;
    height: 3.5rem;
    width: 15rem;
    font-size: 1.7rem;
    font-weight: 500;
    border-radius: 0.7rem;
    text-align: center;
    option {
      height: 3.5rem;
    }
  }

  .box {

    scroll-behavior: auto;
    margin: 0;
    width: 100%;
    margin-bottom: 20px;
    padding: 0;
    // overflow-y: scroll;


  .box-content {
    padding: 0;
    border-image: none;
    .row {
      background-color: #f1f1f1;
      padding: 2rem 0;
      margin: 1rem 0;
      border-radius: 0.7rem;
    }

    .client-info {
      > div {
        // border: 2px solid rgba(0, 0, 0, 0.2);
        padding: 1rem 0;
      }
    }


    .centre {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .item-total {
        color: #ee4d2d;
      }
    }

    .image-box {
      padding: 0;
      display: flex;
      img {
        width: 8rem;
        height: 8rem;
        border-radius: 0.7rem;
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
  .order-detail {
    padding: 2rem 15%;
  }
}

@media (max-width: 767px) {
  .order-detail {
    padding: 2rem 10%;
  }
}

@media (max-width: 576px) {
  .order-detail {
    padding: 2rem 5%;
  }
}

</style>