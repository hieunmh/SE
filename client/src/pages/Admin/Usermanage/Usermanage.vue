<template>
  <div class="user-manage">
    <div class="box">
      <div class="manage">
        <RouterLink to="/admin"><button class="col-4 fw-bold">Quản Lý Sản Phẩm</button></RouterLink>
        <RouterLink to="/admin/allorder"><button class="col-4 fw-bold">Quản Lý Đơn Hàng</button></RouterLink>
        <RouterLink to="/admin/usermanage"><button class="col-4 fw-bold" :disabled="true">Quản Lý Người Dùng</button></RouterLink>
      </div>

      <div class="box-content">

        <AlertDeleteUser :userId = "userid" v-if="showDeleteUser"></AlertDeleteUser>

        <div class="row bar">
          <div class="col-1">
            <h4 class="text-center fw-bold">ID</h4>
          </div>

          <div class="col-5">
            <h4 class="text-center fw-bold">Tên Khánh Hàng</h4>
          </div>

          <div class="col-4">
            <h4 class="text-center fw-bold">Số điện thoại</h4>
          </div>

          <div class="col-2">
            <h4 class="text-center fw-bold">Thao tác</h4>
          </div>
        </div>


        <div  class="row" v-for="(user, index) in allUser" :key="index">

          <div class="centre col-1 desc ">
            <h4 class="item-name fw-bold">{{ index + 1 }}</h4>
          </div>


          <div class="centre col-5 cal-total">
            <h4 class="text-center fw-bold">{{ user.name }}</h4>
          </div>

          <div class="centre col-4 cal-total">
            <h4 class="text-center fw-bold">{{ user.telephone }}</h4>
          </div>

          <div class="centre col-2 detail">
            <!-- <button class="btn btn-info fw-bold" @click="">sửa</button> -->
            <button class="mt-2 btn btn-danger fw-bold" @click="showDelete(index)">xóa</button>
          </div>
        </div>

        <div class="action-row">
          <button @click="previousToFirst()" class="action-btn decrease-btn">
            <i class="fa-solid fa-angles-left"></i>
          </button>

          <button @click="previous()" class="action-btn decrease-btn">
            <i class="fa-solid fa-angle-left"></i>
          </button>

          <div v-for="(page, index) in calculatePages" :key="index" class="d-inline">
            <button v-if="index == pageNum" class="highlight" @click="setPage(index)">{{ index + 1 }}</button>
            <button v-else @click="setPage(index)">{{ index + 1 }}</button>
          </div>

          <button @click="next()" class="action-btn increase-btn">
            <i class="fa-solid fa-angle-right"></i>
          </button>

          <button @click="nextToLast()" class="action-btn increase-btn">
            <i class="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import serverUrl from '@/axios';
import axios from 'axios';

import AlertDeleteUser from './AlertDeleteUser.vue';


export default {
  name: "Usermanage",
  components: {
    AlertDeleteUser
  },

  data() {
    return {
      pageNum: 0,
      perPage: 6,
      userid: null,
    }
  },

  methods: {
    ...mapMutations(['scrollToTop', 'setShowDeleteUser', 'setShowDeleteUser']),
    ...mapActions(['getAllUser']),

    showDelete(index) {
      this.userid = this.allUser[index].id;
      this.setShowDeleteUser(true);
    },

    setPage(value) {
      this.pageNum = value;
      this.scrollToTop();
    },

    previous() {
      if (this.pageNum == 0) {
        document.querySelectorAll('.decrease-btn').disabled = true;
      }
      else {
        document.querySelectorAll('.decrease-btn').disabled = false;
        this.pageNum--;
      }
      this.scrollToTop();
    },

    previousToFirst() {
      this.pageNum = 0;
      this.scrollToTop();
    },

    next() {
      if (this.pageNum == this.calculatePages - 1) {
        document.querySelectorAll('.increase-btn').disabled = true;
      }
      else {
        document.querySelectorAll('.increase-btn').disabled = false;
        this.pageNum++;
      }
      this.scrollToTop();
    },

    nextToLast() {
      this.pageNum = this.calculatePages - 1;
      this.scrollToTop();
    },


  },

  computed: {
    ...mapState(['admin', 'showDeleteUser', 'allUser']),

    currentPage() {
      return this.allUser.slice(this.pageNum * this.perPage, this.pageNum * this.perPage + this.perPage);
    },

    calculatePages() {
      if (this.allUser.length % this.perPage != 0) {
        return Math.floor((this.allUser.length) / this.perPage) + 1;
      }
      else {
        return this.allUser.length / this.perPage;
      }
    },

  },

  created() {
    this.getAllUser();
  }

}
</script>

<style lang="scss" scoped>
.user-manage {
  padding: 2rem 20%;

  .box {
    margin: 0;
    width: 100%;
    margin-bottom: 20px;
    padding: 0;

    .manage {
      a {
        &:nth-child(1) {
          button {
            border-radius: 0.7rem 0 0 0.7rem;
          }
        }

        &:nth-child(2) {
          button {
            border-radius: 0 0 0 0;
          }
        }

        &:nth-child(3) {
          button {
            border-radius: 0 0.7rem 0.7rem 0;
          }
        }
      }

      button {
        background: #f1f1f1;
        color: #ffa31a;
        font-size: 1.7rem;
        padding: 0.7rem 0;
      }

      button:disabled {
        background-color: #ffa31a;
        color: #fff;
      }
    }

    .box-content {
      padding: 0;
      border-image: none;

      .add-product {
        button {
          width: 25rem;
          font-size: 2rem;
          font-weight: 500;
        }
      }

      .row {
        background-color: #f1f1f1;
        padding: 2rem 0;
        margin: 1rem 0;
        border-radius: 0.7rem;
      }

      .centre {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .image-box {
        padding: 0;
        display: flex;

        img {
          width: 8rem;
          height: 8rem;
          border-radius: 1rem;
        }
      }

      .cal-total {
        h4 {
          color: #ee4d2d;
        }
      }

      .detail {
        button {
          padding: .7rem 1.8rem;
          font-size: 1.7rem;
          cursor: pointer;
          color: #fff;
        }
      }
    }
  }
}

.action-row {
  padding-top: 30px;
  max-width: 100%;
  text-align: center;
  font-size: 2rem;

  .action-btn {
    width: 4rem;
    height: 4rem;
    border-radius: 4rem;
    color: white;

    i {
      color: #222831;
    }
  }

  button.highlight {
    color: #fff;
    background-color: #222831;
    border-radius: 2rem;
  }

  button {
    background-color: #fff;
    width: 4rem;
    height: 4rem;
    margin: 0rem 1rem;

    &:hover {
      cursor: pointer;
    }
  }
}




@media (max-width: 992px) {
  .user-manage {
    padding: 2rem 15%;
  }
}

@media (max-width: 767px) {
  .user-manage {
    padding: 2rem 10%;
  }
}

@media (max-width: 576px) {
  .user-manage {
    padding: 2rem 5%;
  }
}

@media (max-width: 400px) {
  .user-manage {
    .box {
      .box-content {
        .image-box {
          img {
            width: 6.5rem;
            height: 6.5rem;
            border-radius: 0.7rem;
          }
        }
      }
    }
  }
}
</style>