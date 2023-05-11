<template>
  <div class="shopping-cart">
    <RouterLink to="/menu" style=" text-align: center; color: #fff;">
      <button class="fw-bold" @click="setShowProduct(false)">
        <i class="fa fa-arrow-left"></i> Menu
      </button>
    </RouterLink>

    <div class="heading">
      <span class="fw-bold" style="color: #ffa31a;">Giỏ hàng của bạn</span>
      <h3>Free ship trong vòng bán kính 5km</h3>
    </div>

    <div class="in-cart">
      <div class="box">
        <div class="box-content row" v-if="cartItem.length == 0">
          <div class="content text-center">
            <h2 style="color: #ffa31a;">Bạn không có sản phẩm nào trong giỏ hàng, đến menu để mua hàng!</h2>
          </div>

          <div class="image d-flex justify-content-center">
            <img src="@/assets/images/notfound.png" alt="">
          </div>
        </div>

        <div v-else class="box-content">
          <div class="row bar">
            <div class="col-md-4 col-9 text-center">
              <h4 class="fw-bold">Sản phẩm</h4>
            </div>
            

            <div class="col-md-2 col-3 text-center">
              <h4 class="fw-bold">Đơn giá</h4>
            </div>

            <div class="col-md-2 d-md-inline d-none text-center">
              <h4 class="fw-bold">Số lượng</h4>
            </div>

            <div class="col-md-2 d-md-inline d-none text-center">
              <h4 class="fw-bold">Số tiền</h4>
            </div>

            <div class="col-md-2 d-md-inline d-none text-center">
              <h4 class="fw-bold">Thao tác</h4>
            </div>
          </div>
          <div v-for="(p, index) in cartItem" :key="index">
            <div class="row">
              <div class="centre col-md-2 col-sm-4 col-4 image-box" style="">
                <img :src="`${imgUrl}${p.image}`" alt="">
              </div>
              
              <div class="centre col-md-2 col-sm-5 col-5 desc">
                <h4 class="item-name fw-bold">{{ p.name }}</h4>
              </div>  
              
              <div class="centre text-center col-md-2 col-sm-3 col-3 item-price">
                <h4 class="sale-price fw-bold">{{ parseInt(p.salePrice).toLocaleString("it-IT", { style: "currency", currency: "VND" }).slice(0, -3) }}&#8363;</h4>
                <h4 class="sale-price fw-bold sale" v-if="p.price != p.salePrice">{{ p.price.toLocaleString("it-IT", { style: "currency", currency: "VND" }).slice(0, -3) }}&#8363;</h4>
              </div>

              <div class="centre col-md-2 col-sm-7 col-7 mt-md-0 mt-4 item-qtt">
                <button class="btn btn-danger" @click="decrease(index)" :disabled="p.quantity < 1"><i class="fa-solid fa-minus"></i></button>
                <input type="text" id="iQuantity" class="form-control fw-bold item-quantity " 
                  :value="p.quantity" min="1" max="100"
                  oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                  @change="changeQty($event, index)"
                  >
                <button class="btn btn-info" @click="increase(index)"><i class="fa-solid fa-plus"></i></button>
              </div>

              <div class="centre col-md-2 d-md-flex d-none cal-total">
                <h4 class="item-total fw-bold"> {{ (p.quantity * p.salePrice).toLocaleString("it-IT", { style: "currency", currency: "VND" }).slice(0, -3) }}&#8363;</h4>
              </div>

              <div class="centre col-md-2 col-sm-5 col-5 mt-md-0 mt-4 delete">
                <button class="btn btn-danger btn-xl" @click="deleteProduct(index)">
                  <p class="fw-bold">Xóa</p> 
                </button>
              </div>
            </div>
          </div>
          

          <div class="row col-12">
            <div class="col-md-8 col-sm-9 col-9 d-flex justify-content-end">
              <h4 class="fw-bold">Tổng thanh toán ( {{ cartItem.length }} sản phẩm ) :</h4>
            </div>

            <div class="col-md-2 col-sm-3 col-3 centre">
              <h4 class="fw-bold">{{ calTotal()[0].toLocaleString("it-IT", { style: "currency", currency: "VND" }).slice(0, -3) }}&#8363;</h4>
            </div>
          </div> 

          <div class="">
            <div class="col-12 d-flex justify-content-end">
                <RouterLink to="/payment" style=" text-align: center; color: #fff;">
                  <button class="checkout-btn fw-bold" :disabled="cartItem.length ? false : true">
                    <i class="fa fa-shopping-cart"></i> Mua hàng
                  </button>
                </RouterLink>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <Alert v-if="showAlert" :index="index"></Alert>

  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapMutations, mapState } from 'vuex';
