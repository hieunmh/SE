<template>
  <VueBasicAlert :duration="300" :closeIn="1000" ref="alert" />

  <div class="alert-delete-order">
    <div class="alert-delete-order-inner">
      <div class="row text-center">
        <h1>Bạn có chắc muốn hủy đơn hàng này?</h1>
      </div>
      <div class="row">
        <button class="col-6 btn btn-info" @click.prevent="deleteOrder($event)">Có</button>
        <button class="col-6 btn btn-danger" @click="setShowDeleteOrder(false)">Không</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import axios from 'axios';
import VueBasicAlert from 'vue-basic-alert'

export default {
  name: 'DeleteOrder',
  props: ['deleteId'],
  components: {
    VueBasicAlert
  },
  data() {
    return {

    }
  },
  methods: {
    ...mapMutations(['setShowDeleteOrder']),
    ...mapActions(['getUserOrder']),

    async deleteOrder(event) {
      if (this.deleteId.status.toLowerCase() != 'đang xử lý') {
        event.preventDefault();
        this.$refs.alert.showAlert("Hủy đơn hàng không thành công !");
      }

      else {
        await new Promise(() => setTimeout(() => {
          this.getUserOrder();
          this.setShowDeleteOrder(false);
        }, 1000)).then(
          await axios.post('/delete-order', { order_id: this.deleteId.id }, { withCredentials: true }).then(
            this.$refs.alert.showAlert("Hủy đơn hàng thành công !"),
          ),
        )
      }
    }

  },
  computed: {
    
  },

  created() {
    // console.log(this.deleteId.id);
  }
}
</script>

<style lang="scss" scoped>
.alert-delete-order {
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

  .alert-delete-order-inner {
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
  .alert-delete-order {
    .alert-delete-order-inner {
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