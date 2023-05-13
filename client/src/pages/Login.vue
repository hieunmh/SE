<template>
  <div class = "login">
    <div class = "login-form">
      <form @submit.prevent="handleSubmit" novalidate autocomplete="off">
        <h1 class="text-center"><span style="font-size: 3rem;">Fea</span><span style="color: #ffa31a; text-transform: none; font-size: 3rem;">stly</span></h1>

        <div class="" style="height: 7rem;">
          <h1 class="text-center">LOGIN</h1>
        </div>


        <div class="form-group">
          <input type="text" class = "form-control" id="0" required="require" v-model="loginForm.email" @input="hideError">
          <i class="fa-regular fa-envelope"></i>
          <span>Email</span>
          <p class="error-box" v-if="errors.length > 0">{{ errors[0] }}</p>
        </div>

        <div class="form-group">
          <input type="password" class = "form-control" id="1" required="require" v-model="loginForm.password" @input="hideError">
          <i class="fas fa-lock"></i>
          <span>Password</span>
          <p class="error-box" v-if="errors.length > 0">{{ errors[1] }}</p>
        </div>

        <div class="form-group">
          <input type="submit" class = "" id="" value="Đăng nhập">
          <p>Chưa có tài khoản? <RouterLink @click="scrollToTop()" to="/register">Đăng ký</RouterLink></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import axios from 'axios';
import Loading from '@/components/Loading.vue';

export default {
  name: 'Login',
  components: {
    Loading
  },

  data() {
    return {
      loginForm: {email: "", password: ""},
      matchUser: undefined,
      errors: []
    }
  },  
  computed: {
    ...mapState(['loading', 'showLoading']),
  },
  
  methods: {
    ...mapMutations(['scrollToTop', 'setUser', 'setAdmin', 'setLogged', 'setShowLoading']),
    ...mapActions(['getCart']),

    hideError(event) {
      let index = event.target.id;
      this.errors[index] = null;
      if (this.errors[0] == "Sai email hoặc mật khẩu") {
        this.errors[0] = null;
      }
    },

    async login() {
      let data = await axios.post('/login', this.loginForm, { withCredentials: true });
      let err = data.data.msg;
      if (err === 'Sai email hoặc mật khẩu') {
        this.errors.push(err);
      }
      else {
        this.getCart();

        await new Promise(() => setTimeout(() => {
          this.setUser(data.data),
          this.setShowLoading(false);
          if (data.data.role) {
            this.setAdmin("admin");
          }
        }, 1000)).then(
          this.$router.push('/'),
          this.setShowLoading(true),
          this.setLogged(true),
        )
        
      }
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
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.login {
  // padding: 2rem 9%;
  .login-form {
    background-color: #fff;
    height: 90vh;
    background: linear-gradient(to right, rgba($color: #000, $alpha: 1) , rgba($color: #000, $alpha: 0.75));
    form {
      background-color: #f4f4f4;
      position: relative;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 40rem;
      width: 100%;
      height: 50rem;
      border: 0.1rem solid rgba($color: #000000, $alpha: 0.05);
      padding: 2rem;
      // box-shadow: 16px 16px 32px #c8c8c8,
      //   -16px -16px 32px #fefefe;
      border-radius: 1rem;
      animation: fadeUp 0.4s linear;
      .error-box {
        box-sizing: border-box;
        font-size: 1.5rem;
        padding: 0;
        // margin-bottom: 20px;
        padding-left: 10px;
        color: rgb(182, 0, 0);
        
      }
      .form-group {
        height: 8.8rem;
        position: relative;
        margin: 0;
        i {
          font-size: 2rem;
          position: absolute;
          top: 1.5rem;
          left: 1rem;
          color: #222831;
        }

        span {
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          font-size: 1.7em;
          position: absolute;
          top: 1rem;
          left: 4rem;
          color: rgba($color: #000000, $alpha: 0.3);
          pointer-events: none;
          transition: 0.5s;
        }
        input[type="submit"] {
          margin-top: 1rem;
          width: 100%;
          color: #fff;
          font-size: 2rem;
          padding: 0.7rem;
          border-radius: 1rem;
          background: linear-gradient(to right, #ffa31a, rgba($color: #ffa31a, $alpha: 0.8));
          &:hover {
            background: linear-gradient(to right, #e69c00, rgba($color: #e69c00 , $alpha: 0.8));
          }
        }

        input {
          font-size: 2rem;
          margin: 1rem 0;
          &:focus {
            ~ span {
              background-color: #222831;
              color: #fff;
              transform: translateX(0rem) translateY(-2.5rem);
              font-size: 1.5rem;
              border-radius: 0.7rem;
              padding: 0.2rem 0.8rem;
              letter-spacing: 0.3rem;
            }
          }
          &:valid {
            ~ span {
              background-color: #222831;
              color: #fff;
              transform: translateX(0rem) translateY(-2.5rem);
              font-size: 1.5rem;
              border-radius: 0.7rem;
              padding: 0.2rem 0.8rem;
              letter-spacing: 0.3rem;
            }
          }
        }
      }
      h1 {
        padding-bottom: 1rem;
        font-size: 3rem;
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
            color: #ffa31a;
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
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 0px 8px;
  }

  .login .login-form form .form-group input:valid ~ span {
    background-color: #f4f4f4;
    color: #27ae60;
    transform: translateX(-2rem) translateY(-2.5rem);
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 0px 8px;
  }
}

</style>