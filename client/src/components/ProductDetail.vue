<template>
  <div v-if="user" class="product-detail">
    <div class="product-detail-inner" v-for="p in selectProduct" :key="p">
      <h2 class="d-flex justify-content-between">{{ p.name }} <slot></slot></h2>

      <div class="product-description d-flex">
        <div class="image">
          <img :src="`${ p.image }`" alt="">
        </div>

        <div class="content">
          <p class="money">{{ p.price }} VND</p>

          <div class="quantity">
            <label for="qty">Số Lượng: </label>
            <input type="number" name="qty" id="qty" value="1" max="100">
          </div>

          <button class="btnn" @click="addToCart()">Thêm vào giỏ hàng</button>
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
import { mapState } from 'vuex';

export default {
  name: 'ProductDetail',
  props: ['product'],
  data() {
    return {
      quantity: 1,
    }
  },

  methods: {
    async addToCart() {
      let data = {
        user_id: parseInt(this.user.userId),
        product_id: this.product,
        item_qty: this.quantity
      }
      await axios.post('', {withCredentials: true});
    }
  },
  computed: {
    ...mapState(['user', 'allFoods']),

    selectProduct() {
      return this.allFoods.filter((p) => parseInt(p.id) == parseInt(this.product));
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
    height: 50vh;
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
        margin-top: 2rem;
        font-size: 2rem;
        width: 100%;
        align-items: center;
        text-align: center;
        div {
          margin-top: 3rem;
          label {
            margin-right: 1rem;
          }
          input {
            border: 2px solid #27ae60;
            border-radius: 1rem;
            padding-left: 1.5rem;
            width: 6.5rem;
          }
        }
        button {
          margin-top: 3rem;
        }
      }
    }
  }
}

</style>