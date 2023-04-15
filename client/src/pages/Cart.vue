<template>
  <div class="shopping-cart">

    <div class="heading">
      <span>Giỏ hàng</span>
      <h3>Free ship trong vòng bán kính 5km</h3>
    </div>

    <div class="container">
      <div class="wrapper wrapper-content">
        <div class="row">
          <div class="in-cart col-md-12">
            <div class="box">
              <div class="box-title item-total row">
                <h3>
                  <p style="font-size: 2rem;">{{ cartItem.length }}
                    <span v-if="cartItem.length < 2">sản phẩm</span>
                    <span v-else>sản phẩm</span> trong giỏ hàng
                  </p>
                </h3>
              </div>

              <div v-if="cartItem.length == 0">
                <div class="box-content row no-food">
                  <div class="content">
                    <h2 style="color: #057835fa;">Bạn không có sản phẩm nào trong giỏ hàng, đến menu để mua hàng!</h2>
                  </div>

                  <div class="image">
                    <img src="../assets/images/notfound.png" alt="">
                  </div>
                </div>
              </div>

              <div v-else>
                <div v-for="(p, index) in cartItem" :key="index">
                  <div class=" box-content row">
                    <div class="centre image-box col-sm-2" style="padding-left: 0;">
                      <img :src="`${p.image}`" alt="">
                    </div>
                    
                    <div class="centre desc col-sm-3">
                      <h4 class="item-name">{{ p.name }}</h4>
                    </div>  
                    
                    <div class="centre item-price col-sm-2">
                      <h4 class="sale-price">{{ parseInt(p.salePrice) }} VNĐ</h4>
                      <h4 class="sale-price sale" v-if="p.price != p.salePrice">{{ p.price }} VNĐ</h4>
                    </div>

                    <div class="centre item-qtt col-sm-2">
                      <button class="btnn" @click="decrease(index)"><i class="fa-solid fa-minus"></i></button>
                      <input type="text" id="iQuantity" class="form-control item-quantity" 
                        :value="p.quantity" min="1" max="100"
                        oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                        @change="changeQty($event, index)"
                       >
                      <button class="btnn" @click="increase(index)"><i class="fa-solid fa-plus"></i></button>
                    </div>

                    <div class="centre cal-total col-sm-2">
                      <h4 class="item-total"> {{ p.quantity * p.salePrice }} VNĐ</h4>
                    </div>

                    <div class="centre col-sm-1">
                      <button class="btnn" @click="deleteProduct(index)">Xóa</button>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

            <div class="box-content row">
              <RouterLink to="/menu" class="btnn shop-btn" style="margin-bottom: 1rem; text-align: center;"><i class="fa fa-arrow-left"></i> Tiếp tục mua</RouterLink>
              <button class="btnn checkout-btn" :disabled="cartItem.length ? false : true"><i class="fa fa-shopping-cart"></i> Thanh toán</button>
            </div>
          </div>

          <!-- <div class="col-md-3">
            <div class="box">
              <div class="box-title">
                <h3>Hóa Đơn</h3>
              </div>

              <div class="box-content pay">
                <span>Giá trị sản phẩm</span>
                <h3 class="font-bold total-first-price">{{ totalMoneyBeforeDiscount }}</h3>

                <span>Giảm giá</span>
                <h3 class="font-bold total-discount">{{ }}</h3>

                <span>Phí vận chuyển</span>
                <h3 class="font-bold total-delivery">{{ ship }}</h3>

                <span>Tổng giá trị đơn hàng</span>
                <h2 class="font-bold total-sale">{{ totalMoneyBeforeDiscount + ship }}</h2>

                <div class="btn-group">
                  <button class="btnn checkout-btn" 
                    :disabled="cartItem.length ? false : true">
                    <i class="fa fa-shopping-cart"></i>
                    Thanh toán
                  </button>
                  <button class="btnn cancel-btn" 
                    :disabled="cartItem.length ? false : true">
                    Hủy
                  </button>
                </div>
              </div>
            </div>

            <div class="box">
              <div class="box-title">
                <h3>Đường dây nóng</h3>
              </div>

              <div class="box-content pay text-center">
                <h3><i class="fa fa-phone"> 091 511 57 01</i></h3>
                <span class="small">Liên hệ với chúng tôi nếu bạn có câu hỏi. Chúng tôi luôn có mặt 24/24</span>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
// import formatMoney from '@/formatNumber.js';

