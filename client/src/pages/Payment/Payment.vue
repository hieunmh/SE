<template>
  <VueBasicAlert :duration="200" :closeIn="1500" ref="alert" />

  <div v-if="inputAddress">
    <Address></Address>
  </div>

  <div class="payment">
    <div class="box">
      <div class="box-content">

        <button class="" @click="$router.go(-1)"><i class="fa fa-arrow-left"></i></button>

        <div class="row">
          <div class="col-12" style="height: 4rem; color: #ee4d2d;"><h3 class="fw-bold"><i class="fa-solid fa-location-dot"></i> Địa chỉ nhận hàng</h3></div>

          <div class="col-10 d-flex justify-content-start">
            <div class="col-5 d-flex flex-column justify-content-center">
              <h3 class="fw-bold">{{ user.userName }}</h3>
              <h3 class="fw-bold">(+84) {{ user.telephone.substring(1, 4) }} {{ user.telephone.substring(4, 7) }} {{ user.telephone.substring(7, 10) }}</h3>
            </div>

            <h4 class="col-7 d-flex flex-column justify-content-center">
              <div class="fw-bold" v-if="addressPayment.detail && addressPayment.war && addressPayment.dis && addressPayment.pro">
                {{ addressPayment.detail }} <span v-if="addressPayment.detail">,</span> 
                {{ addressPayment.war }} <span v-if="addressPayment.war">,</span> 
                {{ addressPayment.dis }} <span v-if="addressPayment.dis">,</span>  
                {{ addressPayment.pro }}
              </div>

              <div v-else class="fw-bold" v-for="(add, index) in defaultAddress" :key="index">
                {{ add.home_location }} <span v-if="add.home_location">,</span> {{ add.city }}
              </div>
            </h4>
          </div>
          

          <div class="col-2 d-flex justify-content-end" v-if="!defaultAddress"><button @click="setInputAddress(true)" class="fw-bold">Thêm</button></div>
          <div class="col-2 d-flex justify-content-end" v-else><button @click="setInputAddress(true)" class="fw-bold">Thay Đổi</button></div>
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
            <h4 class="item-total d-sm-none d-inline text-secondary text-decoration-line-through fw-bold"
              v-if="parseInt(p.price) != parseInt(p.salePrice)">{{ p.price.toLocaleString("it-IT", { style: "currency", currency: "VND" }).slice(0, -3) }}&#8363;</h4>
            <h4 class="item-total d-sm-none d-inline fw-bold" style="color: #ee4d2d;">{{ parseInt(p.salePrice).toLocaleString("it-IT", { style: "currency", currency: "VND" }).slice(0, -3) }}&#8363;</h4>
            <h4 class="item-name fw-bold">{{ p.name }}</h4>
          </div>


          <div class="centre col-sm-2 d-sm-flex d-none cal-total">
            <h4 class="item-total fw-bold"> {{ parseInt(p.salePrice).toLocaleString("it-IT", { style: "currency", currency: "VND" }).slice(0, -3) }}&#8363;</h4>
          </div>

          <div class="centre col-sm-2 col-2  item-qtt">
            <h4 class="fw-bold"><span class="d-sm-none d-inline">x</span>{{ p.quantity }}</h4>
          </div>

          <div class="centre col-sm-2 col-3">
            <h4 class="fw-bold">{{ (p.quantity * p.salePrice).toLocaleString("it-IT", { style: "currency", currency: "VND" }).slice(0, -3) }}&#8363;</h4>
          </div>
        </div>

        <div class="row col-12">
          <div class="col-sm-10 col-9 d-flex justify-content-end">
            <h4 class="fw-bold">Tổng số tiền ({{ cartItem.length }} sản phẩm): </h4>
          </div>

          <div class="col-sm-2 col-3 centre">
            <h4 class="fw-bold">{{ calTotal()[0].toLocaleString("it-IT", { style: "currency", currency: "VND" }).slice(0, -3) }}&#8363;</h4>
          </div>
        </div>

        <div class="row payment-method col-12">
          <div class="col-sm-5 col-12 d-sm-flex justify-content-sm-end d-flex justify-content-center">
            <h4 class="fw-bold d-flex flex-column justify-content-center">phương thức thanh toán:</h4>
          </div>

          <div class="col-sm-3 col-12 mt-sm-0 mt-1">
            <div class="text-center pay-method" @click="setPaymentMethod($event), showQR()">Thanh toán bằng QR</div>
          </div>

          <div class="col-sm-4 col-12 mt-sm-0 mt-3">
            <div class="text-center pay-method" @click="setPaymentMethod($event), hideQR()">Thanh toán khi nhận hàng</div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-sm-5 d-sm-flex d-none qr-image d-flex flex-column justify-content-center align-items-center">
            <h1 class="">Quét mã để thanh toán</h1>
          </div>
          <div class="col-sm-4 col-12 d-flex flex-column justify-content-center align-items-center qr-image">
            <img class="" src="@/assets/images/QR.jpg" alt="">
          </div>
        </div>

        <div>
          <div class="col-12 d-flex justify-content-end">
            <!-- <RouterLink to="/" @click="order()" style=" text-align: center; color: #fff;"> -->
              <button @click.prevent="order()" class="checkout-btn fw-bold" >
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
import Address from './Address.vue';
import VueBasicAlert from 'vue-basic-alert';

