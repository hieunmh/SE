<template>
  <div class="editInfo">
    <div class="editInfo-form">
      <form @submit="handleSubmit" novalidate autocapitalize="off">
        <h3>Chỉnh sửa thông tin</h3>

        <div class="form-group">
          <input type="text" class="form-control" required="require" v-model="editInfoForm.name">
          <i class="fa-solid fa-user"></i>
          <span>Nhập tên của bạn</span>
          <p class="error-mess" v-if="errorObj.nameErr.length > 0">{{ errorObj.nameErr[0] }}</p>
        </div>

        <div class="form-group">
          <input type="tel" class="form-control" required="require" v-model="editInfoForm.telephone">
          <i class="fa-solid fa-phone"></i>
          <span>Nhập số điện thoại của bạn</span>
          <p class="error-mess" v-if="errorObj.phoneErr.length > 0">{{ errorObj.phoneErr[0] }}</p>
        </div>

        <div class="form-group">
          <button @click.prevent="scrollToTop" class="btnn">
            <RouterLink to="/">Lưu</RouterLink>
          </button>
          
          <slot></slot>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: "editInfo",
  data() {
    return {
      editInfoForm: {
        name: "",
        telephone: "",
      },
      errorObj: { nameErr: [], phoneErr: [] },
    }
  },

  methods: {
    ...mapMutations(['scrollToTop', 'setUser']),
  }
}
</script>

<style lang="scss">
.editInfo {
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

  .editInfo-form {
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
  .editInfo .editInfo-form form .form-group span {
    font-size: 1.5rem;
    margin-top: 0.6rem;
  }

  .editInfo .editInfo-form form .form-group input:focus~span {
    background-color: #f4f4f4;
    color: #27ae60;
    transform: translateX(-2rem) translateY(-2.5rem);
    border: 2px solid #27ae60;
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 0px 8px;
  }

  .editInfo .editInfo-form form .form-group input:valid~span {
    background-color: #f4f4f4;
    color: #27ae60;
    transform: translateX(-2rem) translateY(-2.5rem);
    border: 2px solid #27ae60;
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 0px 8px;
  }

  .editInfo .editInfo-form form .form-group .error-mess {
    font-size: 1.5rem;
    color: rgba($color: #f32f2f, $alpha: 1.0);
    margin: 0;
    padding: 0;
  }
}

@media (max-width: 280px) {
  .editInfo .editInfo-form form .form-group span {
    font-size: 1.3rem;
  }

  .editInfo .editInfo-form form .form-group input:focus~span {
    background-color: #f4f4f4;
    color: #27ae60;
    transform: translateX(-2rem) translateY(-2.5rem);
    border: 2px solid #27ae60;
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 0px 8px;
  }

  .editInfo .editInfo-form form .form-group .error-mess {
    font-size: 1.5rem;
    color: rgba($color: #f32f2f, $alpha: 1.0);
    margin: 0;
    padding: 0;
  }

  .editInfo .editInfo-form form .form-group input {
    margin-top: 1rem;
  }
}
</style>