<template>
  <div class="menu">
    <div class="heading">
      <span>menu</span>
    </div>

    <div class="row">
      <div class="col-sm-4 col-12 filter-box">
        <div class="row search-box">
          <i class="fa-solid fa-magnifying-glass" @click=""></i>
          <input type="text" class="search-input" v-model="productObj.name" placeholder="Tìm kiếm . . .">
          <div class="row filter-dropdown" @click="displayFilter()">
            <div class="fa-solid fa-caret-down dropDown"></div>
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

        <hr/>

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
      
      <div class="col-sm-8">
        <div class="row">
          <div class="menu-tabs ">
            <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-sm-6" @click="filterProduct($event)" name="allFood" value="Tất cả">
            <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-sm-6" @click="filterProduct($event)" name="allFood" value="Bánh">
            <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-sm-6" @click="filterProduct($event)" name="allFood" value="Đồ ăn">
            <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-sm-6" @click="filterProduct($event)" name="allFood" value="Nước">
            <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-sm-6" @click="filterProduct($event)" name="allFood" value="Bia">
            <input type="button" class="menu-tab-item  col-lg-2 col-md-4 col-sm-6" @click="filterProduct($event)" name="allFood" value="Rượu">
          </div>
        </div>

        <div class="row box-container">
          <div v-for="(p, index) in currentPage" :key="index" class="col-lg-4 col-md-6 col-sm-12">
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
                  <button class="btnn" @click="">Thêm vào giỏ hàng</button>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import serverUrl from '@/axios';
import filterVN from '@/filterVN';

export default {
  name: "Menu",
  data() {
    return {
      showDropDown: false,
      pageNum: 0,
      perPage: 9,
      prevCategoryClicked: "",
      productObj: {name: "", category: "", price: "", type: ""},
      imgUrl: serverUrl + "/upload/productImage/"
    };
  },

  methods: {

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
hr {
  border-top: 3px solid #057835fa;
  width: 100%;
}
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
}

.menu {
  padding: 2rem 9%;
  background-color: #f2f2f2;
  .menu-tabs {
    margin-bottom: 30px;
    flex: 0 0 100%;
    max-width: 100%;
    text-align: center;
    background-color: #27ae60;
    border-radius: 1rem;
    .menu-tab-item {
      cursor: pointer;
      padding: 5px 30px;
      border-radius: 1rem;
      font-size: 20px;
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
    .box {
      border-radius: 1rem;
      position: relative;
      background-color: #fff;
      padding: 10px;
      text-align: center;
      &:hover {
        box-shadow: 10px 10px 10px rgba($color: #000000, $alpha: 0.2), -10px -10px 10px rgba($color: #000000, $alpha: 0.2) ;
      }
      .image {
        // margin: 1rem 0;
        width: 100%;
        img {
          width: 100%;
        }
      }

      .content {
        h3 {
          font-size: 2rem;
          height: 5rem;
          color: #130f40;
        }
        .price  {
          font-size: 2rem;
          color: #130f40;
        }
      }
    }
  }
  .action-row {
    padding-top: 30px;
    width: 100%;
    text-align: center;
    font-size: 2.5rem;
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

.filter-dropdown {
  display: none;
}

@media (min-width: 576px) {
  .filter-heading, .filter-section {
    display: block !important;
  }
}

@media (max-width: 575px) {
  .search-box, .filter-heading, .filter-section {
    width: auto;
  }
  .filter-heading, .filter-section {
    display: none;
  }
  .filter-heading.active, .filter-section.active  {
    display: block;
    
  }
  .filter-option {
    width: 100%;
  }
  .filter-dropdown {
    display: block;
    border-radius: 1rem;
    background-color: #27ae60;
    color: #27ae60;
    font-weight: 400;
    margin-bottom: 15px;
    position: relative;
    div {
      position: absolute;
      top: -3.7rem;
      right: 1rem;
      width: 2.5rem;
      height: 2.5rem;
      font-size:2.5rem;
    }
    div.active {
      transform: rotateX(180deg);
    }
  }
}

@media (max-width: 324px) {
  .menu .menu-tabs .menu-tab-item {
    font-size: 1.8rem;
  }
}


</style>