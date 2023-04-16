<template>
  <VueBasicAlert :duration="200" :closeIn="2000" ref="alert" />

  <div v-if="user.userName" class="product-detail">
    <div class="product-detail-inner" v-for="p in selectProduct" :key="p">
      <h2 class="d-flex justify-content-between">{{ p.name }}
        <button class="btnn" @click="setShowProduct(false)">x</button>
      </h2>

      <div class="product-description d-flex">
        <div class="image">
          <img :src="`${ p.image }`" alt="">
        </div>

        <div class="content">
          <div>
            <p class="nosale" v-if="p.price != parseInt(p.salePrice)">{{ p.price }} VNĐ</p>
            <p >{{ parseInt(p.salePrice) }} VNĐ</p>
          </div>

          <div class="row quantity">
            <label class="col-5" for="qty">Số Lượng: </label>
            <div class="col-7">
              <button class="btnn" @click="decrease()" :disabled="qty < 2"><i class="fa-solid fa-minus"></i></button>
              <input type="text" name="qty" id="qty" :value="qty" min="1" max="100"
               oninput="this.value = this.value.replace(/[^0-9]/g, '')"
               @input="qty = $event.target.value"
               >
               
              <button class="btnn" @click="increase($event)"><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>

          <button class="btnn addToCart" @click="addToCart($event)">Thêm vào giỏ hàng</button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="product-detail">
    <div class="product-detail-inner">
      <h2 class="d-flex justify-content-between">Đăng nhập di ĐM <slot></slot></h2>
      <div>
        <RouterLink class="btnn" to="login">Đăng Nhập</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapMutations, mapState } from 'vuex';
import VueBasicAlert from 'vue-basic-alert';


export default {
  name: 'ProductDetail',
  components: {
    VueBasicAlert
  },
  props: ['product'],
  data() {
    return {
      qty: 1,
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
      }, 1000)).then(this.$refs.alert.showAlert("Thêm vào giỏ hàng thành công !"), 
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

<style lang="scss">

.product-detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  .product-detail-inner {
    background-color: #fff;
    width: 50vw;
    height: 45vh;
    padding: 30px;
    border-radius: 2rem;
    h2 {
      margin: 0;
      font-size: 2.5rem;
      color: #27ae60;
    }
    .product-description {
      .image {
        img {
          height: 30rem;
          border-radius: 1rem;
          margin: 1rem;
        }
      }

      .content {
        font-size: 2rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        .nosale {
          text-decoration: line-through;
          color: rgba($color: #000000, $alpha: 0.5)
        }
        .quantity {
          label {
            height: 4rem;
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
              border: 2px solid #27ae60;
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
              display: flex;
              justify-content: center;
              align-items: center;
              i {
                padding: 0;
              }
            }
          }
        }
        .addToCart {
          margin-top: 3rem;
        }
      }
    }
  }
}

</style>