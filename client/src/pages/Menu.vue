<template>
  <div class="menu">
    <div class="heading">
      <span>menu</span>
    </div>

    <div class="row">
      <div class="col-12 filter-box">
        <div class="row search-box">
          <i class="fa-solid fa-magnifying-glass" @click=""></i>
          <input type="text" class="search-input" v-model="productObj.name" placeholder="Tìm kiếm . . .">
          <div class="row filter-dropdown" @click="displayFilter()">
            <div class="fa fa-sliders dropDown"></div>
          </div>
        </div>
         
        <div class="row filter-heading">
          <h1>Khoảng giá</h1>
        </div>

        <div class="row filter-section">
          <ul class="filter-option">
            <li>
              <input type="button" value="50k" id="50k" hidden>
              <label for="50k" class="d-flex justify-content-between">{{ "<" }} 50k<button class="unselect-btn">X</button></label>
            </li>

            <li>
              <input type="button" value="50k_200K" id="50_200k" hidden>
              <label for="50_200k" class="d-flex justify-content-between">50k - 200k<button class="unselect-btn">X</button></label>
            </li>
          </ul>
        </div>


        <div class="row filter-heading"> 
          <h1>Phân loại</h1>
        </div>

        <div class="row filter-section">
          <ul class="filter-option">
            <li>
              <input type="button" value="food" id="foodType" hidden>
              <label for="footType" class="d-flex justify-content-between">Đồ ăn<button class="unselect-btn">X</button></label>
            </li>

            <li>
              <input type="button" value="drink" id="drinkType" hidden>
              <label for="drinkType" class="d-flex justify-content-between">Đồ uống<button class="unselect-btn">X</button></label>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="col-12">
        <div class="row menu-tabs">
          <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-6" @click="filterProduct($event)" name="allFood" value="Tất cả">
          <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-6" @click="filterProduct($event)" name="allFood" value="Mì phở">
          <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-6" @click="filterProduct($event)" name="allFood" value="Cơm hộp">
          <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-6" @click="filterProduct($event)" name="allFood" value="Bánh Mì">
          <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-6" @click="filterProduct($event)" name="allFood" value="Bia">
          <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-6" @click="filterProduct($event)" name="allFood" value="Trà sữa">
        </div>

        <div class="row box-container">
          <div v-for="(p, index) in currentPage" :key="index" class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
            <div class="box">
              <div class="image">
                <img :src="`${p.image}`" alt="">
                <!-- <img :src="`${imgUrl}${p.image}`" alt=""> -->
              </div>

              <div class="content">
                <h3>{{ p.name }}</h3>

                <div class="price">
                  {{ parseFloat(p.price) }} VND
                  <span></span>
                </div>

                <button class="btnn" @click=""><i class="fa-solid fa-cart-plus"></i>  Thêm vào giỏ hàng</button>
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
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import serverUrl from '@/axios';
import filterVN from '@/filterVN';

export default {
  name: "Menu",
  data() {
    return {
      showDropDown: false,
      pageNum: 0,
      perPage: 12,
      prevCategoryClicked: "",
      productObj: {name: "", category: "", price: "", type: ""},
      imgUrl: serverUrl + "/upload/productImage/"
    };
  },

  methods: {
    ...mapMutations(['scrollToTop']),

      displayFilter() {
      let div1 = document.querySelectorAll('.filter-heading');
      let div2 = document.querySelectorAll('.filter-section');
      let dropdown = document.querySelector('.dropDown');
      
      for (let i = 0; i < div1.length; i++) {
        div1[i].classList.toggle('active');
        div2[i].classList.toggle('active');
      }
      dropdown.classList.toggle('active')
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
    },

    nextToLast() {
      this.pageNum = this.calculatePages - 1;
      this.scrollToTop();
    },

    filterProduct(event) {
      this.pageNum = 0;
      if (this.productObj.category != event.target.value && this.prevCategoryClicked != "") {
        this.prevCategoryClicked.target.style.background = "#27ae60";
      }
      this.productObj.category = event.target.value;
      console.log(this.productObj.category);
      this.prevCategoryClicked = event;
      event.target.style.background = "#057835fa";
    }
  },

  computed: {
    ...mapState(['allFoods']),
    
    filterFoods() {
      this.pageNum = 0;
      return this.allFoods.filter((p) => filterVN(p.name).toLowerCase().match(filterVN(this.productObj.name).toLowerCase()) 
      && (this.productObj.category.toLowerCase() == "tất cả" || this.productObj.category == ""));
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
  h1 {
    color: #27ae60;
  }
}

.filter-option {
  list-style-type: none;
  width: inherit;
  label {
    width: 100%;
    font-size: 15px;
    padding: 5px 0;
    padding-left: 1rem;
    border-radius: 1rem;
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
  margin-bottom: 15px;
  i {
    position: absolute;
    width: 3.2rem;
    border-top: 5px solid #27ae60;
    border-bottom: 5px solid #27ae60;
    border-radius: 8px;
    top: 15%;
    left: 0.7rem;
    font-size: 1.8rem;
    background-color: #27ae60;
    color: white;
  }
  .search-input {
    padding-left: 4.5rem;
    width: 100%;
    height: 40px;
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
  
  .menu-tabs {
    margin: 0;
    margin-bottom: 2rem;
    flex: 0 0 100%;
    max-width: 100%;
    text-align: center;
    background-color: #27ae60;
    border-radius: 1rem;
    .menu-tab-item {
      cursor: pointer;
      padding: 0.8rem 0;
      border-radius: 1rem;
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
      border-radius: 1rem;
      position: relative;
      background-color: #f2f2f2;
      text-align: center;
      &:hover {
        box-shadow: 0px 5px 5px rgba($color: #000000, $alpha: 0.3);
      }
      .image {
        img {
          width: 100%;
          border-radius: 1rem;
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
        margin: 0rem 2rem;
      &:hover {
        cursor: pointer;
      }
    }
  }
}

.filter-heading, .filter-section {
  display: none;
}

.filter-heading.active, .filter-section.active  {
  display: block;
  
}

@media (max-width: 575px) {
  .search-box, .filter-heading, .filter-section {
    width: auto;
  }
  .filter-option {
    width: 100%;
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