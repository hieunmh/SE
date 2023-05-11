<template>
  <VueBasicAlert :duration="200" :closeIn="700" ref="alert" />

  <div>
    <div class="add-product" @click.self="this.showDis = false, this.showCate = false">
      <div class="add-product-inner" @click.self="this.showDis = false, this.showCate = false">

        <button class="out" @click="setShowEditpro(false)">
          <i class="fa-solid fa-xmark"></i>
        </button>


        <div class="row upload" enctype="multipart/form-data" @click.self="this.showDis = false, this.showCate = false">

          <div class="upload-group col-12">
            <input type="text" class="upload-control" required="require" v-model="proName" name="name"
              @click.self="this.showDis = false, this.showCate = false">
            <span>tên sản phẩm</span>
          </div>

          <div class="upload-group col-12">
            <input type="text" class="upload-control" required="require" v-model="proPrice" name="price"
              @click.self="this.showDis = false, this.showCate = false"
              oninput="this.value = this.value.replace(/[^0-9]/g, '')">
            <span>giá</span>
          </div>

          <div class="upload-group col-12">
            <input type="text" class="upload-control" required="require" v-model="proQtt" name="quantity"
              @click.self="this.showDis = false, this.showCate = false"
              oninput="this.value = this.value.replace(/[^0-9]/g, '')">
            <span>số lượng</span>
          </div>

          <div class="upload-group dad col-12">
            <input type="text" class="upload-control" required="require" v-model="proDisName" name="quantity"
              @click="this.showDis = true, this.showCate = false">
            <span>giảm giá</span>
            <div class="discount col-12" v-if="showDis">
              <option v-for="(dis, index) in allDiscount" :key="index" :value="`${dis.id}`" @click="setDiscount">{{
                dis.name }}</option>
            </div>
          </div>

          <div class="upload-group dad col-12">
            <input type="text" class="upload-control" required="require" v-model="proCateName" name="quantity"
              @click="this.showCate = true">
            <span>danh mục</span>
            <div class="discount col-12" v-if="showCate">
              <option v-for="(cate, index) in category" :key="index" :value="`${cate.id}`" @click="setCate">{{ cate.name }}</option>
            </div>
          </div>

          <div class="col-12" style="margin-top: 3rem;">
            <button class="col-12 btnn button" style="margin-top: 3rem;" :disabled="calDisable" @click="editProduct">Hoàn thành</button>
          </div>
        </div>



      </div>
    </div>
  </div>
</template>

<script>
import serverUrl from '@/axios';
import { mapActions, mapMutations, mapState } from 'vuex';
import axios from 'axios';
import VueBasicAlert from 'vue-basic-alert';

export default {
  name: "AddProduct",
  props: ['editdata'],
  components: {
    VueBasicAlert
  },
  data() {
    return {
      imgUrl: serverUrl,
      previewImg: null,
      proName: "",
      proDesc: "",
      proPrice: "",
      proQtt: "",
      proCate: null,
      proCateName: null,
      proDisID: null,
      proDisName: null,
      imgFile: null,
      allDiscount: [],
      showDis: false,
      showCate: false,
    }
  },

  methods: {
    ...mapMutations(['setShowEditpro']),
    ...mapActions(['getCategory', 'getProducts']),

    async editProduct() {
      let data = {
        name: this.proName,
        desc: this.proDesc,
        price: this.proPrice,

      }
    },

    setAttribute() {
      this.proName = this.editdata.name;
      this.proPrice = this.editdata.price;
      this.proDisName = this.editdata.discount.name;
      this.proQtt = this.editdata.quantity;
      let id = this.category.filter(cate => cate.id == this.editdata.category_id)[0];
      this.proCateName = id.name;
    },

    async getDiscount() {
      await axios.get('/all-discount', { withCredentials: true })
        .then((res) => {
          this.allDiscount = res.data;
        })
    },


    setDiscount(event) {
      this.proDisID = event.target.value;
      this.proDisName = event.target.innerText;
      this.showDis = false;
    },

    setCate(event) {
      this.proCate = event.target.value;
      this.proCateName = event.target.innerText;
      this.showCate = false;
    },


  },

  computed: {
    ...mapState(['category']),

    calDisable() {
      let disable = true;
      if (this.proName && this.proDesc && this.proPrice && this.proQtt && this.proDisID && this.proCate && this.imgFile) {
        disable = false;
      }
      return disable;
    },

  },

  created() {
    this.getCategory().then(this.setAttribute);
    this.getDiscount();
  } 
}
</script>

