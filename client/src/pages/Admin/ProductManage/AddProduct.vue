<template>
  <div>
    <div class="add-product">
      <div class="add-product-inner">

        <button class="out" @click="setShowAddPro(false)">
          <i class="fa-solid fa-xmark"></i>
        </button>


        <div class="col-12 row image-upload" enctype="multipart/form-data">
          <input type="text" v-model="proName" name="name" placeholder="tên sản phẩm">
          <input type="text" v-model="proDesc" name="desc" placeholder="mô tả">
          <input type="text" v-model="proPrice"  name="price" placeholder="giá" class="" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
          <input type="text" v-model="proQtt"  name="quantity" placeholder="số lượng" class="" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
          <input type="text" v-model="proSoldNum"  name="soldNumber" placeholder="đã bán" class="" oninput="this.value = this.value.replace(/[^0-9]/g, '')">

          <!-- <input type="file" ref="imageInput" @input="pickImage" value="" id="upload-image" accept="image/*"> -->
          <input type="file" name="myImage" accept="image/*" @change="handleFileUpload">

          <!-- <label for="upload-image">
            <i class="fa-solid fa-file-arrow-up"></i>
            <img :src="`${previewImg}`" alt="">
          </label> -->
        </div>

        <button class="btnn" @click="addProduct">Thêm</button>

      </div>
    </div>
  </div>
</template>

<script>
import serverUrl from '@/axios';
import { mapMutations } from 'vuex';
import axios from 'axios';


export default {
  name: "AddProduct",
  data() {
    return {
      imgUrl: serverUrl,
      previewImg: null,
      proName: "",
      proDesc: "",
      proPrice: "",
      proQtt: "",
      proSoldNum: "",
      imgFile: null,
    }
  },

  methods: {
    ...mapMutations(['setShowAddPro']),

    selectImg() {
      this.$refs.imageInput.click();
    },

    pickImage() {
      let input = this.$refs.imageInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader;
        reader.onload = (event) => {
          this.previewImg = event.target.result;
        }
        reader.readAsDataURL(file[0]);
      }
      console.log(file);
    },

    handleFileUpload(event) {
      this.imgFile = event.target.files[0];
    },

    async addProduct() {
      let body = {
        name: this.proName,
        desc: this.proDesc,
        price: this.proPrice,
        quantity: this.proQtt,
        sold_number: this.proSoldNum,
      }
      let formdata = new FormData();
      formdata.append('file', this.imgFile);
      formdata.append('document', JSON.stringify(body));


      await axios({
        method: 'post',
        url: 'http://localhost:3000/admin/product/add',
        data: formdata,
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      
    },


  }
}
</script>

<style lang="scss" scoped>
.add-product {
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

  .add-product-inner {
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

    .row {
      margin: 0;
      margin-top: 2rem;
      input {
        margin-bottom: 1rem;
        height: 4rem;
        border: 1px solid #27ae60;
        font-size: 2rem;
      }
    }

    .image-upload {
      label {
        // border: 2px dotted #27ae60;
        height: 20rem;
        width: 20rem;
        i {
          font-size: 3rem;
          color: #27ae60;
        }
      }
      img {
        width: 100%;
        height: 100%;
        border: 2px solid #27ae60;
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