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
    ...mapActions(['getProducts', 'checkLogin', 'getCart']),
    ...mapMutations(['setLoading'])
  },

  computed: {
    ...mapState(['loading', 'user']),
  },
  
  created() {
    this.checkLogin();
    this.getProducts();
    this.getCart();
    this.setLoading();
  },
}
</script>

<style>
@import "./assets/css/global_style.css";
</style>
