<template>
  <div class="shopping-cart">

    <div class="heading">
      <span>Giỏ hàng</span>
      <h3>Free ship trong vòng bán kính 5km</h3>
    </div>

    <div class="container">
      <div class="wrapper wrapper-content">
        <div class="row">
          <div class="in-cart col-md-9">
            <div class="box">
              <div class="box-title item-total row">
                <h3>
                  <p style="font-size: 2rem;">{{ filterFoods.length.toString() }}
                    <span v-if="filterFoods.length < 2">sản phẩm</span>
                    <span v-else>sản phẩm</span> trong giỏ hàng
                  </p>
                </h3>
              </div>

              <div v-if="!filterFoods.length">
                <div class="box-content row no-food">
                  <div class="content">
                    <h2 style="color: #057835fa;">Bạn không có sản phẩm nào trong giỏ hàng, đến menu để mua hàng!</h2>
                  </div>

                  <div class="image">
                    <img src="../assets/images/notfound.png" alt="">
                  </div>
                </div>
              </div>

              <div v-else>
                <div v-for="(f, index) in filterFoods" :key="index">
                  <div class="box-content row">
                    <div class="image-box col-sm-3" style="padding-left: 0;">
                      <img src="../assets/images/banhxeo.png" alt="" class="cart-product-img">
                      <!-- link anh thi vut day -->
                    </div>
                    
                    <div class="desc col-sm-4">
                      <h2 class="item-name">{{ f.food_name }}</h2>

                      <div class="item-desc">
                        <b>Mô tả</b>
                        <p>{{ f.food_desc }}</p>
                      </div>

                      <button class="btnn remove-btn"><i class="fa fa-trash"></i>Xóa sản phẩm</button>
                    </div>  
                    
                    <div class="item-price col-sm-1">
                      <span class="sale-price">${{ parseFloat(f.food_price) - parseFloat(f.food_discount) }}</span>
                      <p class="text-muted first-price" v-if="parseFloat(f.food_discount) != 0.00">{{ parseFloat(f.food_price) }}</p>
                    </div>

                    <div class="item-qtt col-sm-2 d-inline">
                      <label for="iQuantity" style="font-size: 12px; padding-right: 2px;">Số Lượng</label>
                      <input type="number" id="iQuantity" class="form-control item-quantity"
                      :value="itemQuantity[index]" min="1" max="100"
                      @change="" >
                    </div>

                    <div class="cal-total col-sm-2">
                      <h4 class="item-total"> {{  }} VND</h4>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

            <div class="box-content row">
              <RouterLink to="/menu" class="btnn shop-btn" style="margin-bottom: 10px; text-align: center;"><i class="fa fa-arrow-left"></i> Tiếp tục mua</RouterLink>
              <button class="btnn checkout-btn" style=""
               :disabled="filterFoods.length ? false : true"><i class="fa fa-shopping-cart"></i> Thanh toán</button>
            </div>
          </div>

          <div class="col-md-3">
            <div class="box">
              <div class="box-title">
                <h3>Hóa Đơn</h3>
              </div>

              <div class="box-content pay">
                <span>Giá trị sản phẩm</span>
                <h3 class="font-bold total-first-price">{{  }}</h3>

                <span>Giảm giá</span>
                <h3 class="font-bold total-discount">{{ }}</h3>

                <span>Phí vận chuyển</span>
                <h3 class="font-bold total-delivery">{{  }}</h3>

                <span>Tổng giá trị đơn hàng</span>
                <h2 class="font-bold total-sale">{{ }}</h2>

                <div class="btn-group">
                  <button class="btnn  checkout-btn" 
                    :disabled="filterFoods.length ? false : true">
                    <i class="fa fa-shopping-cart"></i>
                    Thanh toán
                  </button>
                  <button class="btnn cancel-btn" 
                    :disabled="filterFoods.length ? false : true">
                    Hủy
                  </button>
                </div>
              </div>
            </div>

            <div class="box">
              <div class="box-title">
                <h3>Đường dây nóng</h3>
              </div>

              <div class="box-content pay text-center">
                <h3><i class="fa fa-phone"> 091 511 57 01</i></h3>
                <span class="small">Liên hệ với chúng tôi nếu bạn có câu hỏi. Chúng tôi luôn có mặt 24/24</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Cart',
  data() {
    return {
      cartItem: [],
      itemQuantity: []
    }
  },
  methods: {
    matchID(food, cartArray) {
      let temp = '';
      cartArray.forEach(element => {
        if (parseInt(food.food_id) == element) {
          temp = food;
        }
      });
      return temp; 
    }
  },
  computed: {
    ...mapState(['user', 'allFoods']),

    filterFoods() {
      return this.allFoods.filter(f => this.matchID(f, this.cartItem));
    }

  }

}
</script>

