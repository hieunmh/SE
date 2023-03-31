<template>
  <div class = "register">
    <div class = "register-form">
      <form @submit="handleSubmit" novalidate autocapitalize="off">
        <h3>Tạo tài khoản</h3>

        <div class = "form-group">
          <input type="text" class = "form-control" required="require" v-model="registerForm.name">
          <i class="fa-solid fa-user"></i>
          <span class="sp">Nhập tên của bạn</span>
          <p class="error-mess" v-if="errorObj.nameErr.length >0">{{  errorObj.nameErr[0]  }}</p>
        </div>
        
        <div class = "form-group">
          <input type="text" class = "form-control" required="require" v-model="registerForm.email">
          <i class="fa-regular fa-envelope"></i>
          <span class="sp">Nhập mail của bạn</span>
          <p class="error-mess" v-if="errorObj.emailErr.length > 0">{{  errorObj.emailErr[0] }}</p>
        </div>

        <div class = "form-group">
          <input type="password" class = "form-control" required="require" v-model="registerForm.password">
          <i class="fa-solid fa-lock"></i>
          <span>Nhập mật khẩu của bạn</span>
          <p class="error-mess" v-if="errorObj.passwordErr.length > 0">{{ errorObj.passwordErr[0] }}</p>
        </div>

        <div class = "form-group">
          <input type="password" class = "form-control" required="require" v-model="registerForm.confirm">
          <i class="fa-solid fa-lock"></i>
          <span>Nhập lại mật khẩu của bạn</span>
          <p class="error-mess" v-if="errorObj.confirmErr.length > 0">{{ errorObj.confirmErr[0] }}</p>
        </div>

        <div class = "form-group">
          <input type="tel" class = "form-control" required="require" v-model="registerForm.telephone">
          <i class="fa-solid fa-phone"></i>
          <span>Nhập số điện thoại của bạn</span>
          <p class="error-mess" v-if="errorObj.phoneErr.length > 0">{{ errorObj.phoneErr[0] }}</p>
        </div>
        <div class="form-group">
          <input type="submit" value="Đăng ký" class="btnn">
          <p>Đã có tài khoản? <RouterLink @click="scrollToTop()" to="/login">Đăng nhập</RouterLink></p>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
  export default {
    name: "Register",
    data() {
      return {
        registerForm: {
          email: "",
          password: "",
          name: "",
          confirm: "",
          telephone: "",
        },
        errorObj: {nameErr: [], emailErr: [], passwordErr: [], confirmErr: [], phoneErr: [] },
        matchUser: undefined
      }
    },

    methods: {
      ...mapMutations(['scrollToTop', 'setUser']),

      async register() {
        let data = await axios.post('/register', this.registerForm, {withCredentials: true});
        let err = data.data.msg;
        if (err === 'Email đã tồn tại') {
          this.errorObj.emailErr.push(err);
        }
        else {
          this.setUser(data.data.name);
          this.$router.push('/');
        }
      },

      resetCheckErr() {
        this.errorObj.nameErr = [];
        this.errorObj.emailErr = [];
        this.errorObj.passwordErr = [];
        this.errorObj.confirmErr = [];
        this.errorObj.phoneErr = [];
        this.errorObj.birthErr = [];
      },

      checkEmptyErr() {
        for (var i in this.errorObj) {
          if (this.errorObj[i].length != 0) {
            return false;
          }
        }
        return true;
      },
      
      checkForm() {
        this.resetCheckErr();

        // name validate
        if (!this.registerForm.name) {
          this.errorObj.nameErr.push('Vui lòng nhập tên của bạn');
        }
        else if (!/^[A-Za-z]+$/.test(this.registerForm.name.replace(/\s/g, ""))) {
          this.errorObj.nameErr.push('Tên chỉ được chứa ký tự chữ cái');
        }

        // email validate
        if (!this.registerForm.email) {
          this.errorObj.emailErr.push('Vui lòng nhập email của bạn');
        }
        else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.registerForm.email)) {
          this.errorObj.emailErr.push('Vui lòng nhập email hợp lệ');
        }

        // password validate
        if (!this.registerForm.password) {
          this.errorObj.passwordErr.push('Vui lòng nhập mật khẩu của bạn');
        }
        // else if (!/[!@#$%^&*]/.test(this.registerForm.password)) {
        //   this.errorObj.passwordErr.push('Mật khẩu chỉ được chứa nhiều nhất 1 ký tự đặc biệt');
        // }
        // else if (this.registerForm.password.length < 8) {
        //   this.errorObj.passwordErr.push('Mật khẩu phải chứa ít nhất 8 ký tự');
        // }

        // confirm validate
        if (!this.registerForm.confirm) {
          this.errorObj.confirmErr.push('Vui lòng nhập lại mật khẩu của bạn');
        }
        else if (this.registerForm.confirm !== this.registerForm.password) {
          this.errorObj.confirmErr.push('Mật khẩu nhập lại không đúng');
        }
        

        // phone validate
        if (!this.registerForm.telephone) {
          this.errorObj.phoneErr.push('Vui lòng nhập số điện thoại của bạn');
        }
        else if (!this.registerForm.telephone.startsWith('0')) {
          this.errorObj.phoneErr.push('Số điện thoại phải bắt đầu bằng 0');
        }
        else if (this.registerForm.telephone.length != 10) {
          this.errorObj.phoneErr.push('Số điện thoại chỉ được chứa 10 chữ số');
        }
        else if (!/[0-9]{10}/.test(this.registerForm.telephone)) {
          this.errorObj.phoneErr.push('Số điện thoại chỉ được chứa chữ số')
        }
      },

      async handleSubmit(event) {
        this.checkForm();
        
        if (!this.checkEmptyErr()) {
          event.preventDefault();
        }
        else {
          event.preventDefault();
          this.register();

        }
      }
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
        .error-mess {
          font-size: 1.5rem;
          color: rgba($color: #f32f2f, $alpha: 1.0);
          margin: 0;
          padding-top: 5px;
        }
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
          // margin-top: 2rem;
          margin-bottom: 0;
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

@media (max-width: 360px) {
  .register .register-form form .form-group span {
    font-size: 1.5rem;
    margin-top: 0.6rem;  
  }
  .register .register-form form .form-group input:focus ~ span {
    background-color: #f4f4f4;
    color: #27ae60;
    transform: translateX(-2rem) translateY(-2.5rem);
    border: 2px solid #27ae60;
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 0px 8px;
  }

  .register .register-form form .form-group input:valid ~ span {
    background-color: #f4f4f4;
    color: #27ae60;
    transform: translateX(-2rem) translateY(-2.5rem);
    border: 2px solid #27ae60;
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 0px 8px;
  }

  .register .register-form form .form-group .error-mess {
    font-size: 1.5rem;
    color: rgba($color: #f32f2f, $alpha: 1.0);
    margin: 0;
    padding: 0;
  }
}
@media (max-width: 280px) {
  .register .register-form form .form-group span {
    font-size: 1.3rem;
  }
  .register .register-form form .form-group input:focus ~ span {
    background-color: #f4f4f4;
    color: #27ae60;
    transform: translateX(-2rem) translateY(-2.5rem);
    border: 2px solid #27ae60;
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 0px 8px;
  }

  .register .register-form form .form-group .error-mess {
    font-size: 1.5rem;
    color: rgba($color: #f32f2f, $alpha: 1.0);
    margin: 0;
    padding: 0;
  }
  .register .register-form form .form-group input {
    margin-top: 1rem;
  }
}

</style>