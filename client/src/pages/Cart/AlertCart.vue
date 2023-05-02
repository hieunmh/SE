<template>
  <div class="alert-cart">
    <div class="alert-cart-inner">
      <div class="row text-center">
        <h1>Bạn có chắc muốn bỏ sản phẩm này?</h1>
      </div>
      <div class="row">
        <button class="btn btn-info col-6" @click="deleteProduct">Có</button>
        <button class="btn btn-danger col-6" @click="setShowAlert(false)">Không</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

  export default {
    name: 'Alert',
    props: ['index'],
    data() {
      return {

      }
    },
    methods: {
      ...mapMutations(['setShowAlert']),
      
      async deleteProduct() {
        let data = {
          product_id: this.cartItem[this.index].product_id,
        }
        await axios.post('remove-product-cart', data, { withCredentials: true });
        this.cartItem.splice(this.index, 1);
        this.setShowAlert(false);
      }
  
    },
    computed: {
      ...mapState(['cartItem'])
    }
  }
</script>

<style lang="scss">

.alert-cart {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  .alert-cart-inner {
    background-color: #fff;
    width: auto;
    height: auto;
    border-radius: 0.7rem;
    .row {
      width: 50rem;
      margin: 0;
      
      h1 {
        font-size: 2.5rem;
        margin: 2rem 0;
      }
      .btn {
        padding: .7rem 1.8rem;
        font-size: 1.7rem;
        cursor: pointer;
        color: #fff;
        &:nth-child(1) {
          border-radius: 0 0 0 0.7rem;
        }
        &:nth-child(2) {
          border-radius: 0 0 0.7rem 0;
        }
      }
    }
  }
}

@media (max-width: 400px) {
  .alert-cart {
    .alert-cart-inner {
      .row {
        width: 30rem;
        h1 {
          font-size: 1.5rem;
        }
      }
    }
  }
} 

</style>