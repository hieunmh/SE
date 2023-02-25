<template>
  <div class="header">
    <nav class="nav-bar">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/">About</RouterLink>
      <RouterLink to="/">Menu</RouterLink>
      <RouterLink to="/">Promotions</RouterLink>
      <RouterLink to="/">Table</RouterLink>
    </nav>
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

.header .nav-bar a {
  font-size: 1.7rem;
  margin: 0 1rem;
  color: #666;
}

.header .nav-bar a:hover {
  color: #27ae60;
}

</style>