<template>
  <div class="payment">
    <div class="box">
      <div class="box-content">
        <div class="row bar">
          <div class="col-sm-6 col-7 text-center">
            <h4>Sản phẩm</h4>
          </div>

          <div class="col-2 d-sm-inline d-none text-center">
            <h4>Đơn giá</h4>
          </div>

          <div class="col-2 text-center">
            <h4>Số lượng</h4>
          </div>

          <div class="col-sm-2 col-3 text-center">
            <h4>Thành tiền</h4>
          </div>
        </div>
        
        <div class="row" v-for="(p, index) in cartItem" :key="index">
          <div class="centre col-sm-2 col-4 image-box" style="">
            <img :src="`${imgUrl}${p.image}`" alt="">
          </div>

          <div class="centre col-sm-4 col-3 desc">
            <h4 class="item-name">{{ p.name }}</h4>
          </div>


          <div class="centre col-sm-2 d-sm-flex d-none cal-total">
            <h4 class="item-total"> {{ p.quantity * p.salePrice }}</h4>
          </div>

          <div class="centre col-sm-2 col-2  item-qtt">
            <h4><span class="d-sm-none d-inline">x</span>{{ p.quantity }}</h4>
          </div>

          <div class="centre col-sm-2 col-3">
            <h4>{{ p.quantity * p.salePrice }}</h4>
          </div>
        </div>

        <div class="row col-12">

          <div class="col-sm-10 col-9 d-flex justify-content-end">
            <h4>Tổng số tiền ({{ cartItem.length }} sản phẩm): </h4>
          </div>

          <div class="col-sm-2 col-3 centre">
            <h4>{{ calTotal()[0] }}</h4>
          </div>
        </div>

        <div class="row">
          <div class="col-1"></div>
          <input class="inp col-10" v-model="address" type="text" placeholder="Nhập địa chỉ nhận hàng">
        </div>

        <div>
          <div class="col-12 d-flex justify-content-end">
            <RouterLink to="/menu" @click="order()" style=" text-align: center; color: #fff;">
              <button class="btnn checkout-btn" :disabled="cartItem.length ? false : true">
                <i class="fa fa-shopping-cart"></i> Đặt hàng
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapMutations, mapState } from 'vuex';
import serverUrl from '@/axios';

export default {
  name: 'Payment',
  components: {
    
  },
  data() {
    return {
      imgUrl: serverUrl + "/upload/productImage/",
      address: null,
    }
  },
  methods: {
    async order() {
      let data = {
        adress: this.address
      } 
      await axios.post('create-order', data, {withCredentials: true});
    },

    calTotal() {
      let i = 0;
      let totalsalePrice = 0;
      let totalPrice = 0;
      while (i < this.cartItem.length) {
        totalsalePrice += parseInt(this.cartItem[i].salePrice) * this.cartItem[i].quantity;
        totalPrice += parseInt(this.cartItem[i].price) * this.cartItem[i].quantity;
        i++;
      }
      return [totalsalePrice, totalPrice];
    }

  },
  computed: {
    ...mapState(['user', 'allFoods', 'cartItem']),
  },  

}
</script>

<style lang="scss" scoped>

.payment {
  padding: 2rem 20%;
  background-color: #fff;
}

.box {
  margin: 0;
  margin-bottom: 20px;
  padding: 0;

  .box-title {
    background-color: inherit;
    border-color: #e7eaec;
    border-width: 3px 0 0;
    color: inherit;
    margin-bottom: 0;
    margin-bottom: 0;
    padding: 14px 15px 7px;
    min-height: 78px;

    h3 {
      font-size: 2rem;
    }
  }

  .box-content {
    padding: 0;
    border-image: none;

    .image {
      width: 100%;

      img {
        width: 20rem;
      }
    }

    .row {
      background-color: #f1f1f1;
      padding: 2rem 0;
      margin: 1rem 0;
      input {
        height: 5rem;
        font-size: 2rem;
        // color: #27ae60;
        padding-left: 1rem;
      }
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


@media (max-width: 992px) {
  .payment {
    padding: 2rem 15%;
  }
}

@media (max-width: 767px) {
  .payment {
    padding: 2rem 10%;
  }
}
</style>