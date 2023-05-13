<template>
  <div>
    <LoadingSearch v-if="!showSearchLoading"></LoadingSearch>
  </div>

  <div class="menu" @click.self="">
    <div class="row">      
      <div class="col-12">
        <div class="menu-tabs">
          <input type="button" class="menu-tab-item active" @click="filterProduct($event)" id="0" value="Tất cả">
          <input type="button" class="menu-tab-item" @click="filterProduct($event)" v-for="(cate, index) in category" :key="index" :id="`${cate.id}`" :value="`${cate.name}`">
        </div>

        <div class="row priceFilter">
          <input type="text" class="filter-item col-lg-4 col-md-3 col-6 fw-bold" v-model="priceRangeFrom" placeholder="&#8363; Từ" @keypress.enter="filterPriceRange()" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
          <input type="text" class="filter-item col-lg-4 col-md-3 col-6 fw-bold" v-model="priceRangeTo" placeholder="&#8363; Đến" @keypress.enter="filterPriceRange()" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
          <input type="button" class="filter-item col-lg-2 col-md-3 col-6 fw-bold" @click="filterPriceRange()" value="Áp dụng" >
          <input type="button" class="filter-item col-lg-2 col-md-3 col-6 fw-bold" @click="deletePriceRange()" value="Xóa lọc">
        </div>

        <div class="row box-container">
          <div v-for="(p, index) in currentPage" :key="index" class="col-xl-3 col-md-4 col-6">
            <div class="box" @click="showDetail(index)">
              <div class="image">
                <img :src="`${imgUrl}${p.image}`" alt="">
              </div>

              <div class="content">
                <h3 class="fw-bold" style="height: 5rem; padding-top: 2rem;">{{ p.name }}</h3>

                <div v-if="parseInt(p.salePrice) != p.price" class="price fw-bold pt-3 row">
                  <h3 class="col-6 text-center d-flex justify-content-end text-decoration-line-through text-secondary">{{ parseFloat(p.price).toLocaleString("it-IT", { style: "currency", currency: "VND" }).slice(0, -3) }}&#8363;</h3>
                  <h3 class="col-6 text-center d-flex justify-content-start">{{ parseFloat(p.salePrice).toLocaleString("it-IT", { style: "currency", currency: "VND" }).slice(0, -3) }}&#8363;</h3>
                </div>

                <div v-else class="price fw-bold pt-3 row">
                  <h3 class="col-12 text-center">{{ parseFloat(p.price).toLocaleString("it-IT", { style: "currency", currency: "VND" }).slice(0, -3) }}&#8363;</h3>
                </div>

                <h4 class="text-dark" style="height: 4rem; font-weight: 500;">Đã bán {{ p.sold_number }}</h4>
              </div>

              <div class="salePercent" v-if="p.discount.name !='NONE'">
                <h4 class="m-0"><i class="fa-solid fa-tag"></i> {{ p.discount.name }}</h4>
              </div>
            </div>
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

    <ProductDetail v-if="showProduct" :product="addId" />

  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import serverUrl from '@/axios';
import filterVN from '@/filterVN';
import ProductDetail from '../components/ProductDetail.vue';
import LoadingSearch from '@/components/LoadingSearch.vue';
import Loading from '@/components/Loading.vue';


export default {
  name: "Menu",
  components: {
    ProductDetail,
    LoadingSearch ,
    Loading
},
  data() {
    return {
      addId: [],

      pageNum: 0,
      perPage: 12 ,
      imgUrl: serverUrl,
      priceRange: {
        from: "",
        to: "",
      },
      priceRangeFrom: "",
      priceRangeTo: "",
    };
  },

  methods: {
    ...mapMutations(['scrollToTop', 'setShowProduct', 'setShowSearchLoading']),
    ...mapActions(['getCategory', 'getProducts']),

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

    filterProduct(event) {
      this.pageNum = 0;
      let menu_tab = document.querySelectorAll('.menu-tab-item');
      for (let i = 0; i < menu_tab.length; i++) {
        menu_tab[i].classList.remove('active')
      }
      event.target.classList.add('active')
      this.productObj.category = event.target.id; 
      // event.target.style.background = "#e69c00";
    },

    async filterPriceRange() {
      await new Promise(() => setTimeout(() => {
        this.setShowSearchLoading(true);
        this.priceRange.from = this.priceRangeFrom;
        this.priceRange.to = this.priceRangeTo;
      }, 1000)).then(
        this.setShowSearchLoading(false),
      )
    },

    async deletePriceRange() {
      await new Promise(() => setTimeout(() => {
        this.setShowSearchLoading(true);
      }, 1000)).then(
        this.setShowSearchLoading(false),
        this.priceRangeFrom = "",
        this.priceRangeTo = "",
        this.priceRange.from = "",
        this.priceRange.to = "",
      )
      
    },

    showDetail(index) {
      this.addId = this.currentPage[index];
      this.setShowProduct(true);
    },

    closeDetail() {
      this.showProductDetail = !this.showProductDetail;
    }
  },

  computed: {
    ...mapState(['allFoods', 'showProduct', 'category', 'productObj', 'showLoading', 'user', 'showSearchLoading']),
    
    filterFoods() {
      this.pageNum = 0;
      if (!this.priceRange.from && !this.priceRange.to) {
        return this.allFoods.filter((p) => filterVN(p.name).toLowerCase().match(filterVN(this.productObj.name).toLowerCase())
          && ((this.productObj.category == 0 || this.productObj.category == "" || parseInt(this.productObj.category.toLowerCase()) == p.category_id)));
      }
      else if (this.priceRange.from && !this.priceRange.to) {
        return this.allFoods.filter((p) => filterVN(p.name).toLowerCase().match(filterVN(this.productObj.name).toLowerCase())
          && ((this.productObj.category == 0 || this.productObj.category == "" || parseInt(this.productObj.category.toLowerCase()) == p.category_id) ) && parseInt(p.price) >= parseInt(this.priceRange.from));
      }
      else if (!this.priceRange.from && this.priceRange.to) {
        return this.allFoods.filter((p) => filterVN(p.name).toLowerCase().match(filterVN(this.productObj.name).toLowerCase())
          && ((this.productObj.category == 0 || this.productObj.category == "" || parseInt(this.productObj.category.toLowerCase()) == p.category_id)) && parseInt(p.price) <= parseInt(this.priceRange.to));
      }
      else {  
        return this.allFoods.filter((p) => filterVN(p.name).toLowerCase().match(filterVN(this.productObj.name).toLowerCase())
          && ((this.productObj.category.toLowerCase() == 0 || this.productObj.c || parseInt(this.productObj.category.toLowerCase()) == p.category_id)) 
          && (parseInt(p.price) >= parseInt(this.priceRange.from) && parseInt(p.price) <= parseInt(this.priceRange.to)));
      }
      
    },

    currentPage() {
      return this.filterFoods.slice(this.pageNum * this.perPage, this.pageNum * this.perPage + this.perPage);
    },

    calculatePages() {
      if (this.filterFoods.length % this.perPage != 0) {
        return Math.floor((this.filterFoods.length) / this.perPage) + 1;
      }
      else { 
        return this.filterFoods.length / this.perPage;
      }
    },
  },

  created() {
    this.getCategory();
    this.productObj.category = ""
    // this.getProducts();
  }
}
</script>

