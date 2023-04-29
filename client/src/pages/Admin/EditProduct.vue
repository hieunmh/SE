<template>
  <div>
    <div class="edit-product">
      <div class="edit-product-inner">

        <button class="out" @click="setShowEditpro(false)">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="row product-description">
          <div class="image">
            <img :src="`${imgUrl}${editdata.image}`" alt="">
          </div>

          <div class="content">
            <h2 class="w-100 text-center">{{  }}</h2>
            
            <div>
              <!-- <p class="nosale" v-if="p.price != parseInt(p.salePrice)">{{ p.price }} VNĐ</p>
              <p >{{ parseInt(p.salePrice) }} VNĐ</p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import serverUrl from '@/axios';
import { mapMutations } from 'vuex';

export default {
  name: "EditProduct",
  props: ['editdata'],
  data() {
    return {
      imgUrl: serverUrl + "/upload/productImage/",
    }
  },

  methods: {
    ...mapMutations(['setShowEditpro']),


  }
}
</script>

<style lang="scss" scoped>
.edit-product {
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
  padding: 2rem 20%;

  .edit-product-inner {
    position: relative;
    background-color: #fff;
    width: 100%;
    height: 50rem;
    // border-radius: 2rem;
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
          width: 10rem;
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
          font-size: 1.8rem;
          margin-top: 1.5rem;
          display: flex; 
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
              display: flex;
              justify-content: center;
              align-items: center;
              i {
                padding: 0;
              }
            }
          }
        }
      }
    }
  }
}


@media (max-width: 340px) {
  .edit-product .edit-product-inner  {
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