<style lang="scss" scoped>
.add-product {
  position: fixed;
  top: 0rem;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 20%;

  .add-product-inner {
    margin-top: 15rem;
    position: relative;
    background-color: #fff;
    max-width: 40rem;
    height: 50rem;
    border-radius: 1rem;

    button {
      margin: 0;
    }

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

    .row {
      margin: 0;
      margin-left: 1rem;
      margin-right: 1rem;
    }

    .upload {
      .dad {
        position: relative;

        .discount {
          position: absolute;
          width: calc(100% - 1.5rem);
          z-index: 50;
          background-color: #f1f1f1;
          padding: 0;
          margin: 0;
          height: 12rem;
          overflow-y: scroll;
          border: 2px solid #ffa31a;
          border-radius: 0.7rem;
          cursor: pointer;

          option {
            padding: 0.7rem 1rem;
            font-size: 1.5rem;

            &:hover {
              background-color: rgba(0, 0, 0, 0.07);
            }
          }
        }
      }

      .discount::-webkit-scrollbar {
        width: 0;
      }

      .upload-group {

        label {
          font-size: 1.5rem;
          background: #c0393b;
          color: #fff;
          padding: 1rem 2rem;
          width: 100%;
          text-align: center;
          border-radius: 1rem;
          margin-top: 0.5rem;
        }

        label:active {
          scale: 0.9;
        }

        position: relative;

        i {
          color: #27ae60;
          font-size: 2rem;
          position: absolute;
          top: 1.5rem;
          left: 1rem;
        }

        span {
          font-size: 1.7rem;
          position: absolute;
          top: 3.5rem;
          left: 2rem;
          color: rgba($color: #000000, $alpha: 0.3);
          pointer-events: none;
          margin: 0;
        }

        input {
          // margin-top: 2rem;
          margin-bottom: 0;

          &:focus {
            ~span {
              background-color: #222831;
              color: #fff;
              transform: translateX(0rem) translateY(-2.5rem);
              font-size: 1.5rem;
              border-radius: 0.7rem;
              padding: 0.2rem 0.8rem;
              letter-spacing: 0.3rem;
            }
          }

          &:valid {
            ~span {
              background-color: #222831;
              color: #fff;
              transform: translateX(0rem) translateY(-2.5rem);
              font-size: 1.5rem;
              border-radius: 0.7rem;
              padding: 0.2rem 0.8rem;
              letter-spacing: 0.3rem;
            }
          }
        }
      }

      .button {
        margin-top: 2rem;
        background-color: #25cff2 !important;
        color: #fff;
        font-size: 1.5rem;
        padding: 1rem 2rem;
        text-align: center;
        border-radius: 1rem;
      }

      .upload-control {
        height: 5rem;
        margin: 2.5rem 0;
        border-radius: 1rem;
        background-color: #f4f4f4;
        padding: 2rem 3.5rem;
        font-size: 1.5rem;
        color: #130f40;
        text-transform: none;
        width: 100%;
        border: none;
        box-shadow: inset 0.2rem 0.2rem 0.2rem #b3b3b3, inset -0.2rem -0.2rem 0.2rem #fff;
      }

      p {
        text-align: center;
        padding-top: 1rem;
        font-size: 1.5rem;
        color: #666;
        margin: 0;

        a {
          color: #27ae60;

          &:hover {
            color: #f38609;
            text-decoration: underline;
          }
        }
      }
    }
  }
}


@media (max-width: 992px) {
  .add-product {
    padding: 2rem 15%;
  }
}

@media (max-width: 767px) {
  .add-product {
    padding: 2rem 10%;
  }
}

@media (max-width: 576px) {
  .add-product {
    padding: 2rem 5%;
  }
}</style>