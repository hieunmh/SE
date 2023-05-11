<template>
  <div class="product-manage">
    <div v-if="showEditpro">
      <EditProduct :editdata="editData"></EditProduct>
    </div>

    <div v-if="showDeletePro">
      <AlertDeleteProduct :index="id"></AlertDeleteProduct>
    </div>

    <div v-if="showAddPro">
      <AddProduct></AddProduct>
    </div>

    <div class="box">
      <div class="manage">
        <RouterLink to="/admin"><button class="col-6 fw-bold" disabled="true" >Quản Lý Sản Phẩm</button></RouterLink>
        <RouterLink to="/admin/allorder"><button class="col-6 fw-bold">Quản Lý Đơn Hàng</button></RouterLink>
      </div>

      <div class="box-content">
        
        <div class="row add-product d-flex justify-content-center">
          <button class="btn btn-outline-success col-12 text-center fw-bold" @click="setShowAddPro(true)">Thêm sản phẩm mới</button>
        </div>

        <div class="row bar">
          <div class="col-7">
            <h4 class="text-center fw-bold">Thông tin sản phẩm</h4>
          </div>

          <div class="col-2">
            <h4 class="text-center fw-bold">Đơn giá</h4>
          </div>


          <div class="col-3">
            <h4 class="text-center fw-bold">chi tiết</h4>
          </div>
        </div>


        <div v-for="(p, index) in currentPage" :key="index" class="row">
          <div class="centre col-3 image-box" style="">
            <img :src="`${imgUrl}${p.image}`" alt="">
          </div>

          <div class="centre col-4 desc ">
            <h4 class="item-name fw-bold">{{ p.name }}</h4>
          </div>


          <div class="centre col-2 cal-total">
            <h4 class="item-total text-dark text-decoration-line-through fw-bold"
              v-if="parseInt(p.price) != parseInt(p.salePrice)"> {{ p.price.toLocaleString("it-IT", { style: "currency", currency: "VND" }).slice(0, -3) }}</h4>
            <h4 class="item-total fw-bold">{{ parseInt(p.salePrice).toLocaleString("it-IT", { style: "currency", currency: "VND" }).slice(0, -3) }}</h4>
          </div>

          <div class="centre col-3 detail">
            <button class="btn btn-info fw-bold" @click="showEditProduct(index)">sửa</button>
            <button class="mt-2 btn btn-danger fw-bold" @click="showAlertDeleteProduct(index)">xóa</button>
          </div>
        </div>

        <div class="action-row">
          <button @click="previousToFirst()" class="action-btn decrease-btn">
            <i class="fa-solid fa-angles-left"></i>
          </button>

          <button @click="previous()" class="action-btn decrease-btn">
            <i class="fa-solid fa-angle-left"></i>
          </button>

          <div v-for="(page, index) in calculatePages" :key="index" class="d-inline">
            <button v-if="index == pageNum" class="highlight" @click="setPage(index)">{{ index + 1 }}</button>
            <button v-else @click="setPage(index)">{{ index + 1 }}</button>
          </div>

          <button @click="next()" class="action-btn increase-btn">
            <i class="fa-solid fa-angle-right"></i>
          </button>

          <button @click="nextToLast()" class="action-btn increase-btn">
            <i class="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import serverUrl from '@/axios';
import EditProduct from './EditProduct.vue';
import AlertDeleteProduct from './AlertDeleteProduct.vue';
import AddProduct from './AddProduct.vue';

