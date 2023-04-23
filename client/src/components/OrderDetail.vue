<template>
  <div class="order-detail">
    <div class="box">
        <div class="box-content">
          <div class="row bar">
            <div class="col-sm-6 col-8 text-center">
              <h4>Sản phẩm</h4>
            </div>

            <div class="col-sm-2 d-sm-flex d-none">
              <h4 class="text-center">Đơn giá</h4>
            </div>

            <div class="col-sm-2 col-2">
              <h4 class="text-center">Số lượng</h4>
            </div>

            <div class="col-sm-2 col-2 text-center">
              <h4>Thành tiền</h4>
            </div>
          </div>
        
          <div>
            <div v-for="(o,index) in orderId.order_items" :key="index" class="row">
              <div class="centre col-sm-2 col-4 image-box" style="">
                <img :src="`${imgUrl}${o.product.image}`" alt="">
              </div>

              <div class="centre col-sm-4 col-4 desc">
                <h4 class="item-name">{{ o.product.name }}</h4>
              </div>


              <div class="centre col-sm-2 d-sm-flex d-none cal-total">
                <h4 class="item-total"> {{ o.product.price }}</h4>
              </div>

              <div class="centre col-sm-2 col-2  item-qtt">
                <h4>{{ o.quantity  }}</h4>
              </div>

              <div class="centre col-2 delete">
                <h4>{{ o.product.price }}</h4>
              </div>
            </div>
          </div>

          <div class="row col-12">

            <div class="col-9 d-flex justify-content-end">
              <h4>Tổng số tiền ({{ orderId.order_items.length }} sản phẩm): </h4>
            </div>

            <div class="col-1">

            </div>

            <div class="col-2 centre">
              <h4>{{ parseInt(orderId.total) }}</h4>
            </div>
          </div>

          <div>
            <button class="btnn" @click="setShowOrderDetail(false)">dong</button>
            <button class="btnn" @click="show">Show</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import serverUrl from '@/axios';

  export default {
    name: "OrderDetail",
    props: ['orderId'],
    data() {
      return {
        imgUrl: serverUrl + "/upload/productImage/",
      }
    },

    methods: {
      ...mapMutations(['setShowOrderDetail']),

      show() {
        console.log(this.orderId.order_items);
      }
    },

  }
</script>

<style lang="scss" scoped>
.order-detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // z-index: 49;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  padding: 2rem 20%;
  .box {
    margin: 0;
    width: 100%;
    margin-bottom: 20px;
    padding: 0;

  .box-content {
    padding: 0;
    border-image: none;
    .row {
      background-color: #f1f1f1;
      padding: 2rem 0;
      margin: 1rem 0;
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