<style lang="scss">

.item-name {
  color: #27ae60;
}

.box .box-content.pay {
  span {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 2em;
  }
}


.cart-product-img {
  text-align: center;
  width: 100%;
  height: 125px;
  object-fit: cover;
  background-color: #f7f7f7;
}

.shopping-cart {
  background: #fff;
}

.box {
  clear: both;
  margin: 0;
  margin-bottom: 20px;
  padding: 0;
  &::after {
    display: table;
  }
  &::before {
    display: table;
  }
  .box-title {
    background-color: inherit;
    border-color: #e7eaec;
    border-width: 3px 0 0;
    color: inherit;
    margin-bottom: 0;
    margin-bottom: 0;
    padding: 14px 15px 7px;
    min-height: 78px;
    h3 {
      font-size: 2rem;
    }
  }
  .box-content {
    background-color: inherit;
    color: inherit;
    padding: 15px 20px 20px 20px;
    border-color: #e7eaec;
    border-image: none;
    border-style: solid solid none;
    border-width: 3px 0;
    .btn-group {
      .cancel-btn {
        margin-left: 10px;
      }
    }
    
  }
}

.box-content button i, .box-content a i {
  padding-right: 5px;
}

.item-desc {
  b {
    font-size: 12px;
  }
  p {
    font-size: 10px;
  }
}

.sale-price, .first-price, .item-quantity {
  width: 60px;
  height: 15px;
} 

.item-quantity {
  text-decoration: line-through;
}

.remove-btn {
  font-size: 10px;
  padding: 5px;
  margin-top: 27px;
  i {
    padding-right: 5px;
  }
}

.no-food {
  text-align: center;
  justify-content: center;
  display: block;
  img {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .box-content {
    .item-name {
      font-size: 14px;  
    }
    .btn-group {
      display: block;
      button {
        border-radius: 0.5rem !important;
        i {
          margin-top: 3px;
        }
      }
      .checkout-btn {
        display: flex;
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
  }

  .desc button {
    position: absolute;
    bottom: 0;
  }

    .box .box-content .btn-group .cancel-btn {
      margin-left: 0;
    }
}

@media (max-width: 576px) {
  .box-title {
    min-height: 48px;
  }

  .box .box-content .btn-group .cancel-btn {
    margin-left: 0;
  }

  .box-title.item-total {
    border: none;
  }

  .in-cart .box-content {
    color: white;
    border: none;
    display: flex;
    margin-left: 2rem;
    margin-right: 2rem;
    .btn-group {
      margin-top: 5px;
      display: inline-flex;
      .checkout-btn {
        display: flex;
        margin-top: 0px;
        margin-right: 5px;
        margin-bottom: 0px;
      }
    }
  }

  .image-box {
    position: absolute;
    opacity: 0.8;
    max-width: 100%;
    width: 100%;
    max-height: 100%;
    filter: brightness(60%);
    padding: none;
    img {
      border-radius: 15px;
    }
  }

  .desc {
    .item-name {
      font-size: 16px;
      filter: brightness(160%);
    }
    b {
      font-size: 10px;
    }
    p {
      font-size: 12px;
    }
    .remove-btn {
      font-size: 10px;
      position: relative;
    }
  }

  .item-price {
    position: absolute;
    margin-top: 55px;
    .first-price {
      display: inline;
      padding-left: 5px;
      color: red !important;
    }
  }

  .item-quantity {
    position: absolute;
    margin-top: 55px;
    padding-left: 160px;
  }

  .cal-total {
    display: none;
  }

  .in-cart .box-content .checkout-btn {
    display: none;
  }

}



</style>