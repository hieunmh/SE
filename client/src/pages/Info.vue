<template>
  <div class="info">
    <EditInfo v-if="showAlertEditInfo">
      <button @click.prevent="setShowAlertEditInfo(false)" class="btnn">Hủy</button>
    </EditInfo>

    <ChangePass v-else-if="showAlertEditPass">
      <button @click.prevent="setShowAlertEditPass(false)" class="btnn">Hủy</button>
    </ChangePass>

    <div class="info-form">
      <form @submit="handleSubmit" novalidate autocapitalize="off">
        <h3>Thông tin tài khoản</h3>

        <div class="form-group">
          <p class="form-control"></p>
          <i class="fa-solid fa-user"></i>
          <span class="sp">{{ user.userName }}</span>
        </div>

        <div class="form-group">
          <p class="form-control"></p>
          <i class="fa-regular fa-envelope"></i>
          <span class="sp">{{ user.email }}</span>
        </div>


        <div class="form-group">
          <p class="form-control"></p>
          <i class="fa-solid fa-phone"></i>
          <span>{{ user.telephone }}</span>
        </div>

        <div class="form-group">
          <button @click.prevent="setShowAlertEditInfo(true)" class="btnn">Chỉnh sửa thông tin</button>
          <button @click.prevent="setShowAlertEditPass(true)" class="btnn">Đổi mật khẩu</button>
          <RouterLink to="/" @click="scrollToTop()"><button class="btnn">Đến trang chủ</button></RouterLink>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import EditInfo from '../components/EditInfo.vue';
import ChangePass from '../components/ChangePass.vue';

export default {
  name: "Register",
  data() {
      return {
          showEditPass: false,
      };
  }, 
  methods: {
    ...mapMutations(['scrollToTop', 'setShowAlertEditInfo', 'setShowAlertEditPass']),
    
    setShowEditPass() {
      this.showEditPass = !this.showEditPass;
    }
    
  },
  
  computed: {
    ...mapState(['user', 'showAlertEditInfo', 'showAlertEditPass'])
  },
  components: { 
    EditInfo,
    ChangePass,
  }
}
</script>

<style lang="scss">
.info {
  padding: 2rem 9%;
  

  .info-form {
    background-color: #fff;
    height: 90vh;

    form {
      position: relative;
      background-color: #f4f4f4;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 40rem;
      width: 150%;
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
        button {
          a {
            color: #fff;
          }
        }
        i {
          color: #27ae60;
          font-size: 2rem;
          position: absolute;
          top: 1.5rem;
          left: 1rem;
        }

        span {
          text-transform: none;
          font-size: 2rem;
          position: absolute;
          top: 1rem;
          left: 4rem;
          color: rgba($color: #000000, $alpha: 0.3);
          pointer-events: none;
          margin: 0;
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
  .info .info-form form .form-group span {
    font-size: 1.5rem;
    margin-top: 0.6rem;
  } 
}

@media (max-width: 280px) {
  .info .register-form form .form-group span {
    font-size: 1.3rem;
  }
}</style>