<template>
  <div class="changePass">
    <div class="changePass-form">
      <form @submit="handleSubmit" novalidate autocapitalize="off">
        <h3>Đổi mật khẩu</h3>

        <div class="form-group">
          <input type="text" class="form-control" required="require" v-model="changePassForm.oldPW">
          <i class="fa-solid fa-lock"></i>
          <span>Nhập mật khẩu cũ của bạn</span>
          <p class="error-mess" v-if="errorObj.oldPassErr.length > 0">{{ errorObj.oldPassErr[0] }}</p>
        </div>

        <div class="form-group">
          <input type="tel" class="form-control" required="require" v-model="changePassForm.newPW">
          <i class="fa-solid fa-lock"></i>
          <span>Nhập mật khẩu mới của bạn</span>
          <p class="error-mess" v-if="errorObj.newPassErr.length > 0">{{ errorObj.newPassErr[0] }}</p>
        </div>

        <div class="form-group">
          <input type="tel" class="form-control" required="require" v-model="changePassForm.confirmPW">
          <i class="fa-solid fa-lock"></i>
          <span>Nhập lại mật khẩu mới của bạn</span>
          <p class="error-mess" v-if="errorObj.confirmPassErr.length > 0">{{ errorObj.confirmPassErr[0] }}</p>
        </div>

        <div class="form-group">
          <RouterLink @click="handleChangePass" to="/info"><button class="btnn">Lưu</button></RouterLink>
          <slot></slot>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
export default {
  name: "editInfo",
  data() {
    return {
      changePassForm: {
        oldPW: "",
        newPW: "",
        confirmPW: "",
      },
      errorObj: { oldPassErr: [], newPassErr: [], confirmPassErr: [] },
    }
  },

  methods: {
    ...mapMutations(['scrollToTop', 'setUser']),
    
    async changePass() {
      let res = await axios.post('change-password', this.changePassForm, {withCredentials: true});
      console.log(res.data);
      
      let err = res.data.msg;
      if (err === 'Mật khẩu cũ không đúng') {
        this.errorObj.oldPassErr.push('Mật khẩu cũ không đúng');
      }
      else if (err === 'Mật khẩu mới không giống mật khẩu cũ') {
        this.errorObj.newPassErr.push('Mật khẩu mới không giống mật khẩu cũ');
      }
      else {
        alert(res.data.msg);
        window.location.reload();
      }
    },

    resetCheckErr() {
      this.errorObj.oldPassErr = [];
      this.errorObj.newPassErr = [];
      this.errorObj.confirmPassErr = [];
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

      if (!this.changePassForm.newPW) {
        this.errorObj.newPassErr.push('Vui lòng nhập mật khẩu mới');
      }

      if (this.changePassForm.confirmPW != this.changePassForm.newPW) {
        this.errorObj.confirmPassErr.push('Mật khẩu cũ không đúng');
      }
    },
 
    handleChangePass(event) {
      //this.changePass();

      this.checkForm();

      if (!this.checkEmptyErr()) {
        event.preventDefault();
      }  
      else {
        event.preventDefault();
        this.changePass();
      }
    }
  }
}
</script>

<style lang="scss">
.changePass {
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .changePass-form {
    background-color: transparent;
    height: 45vh;

    form {
      position: relative;
      background-color: #f4f4f4;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 40rem;
      width: 100%;
      box-shadow: -0.5rem -0.5rem 1rem rgba($color: #000000, $alpha: 0.1), 0.5rem 0.5rem 1rem rgba($color: #000000, $alpha: 0.1);
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
            ~span {
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
            ~span {
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
  .changePass .changePass-form form .form-group span {
    font-size: 1.5rem;
    margin-top: 0.6rem;
  }

  .changePass .changePass-form form .form-group input:focus~span {
    background-color: #f4f4f4;
    color: #27ae60;
    transform: translateX(-2rem) translateY(-2.5rem);
    border: 2px solid #27ae60;
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 0px 8px;
  }

  .changePass .changePass-form form .form-group input:valid~span {
    background-color: #f4f4f4;
    color: #27ae60;
    transform: translateX(-2rem) translateY(-2.5rem);
    border: 2px solid #27ae60;
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 0px 8px;
  }

  .changePass .changePass-form form .form-group .error-mess {
    font-size: 1.5rem;
    color: rgba($color: #f32f2f, $alpha: 1.0);
    margin: 0;
    padding: 0;
  }
}

@media (max-width: 280px) {
  .changePass .changePass-form form .form-group span {
    font-size: 1.3rem;
  }

  .changePass .changePass-form form .form-group input:focus~span {
    background-color: #f4f4f4;
    color: #27ae60;
    transform: translateX(-2rem) translateY(-2.5rem);
    border: 2px solid #27ae60;
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 0px 8px;
  }

  .changePass .changePass-form form .form-group .error-mess {
    font-size: 1.5rem;
    color: rgba($color: #f32f2f, $alpha: 1.0);
    margin: 0;
    padding: 0;
  }

  .changePass .changePass-form form .form-group input {
    margin-top: 1rem;
  }
}
</style>