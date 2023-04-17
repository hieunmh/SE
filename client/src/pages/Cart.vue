<template>
  <div class="shopping-cart">

    <div class="heading">
      <span>Giỏ hàng của bạn</span>
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

              <div class="box-content row no-food" v-if="cartItem.length == 0">
                <div class="content">
                  <h2 style="color: #057835fa;">Bạn không có sản phẩm nào trong giỏ hàng, đến menu để mua hàng!</h2>
                </div>

                <div class="image">
                  <img src="../assets/images/notfound.png" alt="">
                </div>
              </div>

              <div v-else class="box-content">
                <div v-for="(p, index) in cartItem" :key="index">
                  <div class="row">
                    <div class="centre image-box col-sm-2" style="">
                      <img :src="`${p.image}`" alt="">
                    </div>
                    
                    <div class="centre desc col-sm-2">
                      <h4 class="item-name">{{ p.name }}</h4>
                    </div>  
                    
                    <div class="centre item-price col-sm-2">
                      <h4 class="sale-price">{{ parseInt(p.salePrice) }} VNĐ</h4>
                      <h4 class="sale-price sale" v-if="p.price != p.salePrice">{{ p.price }} VNĐ</h4>
                    </div>

                    <div class="centre item-qtt col-sm-2">
                      <button class="btnn" @click="decrease(index)" :disabled="p.quantity < 2"><i class="fa-solid fa-minus"></i></button>
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

                    <div class="centre col-sm-2 delete">
                      <button class="btnn" @click="deleteProduct(index)">
                        <p class="">Xóa</p>
                        <p class="fa-solid fa-trash"></p>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4"></div>
                  <div class="col-2 centre">
                    <!-- <h4>{{ calTotal()[1] }} VNĐ</h4> -->
                  </div>
                  <div class="col-2 centre">
                    <h4>Tổng</h4>
                  </div>
                  <div class="col-2 centre">
                    <h4>{{ calTotal()[0] }} VNĐ</h4>
                  </div>
                </div> 
              </div>
            </div>

            <div class="box">
              <div class="d-flex justify-content-around">
                <button class="col-4 btnn">
                  <RouterLink to="/menu" style=" text-align: center; color: #fff;">
                    <i class="fa fa-arrow-left" style="margin-right: 1rem;"></i>Tiếp tục mua
                  </RouterLink>
                </button>

                <button class="col-4 btnn checkout-btn" :disabled="cartItem.length ? false : true">
                  <RouterLink to="/payment" style=" text-align: center; color: #fff;">
                    <i class="fa fa-shopping-cart" style="margin-right: 1rem;"></i> Thanh toán
                  </RouterLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Cart',
  data() {
    return {
      cart: null,
      total: null,
      ship: 15000,
      totalPrice: 0,
    }
  },
  methods: {
    ...mapActions(['getCart']),

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
    ...mapState(['user', 'allFoods', 'cartItem']),
  },
  created() {
    this.getCart();
  }

}
</script>

<style lang="scss">

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
    padding: 1rem;
    border-image: none;
    .row {
      border: 2px solid #27ae60;
      border-radius: 1rem;
      padding: 1rem;
      margin: 1rem 0;
    }
    .centre {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .delete {
      display: flex;
      align-items: flex-end;
      button {
        display: flex;
        height: 4rem;
        align-items: center;
        p {
          margin: 0;
          &:nth-child(2) {
            margin-left: 1rem;
          }
          &:nth-child(1) {
            padding-top: 0.3rem;
          }
        }
      }
    }

    .image-box {
      display: flex;
      align-items: flex-start ;
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


@media (max-width: 768px) {
  .box-content {
    .btn-group {
      display: block;
      button {
        border-radius: 0.5rem !important;
        i {
          margin-top: 3px;
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .box-title {
    min-height: 48px;
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

  .item-price {
    position: absolute;
    margin-top: 55px;
    .first-price {
      display: inline;
      padding-left: 5px;
      color: red !important;
    }
  }

}



</style>