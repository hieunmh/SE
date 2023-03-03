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
        </div>
         
        <div class="row filter-heading">
          <h1>Khoang gia</h1>
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
          <h1>Phan loai</h1>
        </div>

        <div class="row filter-section">
          <ul class="filter-option">
            <li>
              <input type="button" value="food" id="foodType" hidden>
              <label for="footType" class="d-flex justify-content-between">Do an<button class="unselect-btn">X</button></label>
            </li>

            <li>
              <input type="button" value="drink" id="drinkType" hidden>
              <label for="drinkType" class="d-flex justify-content-between">Do uong<button class="unselect-btn">X</button></label>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="col-sm-8">
        <div class="row">
          <div class="menu-tabs">
            <input type="button" name="allFood" id="allFood" value="Tat ca"  class="menu-tab-item">
            <input type="button" name="allFood" id="Banh ngot" value="Banh ngot"  class="menu-tab-item">
            <input type="button" name="allFood" id="Do an nhanh" value="Do an"  class="menu-tab-item">
            <input type="button" name="allFood" id="Ruou" value="Nuoc ngot"  class="menu-tab-item">
            <input type="button" name="allFood" id="Bia" value="Bia"  class="menu-tab-item">
            <input type="button" name="allFood" id="Ruou" value="Ruou"  class="menu-tab-item">
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

    };
  },
  methods: {

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
  // justify-content: center;
  position: relative;
  // display: flex;
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
      // display: inline-block;
      cursor: pointer;
      padding: 5px 30px;
      border-radius: 10rem;
      font-size: 20px;
      color: whitesmoke;
      font-weight: 500;
      text-transform: capitalize;
      transition: all 0.3s ease;
      margin: 0;
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

@media (min-width: 576px) {
  .filter-heading, .filter-section {
    display: block !important;
  }
}

@media (max-width: 576px) {
  .search-box, .filter-heading, .filter-section {
    width: auto;
  }
  .filter-option {
    width: 100%;
  }
  
}


</style>