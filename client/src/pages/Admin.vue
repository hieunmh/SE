<template>
  <div class="admin">
    <div class="box">
      <div class="box-content">
        <div>
          <RouterLink to="admin/allorder"><button class="btnn">Đơn bán</button></RouterLink>
        </div>
        
        <div class="row bar">
          <div class="col-7">
            <h4 class="text-center">Thông tin sản phẩm</h4>
          </div>

          <div class="col-2">
            <h4 class="text-center">Đơn giá</h4>
          </div>


          <div class="col-3">
            <h4 class="text-center">chi tiết</h4>
          </div>
        </div>

      
        <div v-for="(p, index) in currentPage" :key="index" class="row">
          <div class="centre col-3 image-box" style="">
            <img :src="`${imgUrl}${p.image}`" alt="">
          </div>

          <div class="centre col-4 desc">
            <h4 class="item-name">{{ p.name }}</h4>
          </div>


          <div class="centre col-2 cal-total">
            <h4 class="item-total text-dark text-decoration-line-through" v-if="parseInt(p.price) != parseInt(p.salePrice)"> {{ p.price }}</h4>
            <h4 class="item-total">{{ parseInt(p.salePrice) }}</h4>
          </div>

          <div class="centre col-3 delete">
            <button class="btnn">xem</button>
          </div>
        </div>

        <div class="action-row">
          <button @click="previousToFirst()" class="action-btn decrease-btn">
            <i class="fa-solid fa-angles-left"></i>
          </button>

          <button  @click="previous()" class="action-btn decrease-btn">
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

export default {
  name: "Admin",

  data() {
    return {
      allOrder: [],
      OrderId: [],
      pageNum: 0,
      perPage: 6,
      imgUrl: serverUrl + "/upload/productImage/",
    }
  },

  methods: {
    ...mapMutations(['scrollToTop']),
    ...mapActions(['getAllOrder', 'getProducts']),


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
    ...mapState(['admin', 'allFoods']),

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
    this.getAllOrder();
    // this.getProducts();
  }
  
}
</script>

<style lang="scss" scoped>
.admin {
  padding: 2rem 20%;

  .box {
    margin: 0;
    width: 100%;
    margin-bottom: 20px;
    padding: 0;

    .box-content {
      padding: 0;
      border-image: none;

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
        color: #27ae60;
      }
    }
    button.highlight {
      color: #fff;
      background-color: #27ae60;
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
  .admin {
    padding: 2rem 15%;
  }
}

@media (max-width: 767px) {
  .admin {
    padding: 2rem 10%;
  }
}

@media (max-width: 576px) {
  .admin {
    padding: 2rem 5%;
  }
}

@media (max-width: 400px) {
  .admin {
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