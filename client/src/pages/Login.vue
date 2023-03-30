<template>
  <div class = "login">
    <div class = "login-form">
      <form @submit.prevent="handleSubmit" novalidate autocomplete="off">
        <h3>Hieuhub</h3>

        <div v-if="errors.length" class="error-box">
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>

        <div class = "form-group">
          <input type="text" class = "form-control" id="" required="require" v-model="loginForm.email">
          <i class="fa-regular fa-envelope"></i>
          <span>Nhập mail của bạn</span>
        </div>

        <div class = "form-group">
          <input type="password" class = "form-control" id="" required="require" v-model="loginForm.password">
          <i class="fas fa-lock"></i>
          <span>Nhập mật khẩu của bạn</span>
        </div>

        <div class = "form-group">
          <input type="submit" class = "btnn" id="" value="Đăng nhập">
          <p>Chưa có tài khoản? <RouterLink @click="scrollToTop()" to="/register">Đăng ký</RouterLink></p>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {email: "", password: ""},
      matchUser: undefined, // check user trong database thôi
      errors: []
    }
  },  
  mounted() {
    this.checkLogin();
  },
  methods: {
    ...mapMutations(['scrollToTop', 'setUser']),
     async checkLogin() {
      let cookie = window.localStorage.getItem('cookie');
    },

    async login() {
      let data = await axios.post('/login', this.loginForm, {withCredentials: true});
      let err = data.data.msg;
      this.errors.push(err);
      this.setUser(data.data.userName);
    },  

    async handleSubmit(event) { 
      this.errors = [];
      
      //email validate
      if (!this.loginForm.email) {
        this.errors.push('Vui lòng nhập email của bạn');
      }
      else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.loginForm.email)) {
        this.errors.push('Email không hợp lệ');
      }

      //password validate
      if (!this.loginForm.password) {
        this.errors.push('Vui lòng nhập mật khẩu');
      }
      if (!this.errors.length == 0) {
        event.preventDefault();
      }
      else {
        event.preventDefault();
        await this.login();

        // ìf (match user không giống trong data thì làm gì)
        this.$router.push('/');
        // else không đúng email hoặc mật khẩu
      }
    }
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
      .error-box {
        background-color: #fff9fa;
        box-sizing: border-box;
        border: 2px solid rgba($color: #ff424f, $alpha: 0.2);
        border-radius: 1rem;
        font-size: 12px;
        margin-bottom: 20px;
        ul {
          list-style-type: none;
          margin: 0;
          padding: 10px 0;
          li {
            padding-left: 10px;
            color: rgb(182, 0, 0);
          }
        }
      }
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
          font-size: 2em;
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
          &:valid {
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

@media (max-width: 324px) {
  .login .login-form form .form-group span {
    font-size: 1.5rem;
    margin-top: 0.6rem; 
  }
  .login .login-form form .form-group input:focus ~ span {
    background-color: #f4f4f4;
    color: #27ae60;
    transform: translateX(-2rem) translateY(-2.5rem);
    border: 2px solid #27ae60;
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 0px 8px;
  }

  .login .login-form form .form-group input:valid ~ span {
    background-color: #f4f4f4;
    color: #27ae60;
    transform: translateX(-2rem) translateY(-2.5rem);
    border: 2px solid #27ae60;
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 0px 8px;
  }
}

</style>