<style lang="scss" scoped>
input[type="button"] {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

.menu {
  padding: 2rem 20%;
  // background-color: #fff;
  

  .priceFilter {
    background-color: #222831;
    margin: 0;
    margin-bottom: 2rem;
    max-width: 100%;
    border-radius: 0.7rem;
    text-align: center;
    .filter-item {
      padding: 0.5rem 1rem;
      border: 5px solid #222831;
      border-radius: 0.7rem;
      font-size: 1.5rem;
      color: #222831;
      &:nth-child(1) {
        border-right: none;
      }
      &::placeholder {
        color: rgba($color: #222831, $alpha: 1.0);
        // text-align: center;
      }
    }
    input[type = "button"] {
      background-color: #222831;
      color: #fff;
      &:hover {
        background-color: #ffa31a;
        border-color: #ffa31a;
      }
    }
  }
  
  .menu-tabs {
    // margin: 0;
    margin-bottom: 1rem;
    // max-width: 100%;
    text-align: center;
    // background-color: #222831;
    border-radius: 0.7rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-around;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
    list-style-type: none;
    .menu-tab-item {
      cursor: pointer;
      padding: 1rem 3rem;
      border-radius: 3rem;
      font-size: 1.7rem;
      color: #000;
      font-weight: 500;
      text-transform: capitalize;
      transition: all 0.3s ease;
      // background-color: #222831;
      
      p {
        padding: none;
        margin: none;
      }
    }
    
    .menu-tab-item.active {
      background-color: #ffa31a;
      color: #fff;
    }
  }

  .box-container {
    // .col-xl-3ms {
    //   width: 20%;
    // }
    padding: 0;
    .box {
      position: relative;
      border-radius: 0.7rem;
      margin: 0.7rem 0;
      height: 95%;
      position: relative;
      background-color: #d9d9d9;
      text-align: center;
      &:hover {
        box-shadow: 0px 5px 5px rgba($color: #000000, $alpha: 0.3);
      }
      .salePercent {
        position: absolute;
        top: 0rem;
        right: 0rem;
        padding: 1rem 1rem;
        background-color: #ffa31a;
        color: #fff;
        border-radius: 0 0.7rem 0 0.7rem;
        h4 {
          font-size: 2rem;
        }
        // i {
        //   font-size: 2rem;
        // }
      }
      .image {
        img {
          width: 100%;
          border-radius: 0.7rem;
        }
      }

      .content {
        // background: linear-gradient(to bottom, #f1f2f3 25px, #222831 25px);
        .price  {
          font-size: 1.8rem;
          color: #ee4d2d;
          // padding: 0 2rem;
          padding-bottom: 1rem;
        }
        button {
          margin: 0 1rem;
          margin-bottom: 1rem;
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
}

@media (max-width: 992px)  {
  .menu {
    padding: 2rem 15%;
  }
}

@media (max-width: 767px) {
  .menu {
    padding: 2rem 10%;
  }
}

@media (max-width: 575px) {  
  .menu {
    padding: 2rem 5%;
  }
  .menu .action-row {
    font-size: 1.5rem;
    .action-btn {
      width: 3rem;
      height: 3rem;
      border-radius: 3rem;
    }
    button {
      width: 3rem;
      height: 3rem;
      margin: 0rem 2rem;
      &:hover {
        cursor: pointer;
      }
    }
  }
}

@media (max-width: 324px) {
  .menu .menu-tabs .menu-tab-item {
    text-align: center;
    padding: auto auto;
    font-size: 1.4rem;
  }
}


</style>