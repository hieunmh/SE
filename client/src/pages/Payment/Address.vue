<template>
  <div class="address" @click.self="setSelect(false)">
    <div class="address-form" @click.self="setSelect(false)">
      <div class="input-address">
        <input type="text" @click="setSelect(true)" @input="setSelect(true)" style="font-size: 1.5rem;" placeholder="Tỉnh / Thành Phố, Quận / Huyện, Phường / Xã" :value="`${address.pro}${address.dis}${address.war}`">
        <i v-if="select" class="fa-solid fa-circle-xmark" @click="deleteAddress"></i>
      </div>

      <div v-if="select" class="col-12 row mt-2 address-bar">
        <div class="row">
          <button class="col-4 text-center" :disabled="!canInputPro" :class="{ active: showProvince }" @click="showPro">
            <h4 style="margin: 0;">Tỉnh / Thành Phố</h4>
          </button>

          <button class="col-4 text-center" :disabled="!canInputDis" :class="{ active: showDistrict }" @click="showDis">
            <h4 style="margin: 0;">Quận / Huyện</h4>
          </button>

          <button class="col-4 text-center" :disabled="!canInputWar" :class="{ active: showWard }" @click="showWa">
            <h4 style="margin: 0;">Phường / Xã</h4>
          </button>
        </div>
        
        <div class="row">
          <div v-if="showProvince" class="col-12 address-detail" style="height: 25vh; overflow-y: scroll; border: 1px solid #27ae60; cursor: pointer;">
            <option v-for="(p, index) in provinces" :value="`${p.code}`" @click="setProvince($event)">{{ p.name }}</option>
          </div>

          <div v-if="showDistrict" class="col-12 address-detail" style="height: 25vh; overflow-y: scroll; border: 2px solid #27ae60; cursor: pointer;">
            <option v-for="(d, index) in districts" :value="`${d.code}`" @click="setDistrict($event)">{{ d.name }}</option>
          </div>

          <div v-if="showWard" class="col-12 address-detail" style="height: 25vh; overflow-y: scroll; border: 2px solid #27ae60; cursor: pointer;">
            <option v-for="(w, index) in wards" :value="`${w.code}`" @click="setWard($event)">{{ w.name }}</option>
          </div>
        </div>
      </div>

      <div v-else class="d-flex flex-column" style="height: 30vh; margin-top: 0.5rem;">
        <input type="none" :disabled="inputDisabled" required="required" placeholder="Địa chỉ cụ thể" v-model="address.detail" style="font-size: 1.5rem;">

      </div>

      <div>
        <button @click="setAddressPayment" class="btnn">Hoàn Thành</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: "Register",
  data() {
    return {
      showEditPass: false,
      provinces: null,
      districts: null,
      wards: null,
      select: false,
      inputDisabled: true,
      address: {
        pro: "",
        dis: "",
        war: "",
        detail: ""
      },
      showProvince: true,
      showDistrict: false,
      showWard: false,

      canInputPro: true,
      canInputDis: false,
      canInputWar: false,
    };
  },
  methods: {
    ...mapMutations(['scrollToTop', 'setShowAlertEditInfo', 'setShowAlertEditPass', 'setInputAddress', 'setAddress']),

    setAddressPayment() {
      let data = {
        pro: this.address.pro,
        dis: this.address.dis.substring(2),
        war: this.address.war.substring(2),
        detail: this.address.detail
      }

      this.setAddress(data);
      this.setInputAddress(false);
      // if (this.address.detail) {
      //   this.setInputAddress(false);
      // }
    },

    setSelect(set) {
      this.select = set;

      if (this.address.pro) {
        this.canInputDis = true;
      }

      if (this.address.dis) {
        this.canInputWar = true;
      }
      
    },
     
    showPro() {
      this.showProvince = true;
      this.showDistrict = false;
      this.showWard = false;

      this.canInputDis = true;
    },

    showDis() {
      this.showProvince = false;
      this.showDistrict = true;
      this.showWard = false;

      this.canInputWar = true;
    },
    
    showWa() {
      this.showProvince = false;
      this.showDistrict = false;
      this.showWard = true;
    },

    setProvince(event) {
      this.canInputDis = true;
      if (this.address.pro) {
        this.address.pro = "";
        this.address.dis = "";
        this.address.war = "";
      }
      
      this.address.pro += event.target.innerText;

      this.getDistrict(event);

      this.showProvince = false;
      this.showDistrict = true;  
      this.showWard = false;    
    },

    setDistrict(event) {
      this.canInputWar = true;
      if (this.address.dis) {
        this.address.dis = "";
        this.address.war = "";
      }

      this.address.dis += " , " + event.target.innerText;
      this.getWard(event);

      this.showProvince = false;
      this.showDistrict = false;
      this.showWard = true;
    },

    setWard(event) {
      if (this.address.war) {
        this.address.war = "";
      }
      this.address.war = " , " + event.target.innerText;

      this.select = false;
      this.inputDisabled = false;
    },

    deleteAddress() {
      this.address.pro = "";
      this.address.dis = "";
      this.address.war = "";

      this.showProvince = true;
      this.showDistrict = false;
      this.showWard = false;

      this.canInputDis = false;
      this.canInputWar = false;
    },

    async getProvince() {
      await axios.get('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1')
        .then((res) => {
          this.provinces = res.data.data.data;
        })
    },

    async getDistrict(event) {
      let code = event.target.value;
      await axios.get('https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=' + code + '&limit=-1')
        .then((res) => {
          this.districts = res.data.data.data;
        })
    },

    async getWard(event) {
      let code = event.target.value;
      await axios.get('https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=' + code + '&limit=-1')
        .then((res) => {
          this.wards = res.data.data.data;
        })
    },

  },

  computed: {
    ...mapState(['user', 'showAlertEditInfo', 'showAlertEditPass', 'addressPayment'])
  },
  
  created() {
    this.getProvince();
  }

}
</script>

<style lang="scss" scoped>
.address {
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  .address-form {
    padding: 3rem;
    background-color: #fff;
    height: 45vh;
    width: 50rem;
    input {
      border: 1px solid #27ae60;
      height: 4rem;
      width: 100%;
      padding-left: 1rem;
    }

    .input-address {
      position: relative;
      i {
        position: absolute;
        right: 0.8rem;
        top: 1rem;
        color: rgba($color: #000, $alpha: 0.2);
        &:hover {
          color: rgba($color: #000, $alpha: 0.3);
        }
      }
    }

    .address-bar {
      margin: 0;
      margin-top: 0;
      padding: 0;
      padding: 0;
      height: 30vh;
      .row {
        padding: 0;
        margin: 0;
      }
      button {
        height: 3.5rem;
        color: #27ae60;
      }
      button.active {
        background-color: #27ae60;
        color: #fff;
      }
      button:disabled {
        background-color: #f1f1f1;
        color: #27ae60;
      }
    }

    .address-detail {
      padding: 0;
      option {
        padding: 0.7rem 1rem;
        font-size: 1.5rem;
        &:hover {
          background-color: rgba(0, 0, 0, 0.07);
        }
      }
    }
    
  }
}

</style>