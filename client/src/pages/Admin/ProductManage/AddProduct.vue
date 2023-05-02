<template>
  <div>
    <div class="add-product">
      <div class="add-product-inner">

        <button class="out" @click="setShowAddPro(false)">
          <i class="fa-solid fa-xmark"></i>
        </button>


        <form id="form" @submit.prevent="sendFile" class="col-12 row image-upload" enctype="multipart/form-data">
          <input type="text" id="name" name="name" placeholder="ten san pham">
          <input type="text" id="desc" name="desc" placeholder="Mo ta">
          <input type="text" id="price" name="price" placeholder="Gia" class="" oninput="this.value = this.value.replace(/[^0-9]/g, '')">

          <!-- <input type="file" ref="imageInput" @input="pickImage" value="" id="upload-image" accept="image/*"> -->
          <input type="file" id="" name="filename" accept="image/*" @change="handleFileUpload($event)">

          <!-- <label for="upload-image">
            <i class="fa-solid fa-file-arrow-up"></i>
            <img :src="`${previewImg}`" alt="">
          </label> -->

        </form>

        <button class="btnn" @click="addProduct">Them</button>

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

    // async addProduct() {
    //   let body = {
    //     name: this.proName,
    //     desc: this.proDesc,
    //     price: this.proPrice,
    //   }
    //   let formdata = new FormData();
    //   formdata.append('file', this.imgFile);
    //   // formdata.append('body', body);

    //   await axios.post('/admin/product/add', formdata, { withCredentials: true})
    //   .then((res) => {
    //     console.log(res);
    //   })
    // },


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