<template>
  <div>
    <div class="home-main">
      <div class="content">
        <span>Home page</span>
        <h3>SIUUUUUUUUUUUU</h3>
        <p>Welcome to league of Draven</p>
        <RouterLink to="/menu">Menu</RouterLink>
      </div>

      <div class="image">
        <img src="../assets/images/b.png" class="home-img-1">
        <img src="../assets/images/a.png" class="home-img-2">
      </div>
    </div>
    
    <div class="home-category">
      <RouterLink to="/" class="box">
        <img src="../assets/images/taco-img.png" alt="">
        <h3>Banh xeo</h3>
      </RouterLink>

      <RouterLink to="/" class="box">
          <img src="../assets/images/taco-img.png" alt="">
          <h3>Banh xeo</h3>
        </RouterLink>

      <RouterLink to="/" class="box">
        <img src="../assets/images/taco-img.png" alt="">
        <h3>Banh xeo</h3>
      </RouterLink>

      <RouterLink to="/" class="box">
        <img src="../assets/images/taco-img.png" alt="">
        <h3>Banh xeo</h3>
      </RouterLink>

      <RouterLink to="/" class="box">
        <img src="../assets/images/taco-img.png" alt="">
        <h3>Banh xeo</h3>
      </RouterLink>

      <RouterLink to="/" class="box">
        <img src="../assets/images/taco-img.png" alt="">
        <h3>Banh xeo</h3>
      </RouterLink>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'Home'
}
</script>
<style scoped>
.home-main,
.home-cateory {
  padding: 2rem 9%;
}
/** home main */
.home-main {
  display: flex;
  align-items: center;
  flex-wrap: wrap-reverse;
  gap: 2rem;
  position: relative;
  overflow: hidden;
}

.home-main .content {
  flex: 1 1 41rem;
}

.home-main .content span {
  font-size: 2rem;
  color: #27ae60;
}

.home-main .content h3 {
  font-size: 4rem;
  color: #130f40;
  padding-top: 1rem;
}

.home-main .content p {
  font-size: 1.4rem;
  color: #666;
  line-height: 2;
  padding: 1rem 0;
}

.home-main .image {
  flex: 1 1 41rem;
  margin: 2rem 0;
  pointer-events: none;
}

.home-main .image .home-img-1 {
  width: 100%;
  margin-top: 5rem;
}

.home-main .image .home-img-2 {
  position: absolute;
  top: -15rem;
  right: -15rem;
  width: 80vw;
}

/** home category */
.home-category {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1.5rem;
  padding-bottom: 5rem;
}
.home-category .box {
  padding: 2rem;
  text-align: center;
  border-radius: .5rem;
  background: #f7f7f7;
}

.home-category .box:hover {
    background: #27ae60;

}

.home-category .box:hover h3 {
  color: #fff;
}

.home-category .box img {
  height: 7rem;
}

@media (max-width: 768px) {
  #menu-btn {
      display: inline-block;
  }

  .home-main .home-img-2 {
      top: 0;
      right: 0;
      width: 100%;
  }
}

@media (max-width: 576px) {
  .home-main .content h3 {
      font-size: 3rem;
  }

  .home-main .content p {
      font-size: 1.5rem;
  }
}
</style>