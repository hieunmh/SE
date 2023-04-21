<template>
  <div id="app">
    <div v-if="loading">
      <Loading></Loading>
    </div>

    <div v-else class="">
      <Header />
      <router-view></router-view>
      <Footer />
    </div>

  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Loading from './components/Loading.vue';
import axios from 'axios';
import router from "@/routes/router";

import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Loading,
  },
  data() {
    return {
      
    }
  },

  methods: {
    ...mapActions(['getProducts', 'getCart', 'getCategory']),
    ...mapMutations(['setLoading', 'setUser', 'setLogged', 'setAdmin', 'setCartItem', 'setCartLength']),


    async checkLogin() {
      let res = await axios.get("login", {withCredentials: true});
      if (res.data.cookie) {
        if (router.currentRoute.value.path == "/login" || router.currentRoute.value.path == "/register") {
          router.push("/");
        }

        let data = await axios.get("info", { withCredentials: true });
        this.setUser(data.data);
        this.setLogged(true);

        if (data.data.role) {
          this.setAdmin("admin");
        }

        let cart = await axios.get("cart", {withCredentials: true})
        .then((res) => {  
          this.setCartItem(res.data.productsInCart);
          this.setCartLength(res.data.productsInCart.length)
        })
      }
      else {
        if (router.currentRoute.value.path == "/admin") {
          router.push('/');
        }
      }
    }
  },

  computed: {
    ...mapState(['loading', 'user']),
  },
  
  created() {
    this.checkLogin();
    this.getProducts();
    this.getCategory();
    this.setLoading();
  },
}
</script>

<style>
@import "./assets/css/global_style.css";
</style>
