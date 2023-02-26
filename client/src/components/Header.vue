<template>
  <div class="header">
    <RouterLink to="/" class="logo"><img src="../assets/images/taco-logo.png">Hieuhub</RouterLink>

    <nav class="nav-bar">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/menu">Menu</RouterLink>
      <RouterLink to="/promotion">Promotions</RouterLink>
      <RouterLink to="/table">Table</RouterLink>
    </nav>

    <div class="icon">
      <div id="menu-btn" class="fas fa-bars menu-btn"></div>
      
    </div>
  </div>
</template>

<script>

</script>

<style scoped>

.header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 9%;
}

/** Header logo */
.header .logo {
  font-size: 2.5rem;
  font-weight: bolder;
  color: #130f40;
}

.header .logo img {
  padding-right: .5rem;
  color: #27ae60;
}

/** Header nav-bar */

.header .nav-bar a {
  font-size: 1.7rem;
  margin: 0 1rem;
  color: #666;
}

.header .nav-bar a:hover {
  color: #27ae60;
}

.header .nav-bar a.router-link-exact-active {
    color: #f38609;
}

/**Header icons */

.header .icon div {
  height: 4.5rem;
  width: 4.5rem;
  line-height: 4.5rem;
  font-size: 2rem;
  background: #f7f7f7;
  color: #130f40;
  border-radius: .5rem;
  margin-left: .3rem;
  cursor: pointer;
  text-align: center;
}

.header .icon div:hover {
    color: #fff;
    background: #27ae60 !important;
}
</style>