<template>
  <VueBasicAlert :duration="300" :closeIn="1000" ref="alert" />

  <div class="alert-delete-user">
    <div class="alert-delete-user-inner">
      <div class="row text-center">
        <h1>Bạn có chắc muốn xóa người dùng này?</h1>
      </div>
      <div class="row">
        <button class="col-6 btn btn-info" @click="deleteUser">Có</button>
        <button class="col-6 btn btn-danger" @click="setShowDeleteUser(false)">Không</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import axios from 'axios';
import VueBasicAlert from 'vue-basic-alert'

export default {
  name: 'Alert',
  props: ['userId'],
  components: {
    VueBasicAlert
  },
  data() {
    return {

    }
  },
  methods: {
    ...mapMutations(['setShowDeleteUser']),
    ...mapActions(['getAllUser']),

    async deleteUser() {
      await new Promise(() => setTimeout(() => {
        this.getAllUser();
        this.setShowDeleteUser(false);
      }, 1000)).then(
        await axios.post('/admin/delete-user', {id: this.userId}, { withCredentials: true }),
        this.$refs.alert.showAlert("Xóa người dùng thành công !"),
      )
    }

  },
  computed: {
    ...mapState(['allFoods'])
  },

  created() {
    console.log(this.userId);
  }
}
</script>

<style lang="scss" scoped>
.alert-delete-user {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  .alert-delete-user-inner {
    background-color: #fff;
    width: auto;
    height: auto;
    border-radius: 0.7rem;

    .row {
      width: 50rem;
      margin: 0;

      h1 {
        font-size: 2.5rem;
        margin: 2rem 0;
      }

      .btn {
        padding: .7rem 1.8rem;
        font-size: 1.7rem;
        cursor: pointer;
        color: #fff;

        &:nth-child(1) {
          border-radius: 0 0 0 0.7rem;
        }

        &:nth-child(2) {
          border-radius: 0 0 0.7rem 0;
        }
      }
    }
  }
}

@media (max-width: 400px) {
  .alert-delete-user {
    .alert-delete-user-inner {
      .row {
        width: 30rem;

        h1 {
          font-size: 1.5rem;
        }
      }
    }
  }
}
</style>