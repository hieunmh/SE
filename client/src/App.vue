<template>
  <div id="app">
    <Header />

    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view></router-view>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  methods: {
    ...mapActions(['getProducts', 'checkLogin']),
  },
  
  created() {
    this.checkLogin();
    this.getProducts();
  },
}
</script>

<style>
@import "./assets/css/global_style.css";
</style>