export default {
  name: 'Cart',
  data() {
    return {
      cartItem: [],
      cart: null,
      totalMoneyBeforeDiscount: null,
      total: null,
      ship: 15000,
    }
  },
  methods: {
    matchID(food, cartArray) {
      let temp = '';
      cartArray.forEach(element => {
        if (parseInt(food.food_id) == element) {
          temp = food;
        }
      });
      return temp; 
    },

    async getCart() {
      let res = await axios.get('cart', {withCredentials: true});
      this.cartItem = res.data.productsInCart;
      this.totalMoneyBeforeDiscount = res.data.totalMoneyBeforeDiscount;
      this.cart = res.data.productsInCart;
    },

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
      await axios.put('edit-product-cart', data, { withCredentials: true });

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
      let data = {
        product_id: this.cartItem[index].product_id,
      }
      let res = await axios.post('remove-product-cart', data, {withCredentials: true});
      this.cartItem.splice(index, 1);
    }

  },
  computed: {
    ...mapState(['user', 'allFoods']),
    formatMoney(value) {
      return value * 10;
    }
  },
  created() {
    this.getCart();
  }

}
</script>

<style lang="scss">

.item-name {
  color: #27ae60;
}

.box .box-content.pay {
  span {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 2em;
  }
}


.cart-product-img {
  text-align: center;
  width: 100%;
  height: 125px;
  object-fit: cover;
  background-color: #f7f7f7;
}

.shopping-cart {
  background: #fff;
  margin: 9rem 15%;
}

.box {
  clear: both;
  margin: 0;
  margin-bottom: 20px;
  padding: 0;
  &::after {
    display: table;
  }
  &::before {
    display: table;
  }
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
    background-color: inherit;
    color: inherit;
    padding: 15px 20px 20px 20px;
    border-color: #e7eaec;
    border-image: none;
    border-style: solid solid none;
    border-width: 3px 0;

    .centre {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .btn-group {
      .cancel-btn {
        margin-left: 10px;
      }
    }
    .image-box {
      img {
        width: 8rem;
        border-radius: 1rem;
      }
    }
    .item-qtt {
      display: flex;
      flex-direction: row;
      button {
        width: 4rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          padding : 0;
        }
      }
      input {
        text-align: center;
        height: 4rem;
        width: 5rem;
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

.item-desc {
  b {
    font-size: 12px;
  }
  p {
    font-size: 10px;
  }
}

.sale-price, .first-price, .item-quantity {
  width: 60px;
  height: 15px;
} 

.item-quantity {
  text-decoration: line-through;
}

.remove-btn {
  font-size: 10px;
  padding: 5px;
  margin-top: 27px;
  i {
    padding-right: 5px;
  }
}

.no-food {
  text-align: center;
  justify-content: center;
  display: block;
  img {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .box-content {
    .item-name {
      font-size: 14px;  
    }
    .btn-group {
      display: block;
      button {
        border-radius: 0.5rem !important;
        i {
          margin-top: 3px;
        }
      }
      .checkout-btn {
        display: flex;
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
  }

  .desc button {
    position: absolute;
    bottom: 0;
  }

    .box .box-content .btn-group .cancel-btn {
      margin-left: 0;
    }
}

@media (max-width: 576px) {
  .box-title {
    min-height: 48px;
  }

  .box .box-content .btn-group .cancel-btn {
    margin-left: 0;
  }

  .box-title.item-total {
    border: none;
  }

  .in-cart .box-content {
    color: white;
    border: none;
    display: flex;
    margin-left: 2rem;
    margin-right: 2rem;
    .btn-group {
      margin-top: 5px;
      display: inline-flex;
      .checkout-btn {
        display: flex;
        margin-top: 0px;
        margin-right: 5px;
        margin-bottom: 0px;
      }
    }
  }

  .image-box {
    position: absolute;
    opacity: 0.8;
    width: 100%;
    max-height: 100%;
    filter: brightness(60%);
    padding: none;
    img {
      border-radius: 1rem;
    }
  }

  .desc {
    .item-name {
      font-size: 16px;
      filter: brightness(160%);
    }
    b {
      font-size: 10px;
    }
    p {
      font-size: 12px;
    }
    .remove-btn {
      font-size: 10px;
      position: relative;
    }
  }

  .item-price {
    position: absolute;
    margin-top: 55px;
    .first-price {
      display: inline;
      padding-left: 5px;
      color: red !important;
    }
  }

  .item-quantity {
    position: absolute;
    margin-top: 55px;
    padding-left: 160px;
  }

  .cal-total {
    display: none;
  }

  .in-cart .box-content .checkout-btn {
    display: none;
  }

}



</style>