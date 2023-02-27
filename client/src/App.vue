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

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  }
}
</script>

<style>
@import "./assets/css/global_style.css";
</style>
