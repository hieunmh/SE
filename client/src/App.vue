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
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  methods: {
    ...mapMutations(['setUser']),

    async checkLogin() {
      let res = await axios.get('login', {withCredentials: true});
      if (res.data.cookie) {
        let data = await axios.get('info', { withCredentials: true });  
        this.setUser(data.data.userName);
      }
    }
  },
  mounted() {
    this.checkLogin();
  }
}
</script>

<style>
@import "./assets/css/global_style.css";
</style>