import serverUrl from '@/axios';

import Alert from './AlertCart.vue';

export default {
  name: 'Cart',
  components: {
    Alert
  },
  data() {
    return {
      cart: null,
      total: null,
      ship: 15000,
      totalPrice: 0,
      index: null,
      imgUrl: serverUrl,
    }
  },
  methods: {
    ...mapActions(['getCart']),
    ...mapMutations(['setShowProduct', 'setShowAlert']),

    changeQty(event, index) {
      this.cartItem[index].quantity = event.target.value;
    },

    async decrease(index) {
      let data = {
        product_id: this.cartItem[index].product_id,
        increase_btn: false,
        decrease_btn: true,
      }
      this.cartItem[index].quantity--;
      if (this.cartItem[index].quantity < 1) {
        this.cartItem[index].quantity = 1;
        this.setShowAlert(true);
        this.index = index;
      }
      else {
        await axios.put('edit-product-cart', data, { withCredentials: true });
      }

    },

    async increase(index) {
      let data = {
        product_id: this.cartItem[index].product_id,
        increase_btn: true,
        decrease_btn: false,
      }
      this.cartItem[index].quantity++;
      await axios.put('edit-product-cart', data, {withCredentials: true});
    },

    async deleteProduct(index) {
      this.setShowAlert(true);
      this.index = index;
    },

    calTotal() {
      let i = 0;
      let totalsalePrice = 0;
      let totalPrice = 0;
      while(i < this.cartItem.length) {
        totalsalePrice += parseInt(this.cartItem[i].salePrice) * this.cartItem[i].quantity;
        totalPrice += parseInt(this.cartItem[i].price) * this.cartItem[i].quantity;
        i++;
      }
      return [totalsalePrice, totalPrice];
    }

  },
  computed: {
    ...mapState(['user', 'allFoods', 'cartItem', 'showAlert']),
  },
  created() {
    // if (user.name) {
    //   this.getCart();
    // }
    if (this.user.userName) {
      this.getCart();
    }
    // this.getCart();
  }

}
</script>

<style lang="scss" scoped>

.shopping-cart {
  padding: 2rem 20%;
  background-color: #fff;
  > a {
    > button {
      background-color: #ffa31a;
      color: #fff;
      padding: 0.5rem 1rem;
      font-size: 1.7rem;
      border-radius: 0.7rem;
      &:hover {
        background-color: #e66c00;
      }
    }
  }
}

.checkout-btn {
  background-color: #ffa31a;
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 1.7rem;
  border-radius: 0.7rem;
  &:hover {
    background-color: #e66c00;
    // filter: brightness(80%);
  }
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
      padding: 1rem 0;
      margin: 1rem 0;
      background-color: #f1f1f1;
      border-radius: 0.7rem;
    }
    .centre {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .delete {
      display: flex;
      // align-items: flex-end;
      button {
        padding: .7rem 1.8rem;
          font-size: 1.7rem;
          cursor: pointer;
          color: #fff;
        p {
          margin: 0;
          &:nth-child(2) {
            margin-left: 1rem;
          }
        }
      }
    }

    .image-box {
      // padding: 0;
      display: flex;
      // align-items: flex-start ;
      img {
        width: 8rem;
        border-radius: 0.5rem;
      }
    }
    .item-qtt {
      display: flex;
      flex-direction: row;
      button {
        color: white;
        width: 3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          padding : 0;
          font-size: 1.5rem;
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

.box-content button i, .box-content a i {
  padding-right: 5px;
}



.item-quantity {
  text-decoration: line-through;
}


@media (max-width: 992px) {
  .shopping-cart {
  padding: 2rem 15%;
  }
}

@media (max-width: 767px) {
  .shopping-cart {
    padding: 2rem 10%;
  }
  .box {
    .box-content {
      .image-box {
        img {
          width: 8rem;
          height: 8rem;
          object-fit: cover;
          // filter: brightness(60%);
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .shopping-cart {
  padding: 2rem 5%;
  }
}



</style>