export default {
  name: "Admin",
  components: {
    EditProduct,
    AlertDeleteProduct,
    AddProduct
  },

  data() {
    return {
      allOrder: [],
      OrderId: [],
      pageNum: 0,
      perPage: 6,
      imgUrl: serverUrl,
      editData: [],
      id: null,
    }
  },

  methods: {
    ...mapMutations(['scrollToTop' , 'setShowEditpro', 'setShowDeletePro', 'setShowAddPro']),
    ...mapActions(['getAllOrder', 'getProducts']),

    showEditProduct(index) {
      this.editData = this.currentPage[index];
      this.setShowEditpro(true);
    },

    showAlertDeleteProduct(index) {
      console.log(this.currentPage[index].id);
      this.id = this.currentPage[index].id;
      this.setShowDeletePro(true);
    },

    setPage(value) {
      this.pageNum = value;
      this.scrollToTop();
    },

    previous() {
      if (this.pageNum == 0) {
        document.querySelectorAll('.decrease-btn').disabled = true;
      }
      else {
        document.querySelectorAll('.decrease-btn').disabled = false;
        this.pageNum--;
      }
      this.scrollToTop();
    },

    previousToFirst() {
      this.pageNum = 0;
      this.scrollToTop();
    },

    next() {
      if (this.pageNum == this.calculatePages - 1) {
        document.querySelectorAll('.increase-btn').disabled = true;
      }
      else {
        document.querySelectorAll('.increase-btn').disabled = false;
        this.pageNum++;
      }
      this.scrollToTop();
    },

    nextToLast() {
      this.pageNum = this.calculatePages - 1;
      this.scrollToTop();
    },


  },

  computed: {
    ...mapState(['admin', 'allFoods', 'showEditpro', 'showDeletePro', 'showAddPro']),

    currentPage() {
      return this.allFoods.slice(this.pageNum * this.perPage, this.pageNum * this.perPage + this.perPage);
    },

    calculatePages() {
      if (this.allFoods.length % this.perPage != 0) {
        return Math.floor((this.allFoods.length) / this.perPage) + 1;
      }
      else {
        return this.allFoods.length / this.perPage;
      }
    },

  },

  created() {
    // this.getAllOrder();
    // this.getProducts();
  }

}
</script>

<style lang="scss" scoped>
.product-manage {
  padding: 2rem 20%;

  .box {
    margin: 0;
    width: 100%;
    margin-bottom: 20px;
    padding: 0;

    .manage {
      a {
        &:nth-child(1) {
          button {
            border-radius: 0.7rem 0 0 0.7rem;
          }
        }
        &:nth-child(2) {
          button {
            border-radius: 0 0.7rem 0.7rem 0;
          }
        }
      }
      button {
        background: #f1f1f1;
        color: #ffa31a;
        font-size: 1.7rem;
        padding: 0.7rem 0;
      }
      button:disabled {
        background-color: #ffa31a;
        color: #fff;
      }
    }

    .box-content {
      padding: 0;
      border-image: none;

      .add-product {
        button {
          width: 25rem;
          font-size: 2rem;
          font-weight: 500;
        }
      }

      .row {
        background-color: #f1f1f1;
        padding: 2rem 0;
        margin: 1rem 0;
        border-radius: 0.7rem;
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

      .cal-total {
        h4 {
          color: #ee4d2d;
        }
      }
      
      .detail {
        button {
          padding: .7rem 1.8rem;
          font-size: 1.7rem;
          cursor: pointer;
          color: #fff;
        }
      }
    }
  }
}

.action-row {
  padding-top: 30px;
  max-width: 100%;
  text-align: center;
  font-size: 2rem;

  .action-btn {
    width: 4rem;
    height: 4rem;
    border-radius: 4rem;
    color: white;

    i {
      color: #222831;
    }
  }

  button.highlight {
    color: #fff;
    background-color: #222831;
    border-radius: 2rem;
  }

  button {
    background-color: #fff;
    width: 4rem;
    height: 4rem;
    margin: 0rem 1rem;

    &:hover {
      cursor: pointer;
    }
  }
}




@media (max-width: 992px) {
  .product-manage {
    padding: 2rem 15%;
  }
}

@media (max-width: 767px) {
  .product-manage {
    padding: 2rem 10%;
  }
}

@media (max-width: 576px) {
  .product-manage {
    padding: 2rem 5%;
  }
}

@media (max-width: 400px) {
  .product-manage {
    .box {
      .box-content {
        .image-box {
          img {
            width: 6.5rem;
            height: 6.5rem;
            border-radius: 0.7rem;
          }
        }
      }
    }
  }
}
</style>