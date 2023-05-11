<template>
  <VueBasicAlert :duration="200" :closeIn="700" ref="alert" />

  <div v-if="user.userName" class="product-detail">
    <div class="product-detail-inner" v-for="p in selectProduct" :key="p">
      <button class="out" @click="setShowProduct(false)">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div class="row product-description">

        <div class="image">
          <img :src="`${imgUrl}${p.image}`" alt="">
        </div>

        <div class="content">
          <h2 class="w-100 text-center">{{ p.name }}</h2>
          <div>
            <p class="nosale" v-if="p.price != parseInt(p.salePrice)">{{ p.price.toLocaleString("it-IT", { style: "currency", currency: "VND" }) }}</p>
            <p >{{ parseInt(p.salePrice).toLocaleString("it-IT", { style: "currency", currency: "VND" }) }}</p>
          </div>

          <div class="row quantity">
            <label class="col-xl-5 col-lg-12 col-md-12" for="qty">Số Lượng:</label>

            <div class="col-xl-7 col-lg-12 col-md-12 justify-content-center">
              <button class="btn btn-danger" @click="decrease()" :disabled="qty < 2"><i class="fa-solid fa-minus"></i></button>
              <input type="text" name="qty" id="qty" :value="qty" min="1" max="100"
               oninput="this.value = this.value.replace(/[^0-9]/g, '')"
               @input="qty = $event.target.value"
               >
              <button class="btn btn-info" @click="increase($event)"><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>

          <button class="addToCart" @click="addToCart($event)">
            <p class="fa-solid fa-cart-plus"></p>
            <p class="">Thêm vào giỏ hàng</p>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="product-detail">
    <div class="product-detail-inner">
      <button class="out" @click="setShowProduct(false)">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div class="row" style="margin-top: 3rem;">
        <h2 class="col-12 text-center">Vui lòng đăng nhập để sử dụng tính năng này</h2>
        <div class="col-4"></div>
        <RouterLink @click="setShowProduct(false)" class="btnn col-4 text-center" to="login">Đăng Nhập</RouterLink>
        <div class="col-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapMutations, mapState } from 'vuex';
import VueBasicAlert from 'vue-basic-alert';
import serverUrl from '@/axios';


export default {
  name: 'ProductDetail',
  components: {
    VueBasicAlert
  },
  props: ['product'],
  data() {
    return {
      qty: 1,
      imgUrl: serverUrl,
    }
  },

  methods: {
    ...mapMutations(['setShowProduct']),
    ...mapActions(['getCart']),

    async addToCart() {
      let data = {
        // user_id: this.user.userId,
        product_id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        salePrice: (1 - this.product.discount.discount_percent) * this.product.price,
        quantity: this.qty,
        image: this.product.image,
      }
      
      await axios.post('add-to-cart', data, {withCredentials: true});
      await new Promise(() => setTimeout(() => {
        this.setShowProduct(false);
      }, 700)).then(this.$refs.alert.showAlert("Thêm vào giỏ hàng thành công !"), 
      this.getCart());
      
    },

    decrease() {
      this.qty--;
    },

    increase() {
      this.qty++;
    }

  },
  computed: {
    ...mapState(['user', 'allFoods', 'showProduct', 'cartItem']),

    selectProduct() {
      return this.allFoods.filter((p) => p.id == this.product.id);
    }
  }
  
}
</script>

<style lang="scss" scoped>

.product-detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 49;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  .product-detail-inner {
    position: relative;
    background-color: #fff;
    width: 35rem;
    // border-radius: 2rem;
    box-shadow: 1rem 1rem 1rem  rgba($color: #f1f1f1, $alpha: 1),
                -1rem -1rem 1rem  rgba($color: #f1f1f1, $alpha: 1),
                1rem -1rem 1rem  rgba($color: #f1f1f1, $alpha: 1),
                -1rem 1rem 1rem  rgba($color: #f1f1f1, $alpha: 1);
    .out {
      position: absolute;
      right: -2rem;
      top: -2rem;
      width: 4rem;
      height: 4rem;
      border-radius: 3rem;
      font-size: 2rem;
      background-color: #d62e41;
      color: white;
      z-index: 100;
      &:hover {
        background-color: #f62f41;
      }
    }
    .product-description {
      position: relative;
      .image {
        img {
          filter: brightness(60%);
          width: 100%;
          border-radius: 1rem;
        }
      }

      .content {
        position: absolute;
        top: 15%;
        border-radius: 1rem;
        font-size: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        color: #fff;

        .addToCart {
          background-color: #ffa31a;
          color: #fff;
          padding: 0.3rem 1rem;
          border-radius: 0.7rem;
          font-size: 1.8rem;
          margin-top: 1.5rem;
          display: flex; 
          &:hover {
            background-color: #e69c00;
          }
          p {
            height: 3rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0;
            &:nth-child(2) {
              margin-left: 1rem;
            }
          }
        }
        h2 {
          font-size: 2.5rem;
        }
        div > p {
          margin: 0;
          font-size: 3rem;
        }
        .nosale {
          text-decoration: line-through;
          color: rgba($color: #fff, $alpha: 0.5)
        }
        .quantity {
          label {
            // height: 4rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            font-size: 2rem;
          }
          div {
            display: flex;
            flex-direction: row;
            input {
              border-radius: 1rem;
              text-align: center;
              width: 5rem;
              height: 4rem;
              font-size: 1.8rem;
            }
            button {
              width: 4rem;
              height: 4rem;
              margin: 0 0.5rem;
              color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
              i {
                padding: 0;
                font-size: 2rem;
              }
            }
          }
        }
      }
    }
  }
}


@media (max-width: 340px) {
  .product-detail .product-detail-inner  {
    width: 28rem;
    .product-description {
      .content {
        top: 10%;
        h2 {
          font-size: 2rem;
        }
        div > p {
          font-size: 2rem;
        }
      }
    }
  }
}

</style>