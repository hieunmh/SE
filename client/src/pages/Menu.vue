<template>
  <div>
    <LoadingSearch v-if="!showSearchLoading"></LoadingSearch>
  </div>

  <div class="menu" @click.self="">
    <div class="row">      
      <div class="col-12">
        <div class="row menu-tabs">
          <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-6" @click="filterProduct($event)" id="0" value="Tất cả">
          <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-6" @click="filterProduct($event)" id="1" value="Mì phở">
          <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-6" @click="filterProduct($event)" id="2" value="Cơm hộp">
          <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-6" @click="filterProduct($event)" id="3" value="Bánh">
          <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-6" @click="filterProduct($event)" id="4" value="Trà sữa">
          <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-6" @click="filterProduct($event)" id="5" value="Cà phê">
        </div>

        <div class="row priceFilter">
          <input type="text" class="filter-item col-sm-4 col-6" v-model="priceRangeFrom" placeholder="Từ VNĐ" @keypress.enter="filterPriceRange()" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
          <input type="text" class="filter-item col-sm-4 col-6" v-model="priceRangeTo" placeholder="Đến VNĐ" @keypress.enter="filterPriceRange()" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
          <input type="button" class="filter-item col-sm-2 col-6" @click="filterPriceRange()" value="Áp dụng" >
          <input type="button" class="filter-item col-sm-2 col-6" @click="deletePriceRange()" value="Xóa lọc">
        </div>

        <div class="row box-container">
          <div v-for="(p, index) in currentPage" :key="index" class="col-lg-3 col-md-4 col-6">
            <div class="box" @click="showDetail(index)">
              <div class="image">
                <img :src="`${imgUrl}${p.image}`" alt="">
              </div>

              <div class="content">
                <h3>{{ p.name }}</h3>

                <div class="price">
                  {{ parseFloat(p.price) }} VNĐ
                  <span></span>
                </div>
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
import { mapMutations, mapState } from 'vuex';
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
      prevCategoryClicked: "",
      imgUrl: serverUrl + "/upload/productImage/",
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
      if (this.productObj.category != event.target.id && this.prevCategoryClicked != "") {
        this.prevCategoryClicked.target.style.background = "#27ae60";
      }
      this.productObj.category = event.target.id; 
      this.prevCategoryClicked = event;
      event.target.style.background = "#057835fa";
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

.unselect-btn {
  background: transparent;
  padding-right: 10px;  
  cursor: pointer;
  color: inherit;
  display: none;
}

.filter-section {
  width: 100%;
}

.filter-heading {
  padding-top: 25px;
  text-align: center;
  h1 {
    color: #27ae60;
  }
}

.filter-option {
  list-style-type: none;
  width: 100%;
  padding: 0;
  input {
    background-color: #fff;
    height: 3.5rem;
    width: 100%;
    // margin-left: 3rem;
    border-radius: 1rem;
    padding: 1.5rem;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  button {
    width: 100%;
    background-color: #f38609;
    &:hover {
      background-color: #ee4d2d;
    }
  }
  label {
    width: 100%;
    height: 4rem;
    font-size: 1.5rem;
    padding: 1rem 0;
    border-radius: 1rem;
    text-align: center;
    &:hover {
      color: #fff;
      background-color: #f38609 !important;
      border-radius: 1rem;
      transition: all 0.5s ease;
    }
  }
}

.search-box {
  width: 100%;  
  position: relative;
  margin: 0;
  margin-bottom: 1rem;
  i {
    position: absolute;
    width: 3.2rem;
    border-top: 5px solid #27ae60;
    border-bottom: 5px solid #27ae60;
    border-radius: 8px;
    top: 0.6rem;
    left: 0.7rem;
    font-size: 1.8rem;
    background-color: #27ae60;
    color: white;
  }
  .search-input {
    padding-left: 4.5rem;
    width: 100%;
    height: 4rem;
    font-size: 15px;
    color: #27ae60;
    text-transform: none;
    background-color: #fff;
    border: 2px solid #27ae60;
    border-radius: 1rem;
    &::placeholder {
      color: #27ae60;
    }
  }
  .filter-dropdown {
    display: block;
    border-radius: 1rem;
    background-color: #27ae60;
    color: #27ae60;
    font-weight: 400;
    margin-bottom: 0rem;
    position: relative;
    div {
      position: absolute;
      top: -3rem;
      right: 1rem;
      width: 2.5rem;
      height: 2.5rem;
      font-size:2rem;
    }
  }
}

.menu {
  padding: 2rem 20%;
  // background-color: #fff;
  .filter-box {
    .filter {
      width: 100%;
      border-radius: 1rem;
      color: white;
      background-color: rgba($color: #27ae60, $alpha: 1);
      position: absolute;
      top: 4.5rem;
      z-index: 2; 
    }
  }

  .priceFilter {
    background-color: #27ae60;
    margin: 0;
    margin-bottom: 2rem;
    // flex: 0 0 100%;
    max-width: 100%;
    text-align: center;
    .filter-item {
      padding: 0.8rem 1rem;
      border: 5px solid #27ae60;
      font-size: 1.7rem;
      color: #27ae60;
      &:nth-child(1) {
        border-right: none;
      }
      &::placeholder {
        color: rgba($color: #27ae60, $alpha: 1.0);
        // text-align: center;
      }
    }
    input[type = "button"] {
      background-color: #27ae60;
      color: #fff;
      font-weight: 500;
      &:hover {
        background-color: #f38609;
        border-color: #f38609;
      }
    }
  }
  
  .menu-tabs {
    margin: 0;
    margin-bottom: 1rem;
    flex: 0 0 100%;
    max-width: 100%;
    text-align: center;
    background-color: #27ae60;
    // border-radius: 1rem;
    .menu-tab-item {
      cursor: pointer;
      padding: 0.8rem 0;
      // border-radius: 1rem;
      font-size: 1.7rem;
      color: whitesmoke;
      font-weight: 500;
      text-transform: capitalize;
      transition: all 0.3s ease;
      &:hover {
        background-color: #f38609 !important;
      }
      p {
        padding: none;
        margin: none;
      }
    }
  }

  .box-container {
    padding: 0;
    .box {
      margin: 0.7rem 0;
      position: relative;
      background-color: #d9d9d9;
      text-align: center;
      &:hover {
        box-shadow: 0px 5px 5px rgba($color: #000000, $alpha: 0.3);
      }
      .image {
        img {
          width: 100%;
          // border-radius: 1rem;
        }
      }

      .content {
        h3 {
          font-size: 1.8rem;
          height: 4rem;
          color: #000;
          margin: 0 1rem;
          margin-top: 1rem;
        }
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

  .search-box {
    i {
      top: 0.5rem;
      left: 0.5rem;
    }
  }
  .search-box, .filter-heading, .filter-section {
    width: auto;
  }
  .filter-option {
    width: 100%;
  }
  
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