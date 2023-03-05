<template>
  <div class = "register">
    <div class = "register-form">
      <form action="">
        <h3>Tao tai khoan</h3>

        <div class = "form-group">
          <input type="text" class = "form-control" id="userName" placeholder="">
          <i class="fa-solid fa-user"></i>
          <span>Nhap ten cua ban</span>
        </div>
        
        <div class = "form-group">
          <input type="email" class = "form-control" id="userEmail" placeholder="">
          <i class="fa-regular fa-envelope"></i>
          <span>Nhap gmail cua ban</span>
        </div>

        <div class = "form-group">
          <input type="text" class = "form-control" id="userPass" placeholder="">
          <i class="fa-solid fa-lock"></i>
          <span>Nhap mat khau cua ban</span>
        </div>

        <div class = "form-group">
          <input type="password" class = "form-control" id="userPassconfirm" placeholder="">
          <i class="fa-solid fa-lock"></i>
          <span>Nhap lai mat khau cua ban</span>
        </div>

        <div class = "form-group">
          <input type="tel" class = "form-control" id="userPhonenumber" placeholder="">
          <i class="fa-solid fa-phone"></i>
          <span>Nhap so dien thoai cua ban</span>
        </div>

        <div class = "form-group">
          <input type="text" onfocus="(this.type='date')" onblur="if(!this.value) this.type = 'text'" class = "form-control" id="userBirth" placeholder="">
          <i class="fa-solid fa-calendar"></i>
          <span>Nhap ngay sinh cua ban</span>
        </div>

        <div class="form-group">
          <input type="submit" value="Dang ky" class="btnn">
          <p>Ban da co tai khoan? <RouterLink @click="scrollToTop()" to="/login">Dang nhap</RouterLink></p>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

  export default {
    name: "Register",
    data() {
      return {

      }
    },
    methods: {
      ...mapMutations(['scrollToTop']),
    }
  }
</script>

<style lang="scss">
.register {
  padding: 2rem 9%;
  .register-form {
    background-color: #fff;
    height: 90vh;
    form {
      position: relative;
      background-color: #f4f4f4;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 40rem;
      width: 100%;
      box-shadow: -0.5rem -0.5rem 1rem rgba($color: #000000, $alpha: 0.1),  0.5rem 0.5rem 1rem rgba($color: #000000, $alpha: 0.1);
      border: 0.1rem solid rgba($color: #000000, $alpha: 0.05);
      padding: 2rem;
      border-radius: 1rem;
      animation: fadeUp 0.4s linear;
      h3 {
        padding-bottom: 1rem;
        font-size: 2rem;
        font-weight: bolder;
        text-transform: uppercase;
        color: #130f40;
        margin: 0;
      }
      
      .btnn {
        width: 100%;
        margin-top: 1rem;
        margin-bottom: 1rem;
        border-radius: 1rem;
      }
      
      .form-group {
        position: relative;
        i {
          color: #27ae60;
          font-size: 2rem;
          position: absolute;
          top: 1.5rem;
          left: 1rem;
        }
        span {
          font-size: 2rem;
          position: absolute;
          top: 1rem;
          left: 4rem;
          color: rgba($color: #000000, $alpha: 0.3);
          pointer-events: none;
          margin: 0;
        }
        input {
          &:focus {
            ~ span {
              background-color: #f4f4f4;
              color: #27ae60;
              transform: translateX(-2rem) translateY(-2.5rem);
              border: 2px solid #27ae60;
              font-size: 1.5rem;
              border-radius: 20px;
              padding: 0px 8px;
            }
          }
        }
      }
      .form-control {
        height: 5rem;
        margin: 3rem 0;
        border-radius: 1rem;
        background-color: #f4f4f4;
        padding: 2rem 3.5rem;
        font-size: 1.5rem;
        color: #130f40;
        text-transform: none;
        width: 100%;
        border: none;
        box-shadow: inset 0.2rem 0.2rem 0.2rem #b3b3b3, inset -0.2rem -0.2rem 0.2rem #fff;
        }
      p {
        text-align: center;
        padding-top: 1rem;
        font-size: 1.5rem;
        color: #666;
        margin: 0;
        a {
          color: #27ae60;
          &:hover {
            color: #f38609;
            text-decoration: underline;
          }
        }
      }

    }
  }
}

</style>