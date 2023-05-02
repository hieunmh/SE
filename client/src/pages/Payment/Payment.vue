<template>

  <div v-if="!showThank">
    <Thank></Thank>
  </div>

  <div v-if="inputAddress">
    <Address></Address>
  </div>

  <div class="payment">
    <div class="box">
      <div class="box-content">

        <button class="btnn" @click="$router.go(-1)"><i class="fa fa-arrow-left"></i></button>

        <div class="row">
          <div class="col-12" style="height: 4rem; color: #ee4d2d;"><h3 class="fw-bold"><i class="fa-solid fa-location-dot"></i> Địa chỉ nhận hàng</h3></div>

          <div class="col-10 d-flex justify-content-start">
            <h3 class="col-6 d-flex flex-column justify-content-center fw-bold">
              {{ user.userName }} (+84) {{ user.telephone.substring(1, 4) }} {{ user.telephone.substring(4, 7) }} {{ user.telephone.substring(7, 10) }}
            </h3>

            <h4 class="col-6 d-flex flex-column justify-content-center">
              <div class="fw-bold">
                {{ addressPayment.detail }} <span v-if="addressPayment.detail">,</span> 
                {{ addressPayment.war }} <span v-if="addressPayment.war">,</span> 
                {{ addressPayment.dis }} <span v-if="addressPayment.dis">,</span>  
                {{ addressPayment.pro }}
              </div>

              <div>

              </div>
            </h4>
          </div>
          

          <div class="col-2 d-flex justify-content-end" v-if="!defaultAddress"><button @click="setInputAddress(true)" class="btnn fw-bold">Thêm</button></div>
          <div class="col-2 d-flex justify-content-end" v-else><button @click="setInputAddress(true)" class="btnn fw-bold">Thay Đổi</button></div>
        </div>

        <div class="row bar">
          <div class="col-sm-6 col-7 text-center">
            <h4 class="fw-bold">Sản phẩm</h4>
          </div>

          <div class="col-2 d-sm-inline d-none text-center">
            <h4 class="fw-bold">Đơn giá</h4>
          </div>

          <div class="col-2 text-center">
            <h4 class="fw-bold">Số lượng</h4>
          </div>

          <div class="col-sm-2 col-3 text-center">
            <h4 class="fw-bold">Thành tiền</h4>
          </div>
        </div>
        
        <div class="row" v-for="(p, index) in cartItem" :key="index">
          <div class="centre col-sm-2 col-4 image-box" style="">
            <img :src="`${imgUrl}${p.image}`" alt="">
          </div>

          <div class="centre col-sm-4 col-3 desc">
            <h4 class="item-name fw-bold">{{ p.name }}</h4>
          </div>


          <div class="centre col-sm-2 d-sm-flex d-none cal-total">
            <h4 class="item-total fw-bold"> {{ parseInt(p.salePrice) }}</h4>
          </div>

          <div class="centre col-sm-2 col-2  item-qtt">
            <h4 class="fw-bold"><span class="d-sm-none d-inline">x</span>{{ p.quantity }}</h4>
          </div>

          <div class="centre col-sm-2 col-3">
            <h4 class="fw-bold">{{ p.quantity * p.salePrice }}</h4>
          </div>
        </div>

        <div class="row col-12">

          <div class="col-sm-10 col-9 d-flex justify-content-end">
            <h4 class="fw-bold">Tổng số tiền ({{ cartItem.length }} sản phẩm): </h4>
          </div>

          <div class="col-sm-2 col-3 centre">
            <h4 class="fw-bold">{{ calTotal()[0] }}</h4>
          </div>
        </div>


        <div>
          <div class="col-12 d-flex justify-content-end">
            <!-- <RouterLink to="/" @click="order()" style=" text-align: center; color: #fff;"> -->
              <button @click="order()" class="btnn checkout-btn fw-bold" :disabled="cartItem.length ? false : true">
                <i class="fa fa-shopping-cart"></i> Đặt hàng
              </button>
            <!-- </RouterLink> -->
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
import Thank from '@/components/Thank.vue';
import Address from './Address.vue';

export default {
  name: 'Payment',
  components: {
    Thank,
    Address,
  },
  data() {
    return {
      imgUrl: serverUrl,
      defaultAddress: null,
    }
  },
  methods: {
    ...mapMutations(['setShowThank', 'setInputAddress']),
    ...mapActions(['getCart']),

    async order() { 
      let data = {
        full_address: this.addressPayment.detail + " ," + this.addressPayment.war + " ," + this.addressPayment.dis + " , " + this.addressPayment.pro
      } 
      console.log(data.full_address);
      await axios.post('create-order', data, { withCredentials: true });

      await new Promise(() => setTimeout(() => {
        this.setShowThank(true);
        this.$router.push("/");
      }, 1000)).then(
        this.setShowThank(false),
        this.getCart()
      )
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
    },

    async postPayment() {
      await axios.post('payment', {}, { withCredentials: true })
        .then((res) => {
          this.defaultAddress = res.data.userAddress;
          console.log(this.defaultAddress);
        })
    },

  },
  computed: {
    ...mapState(['user', 'allFoods', 'cartItem', 'showThank', 'inputAddress', 'addressPayment']),


  }, 

  created() {
    this.postPayment()
  }


}
</script>

<style lang="scss" scoped>

.payment {
  padding: 2rem 20%;
  background-color: #fff;
  form {
    select {
      outline: none;
      appearance: none;
      height: 4rem;
      font-size: 1.5rem;
      font-weight: 500;
      border-radius: 0.7rem;
      text-align: center;
      option {
        height: 4rem;
      }
    }
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
      background-color: #f1f1f1;
      padding: 2rem 0;
      margin: 1rem 0;
      border-radius: 0.7rem;
      input {
        &::placeholder {
          text-align: center;
        }
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

.address {
  font-size: 2rem;
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