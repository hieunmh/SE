<template>
  <div class="footer">
    <div class="letter">
      <h3>Nhận thông báo sự kiện</h3>
      <form action="#">
        <input type="email" placeholder="Nhập mail của bạn">
        <input type="submit" name="" value="Gửi">
      </form>
    </div>

    <div class="box-container">
      <div class="box">
        <h3>Menu</h3>
        <RouterLink to="/menu"><i class="fas fa-arrow-right"></i>Bánh xèo</RouterLink>
        <RouterLink to="/menu"><i class="fas fa-arrow-right"></i>Bánh xèo</RouterLink>
        <RouterLink to="/menu"><i class="fas fa-arrow-right"></i> Salad</RouterLink>
        <RouterLink to="/menu"><i class="fas fa-arrow-right"></i> Salad</RouterLink>
        <RouterLink to="/menu"><i class="fas fa-arrow-right"></i> Seven up</RouterLink>
        <RouterLink to="/menu"><i class="fas fa-arrow-right"></i> Seven up</RouterLink>
      </div>

      <div class="box">
        <h3>Hieu dep trai</h3>
        <RouterLink to="/"><i class="fas fa-arrow-right"></i> Home</RouterLink>
        <!-- <RouterLink to="/about"><i class="fas fa-arrow-right"></i> About</RouterLink> -->
        <!-- <RouterLink to="/promotion"><i class="fas fa-arrow-right"></i> Promotions</RouterLink>  -->
        <RouterLink to="/menu"><i class="fas fa-arrow-right"></i> Menu</RouterLink>
        <RouterLink to="/table"><i class="fas fa-arrow-right"></i> Book table</RouterLink>
      </div>

      <div class="box">
        <h3>link</h3>
        <div v-if="user.userName">
          <RouterLink to="/cart"><i class="fas fa-arrow-right"></i> Giỏ hàng</RouterLink>
        </div>

        <div v-else>
          <RouterLink @click="scrollToTop()" to="/login"><i class="fas fa-arrow-right"></i> Đăng nhập</RouterLink>
          <RouterLink @click="scrollToTop()" to="/register"><i class="fas fa-arrow-right"></i> Đăng ký</RouterLink>
        </div>
      </div>

      <div class="box">
        <h3>Giờ mở cửa</h3>
        <p>Hằng ngày từ 7h đến 22h (kể cả thứ 7, CN trừ những ngày lễ)</p>
      </div>
    </div>

    <div class="bottom">
      <div class="share">
        <a href="https://facebook.com" class="fab fa-facebook"></a>
        <a href="https://www.instagram.com/" class="fab fa-instagram"></a>
        <a href="https://discord.com/" class="fab fa-discord"></a>
        <a href="https://twitter.com/" class="fab fa-twitter"></a>
        <a href="https://www.tiktok.com/" class="fab fa-tiktok"></a>
      </div>

      <div class="share">
        <div class="far fa-copyright"> Copyright by Nguyen Minh Hieu</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'Footer',
  methods: {
    ...mapMutations(['scrollToTop'])
  },
  computed: {
    ...mapState(['user'])
  }

}
</script>

<style lang="scss" scoped>
.footer {
  background-color: #f1f1f1;
  padding: 2rem 9%;
  .letter {
    text-align: center;
    margin-bottom: 2rem;
    h3 {
      font-size: 3rem;
      color: #130f40;
      padding-bottom: 1rem;
    }
    form {
      max-width: 70rem;
      margin: 1rem auto;
      display: flex;
      border-radius: 1.5rem;
      overflow: hidden;
      input[type="email"] {
        height: 100%;
        width: 100%;
        padding: 1rem 1.2rem;
        font-size: 1.5rem;
        color: #130f40;
        text-transform: none;
      }
      input[type="submit"] {
        padding: 0 2rem;
        font-size: 1.5rem;
        color: #fff;
        background: #27ae60;
        cursor: pointer;
        &:hover {
          background-color: #f38609;
        }
      }
    }
  }
  .box-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 1.5rem;
    .box {
      h3 {
        font-size:  2rem;
        color: #130f40;
        padding: 1rem 0;
      }
      p {
        font-size: 1.5rem;
        color: #666;
        padding: 1rem 0;
      }
      a {
        display: block;
        font-size: 1.5rem;
        color: #666;
        padding: 1rem 0;
        &:hover {
          color: #27ae60;
          i {
            padding-right: 2rem;
          }
        }
        i {
          padding-right: 0.5rem;
          color: #27ae60;
        }
      }
    }
  }
  .bottom {
    padding-top: 1rem;
    text-align: center;
    .share {
      margin: 1.5rem 0;
      a {
        height: 4.5rem;
        width: 4.5rem;
        line-height: 4.5rem;
        font-size: 2rem;
        border-radius: 1rem;
        margin: 0.3rem;
        color: #fff;
        background-color: #27ae60;
        &:hover {
          background: #f38609;
        }
      }
    }
  }
}

</style>