export default {
  name: 'Payment',
  components: {
    Address,
    VueBasicAlert
  },
  data() {
    return {
      imgUrl: serverUrl,
      defaultAddress: [],
    }
  },
  methods: {
    ...mapMutations(['setShowThank', 'setInputAddress']),
    ...mapActions(['getCart']),

    async order() { 
      if (this.addressPayment.length == 0 && this.defaultAddress.length == 0) {
        this.$refs.alert.showAlert("Vui lòng thêm địa chỉ của bạn !");
      }
      else {
        let data = {};

        if (this.addressPayment.length == 0) {
          data = {
            full_address: this.defaultAddress[0].home_location + ", " + this.defaultAddress[0].city,
          }
        }
        else {
          data = {
            full_address: this.addressPayment.detail + " ," + this.addressPayment.war + " ," + this.addressPayment.dis + " , " + this.addressPayment.pro
          }
        }

        await axios.post('create-order', data, { withCredentials: true });

        await new Promise(() => setTimeout(() => {
          this.$router.push("/");
          this.getCart();
        }, 1000)).then(
          this.$refs.alert.showAlert("Cảm ơn bạn đã mua hàng !"),
        )
      }
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
          this.defaultAddress = res.data.userAddress.slice(-1);
        })
    },

    setPaymentMethod(event) {
      let pay = document.querySelectorAll('.pay-method');
      for (let i = 0; i < pay.length; i++) {
        pay[i].classList.remove('active');
      }

      event.target.classList.add('active');
    },

    showQR() {
      let qr = document.querySelectorAll('.qr-image');
      for (let i = 0; i < qr.length; i++) {
        qr[i].classList.add('active')
      }
    },

    hideQR() {
      let qr = document.querySelectorAll('.qr-image');
      for (let i = 0; i < qr.length; i++) {
        qr[i].classList.remove('active')
      }
    }

  },
  computed: {
    ...mapState(['user', 'allFoods', 'cartItem', 'showThank', 'inputAddress', 'addressPayment']),

    calDisable() {
      let disable = true;
      if (this.addressPayment.length != 0 || this.defaultAddress.length != 0) {
        disable = false;
      }
      return disable;
    },

  }, 

  created() {
    this.postPayment();
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

.checkout-btn {
  background-color: #ffa31a;
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 1.7rem;
  border-radius: 0.7rem;
  &:hover {
    background-color: #e66c00;
  }
}

.checkout-btn:disabled {
  cursor: not-allowed;
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

    > button {
      background-color: #ffa31a;
      font-size: 2rem;
      color: #fff;
      padding: 0.5rem 1.4rem;
      border-radius: 0.7rem;
      &:hover {
        background-color: #e66c00;
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

      > div {
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

.payment-method {
  > div {
      div {
        width: 100%;
        font-size: 1.5rem;
        color: #000000;
        border: 1px solid gray;
        border-radius: 0.7rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
      }
      div.active {
        border: 1px solid #ffa31a;
        background-color: #ffa31a;
        color: #fff;
      }
  }
}

.qr-image {
  img {
    display: none;
  }
  h1 {
    display: none;
  }
}
.qr-image.active {
  img {
    width: 25rem;
    display: block;
  }
  h1 {
    display: block;
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