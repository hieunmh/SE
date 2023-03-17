<template>
  <div class="menu">
    <div class="heading">
      <span>menu</span>
    </div>

    <div class="row">
      <div class="col-sm-4 col-12 filter-box">
        <div class="row search-box">
          <i class="fas fa-magnifying-glass"></i>
          <input type="text" class="search-input" placeholder=". . .">
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
          <div class="menu-tabs">
            <input type="button" name="allFood" id="allFood" value="Tất cả"  class="menu-tab-item">
            <input type="button" name="allFood" id="Banh ngot" value="Bánh"  class="menu-tab-item">
            <input type="button" name="allFood" id="Do an nhanh" value="Đồ ăn"  class="menu-tab-item">
            <input type="button" name="allFood" id="Ruou" value="Nước lọc"  class="menu-tab-item">
            <input type="button" name="allFood" id="Bia" value="Bia"  class="menu-tab-item">
            <input type="button" name="allFood" id="Ruou" value="Rượu"  class="menu-tab-item">
          </div>
        </div>

        <div class="row box-cotainer">
  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      showDropDown: false
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
    }
  },
  computed: {

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
  width: inherit;
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
    padding: 3px 0;
    &:hover {
      color: #fff;
      background-color: #f38609 !important;
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
    top: 13px;
    left: 1rem;
    font-size: 1.8rem;
    color: white;
  }
  .search-input {
    margin: 0;
    padding: 0 4rem;
    width: 100%;
    height: 40px;
    font-size: 20px;
    color: white;
    text-transform: none;
    background-color: #27ae60;
    border-radius: 1rem;
    &::placeholder {
      color: white;
    }
  }
}

.menu {
  padding: 2rem 9%;
  .menu-tabs {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    margin-bottom: 30px;
    flex: 0 0 100%;
    max-width: 100%;
    text-align: center;
    background-color: #27ae60;
    border-radius: 1rem;
    .menu-tab-item {
      cursor: pointer;
      padding: 5px 30px;
      border-radius: 10rem;
      font-size: 20px;
      color: whitesmoke;
      font-weight: 500;
      text-transform: capitalize;
      transition: all 0.3s ease;
      // margin: 0;
      &:hover {
        background-color: #f38609 !important;
      }
      p {
        padding: none;
        margin: none;
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
    color: #fff;
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