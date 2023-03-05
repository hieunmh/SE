<template>
  <div class = "login">
    <div class = "login-form">
      <form action="">
        <h3>Hieuhub</h3>
        <div class = "form-group">
          <input type="email" class = "form-control" id="" placeholder="">
          <i class="fa-regular fa-envelope"></i>
          <span>nhap mail cua ban</span>
        </div>

        <div class = "form-group">
          <input type="password" class = "form-control" id="" placeholder="">
          <i class="fas fa-lock"></i>
          <span>nhap mat khau cua ban</span>
        </div>

        <div class = "form-group">
          <input type="submit" class = "btnn" id="" value="Dang nhap" @click.stop.prevent="submit()">
          <p>Chua co tai khoa? <RouterLink @click="scrollToTop()" to="/register">Dang ky tai day</RouterLink></p>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Login',
  methods: {
    ...mapMutations(['scrollToTop']),
    submit() {
      this.$router.push('/')
;    }
  }

}
</script>
<style lang="scss">
.login {
  padding: 2rem 9%;
  .login-form {
    background-color: #fff;
    height: 90vh;
    form {
      background-color: #f4f4f4;
      position: relative;
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
      .form-group {
        position: relative;
        i {
          font-size: 2rem;
          position: absolute;
          top: 1.5rem;
          left: 1rem;
          color: #27ae60;
        }
        span {
          font-size: 2rem;
          position: absolute;
          top: 1rem;
          left: 4rem;
          color: rgba($color: #000000, $alpha: 0.3);
          pointer-events: none;
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
              padding: 0 8px;
            }
          }
        }
      }
      h3 {
        padding-bottom: 1rem;
        font-size: 2rem;
        font-weight: bolder;
        text-transform: uppercase;
        color: #130f40;
        margin: 0;
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
      .btnn {
        width: 100%;
        margin-top: 1rem;
        margin-bottom: 1rem;
        border-radius: 1rem;
        text-align: center;
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