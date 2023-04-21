<template>
  <div class="flower-spinner-search">
    <div class="dots-container">
      <div class="bigger-dot">
        <div class="smaller-dot"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.flower-spinner-search,
.flower-spinner-search * {
  box-sizing: border-box;
}

.flower-spinner-search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.flower-spinner-search .dots-container {
  height: calc(70px / 7);
  width: calc(70px / 7);
}

.flower-spinner-search .smaller-dot {
  background: #ff1d5e;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  animation: flower-spinner-smaller-dot-animation 2.5s 0s infinite both;

}

.flower-spinner-search .bigger-dot {
  background: #ff1d5e;
  height: 100%;
  width: 100%;
  padding: 10%;
  border-radius: 50%;
  animation: flower-spinner-bigger-dot-animation 2.5s 0s infinite both;
}

@keyframes flower-spinner-bigger-dot-animation {

  0%,
  100% {
    box-shadow: rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px;
  }

  50% {
    transform: rotate(180deg);
  }

  25%,
  75% {
    box-shadow: rgb(255, 29, 94) 26px 0px 0px,
      rgb(255, 29, 94) -26px 0px 0px,
      rgb(255, 29, 94) 0px 26px 0px,
      rgb(255, 29, 94) 0px -26px 0px,
      rgb(255, 29, 94) 19px -19px 0px,
      rgb(255, 29, 94) 19px 19px 0px,
      rgb(255, 29, 94) -19px -19px 0px,
      rgb(255, 29, 94) -19px 19px 0px;
  }

  100% {
    transform: rotate(360deg);
    box-shadow: rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px;
  }
}

@keyframes flower-spinner-smaller-dot-animation {

  0%,
  100% {
    box-shadow: rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px;
  }

  25%,
  75% {
    box-shadow: rgb(255, 29, 94) 14px 0px 0px,
      rgb(255, 29, 94) -14px 0px 0px,
      rgb(255, 29, 94) 0px 14px 0px,
      rgb(255, 29, 94) 0px -14px 0px,
      rgb(255, 29, 94) 10px -10px 0px,
      rgb(255, 29, 94) 10px 10px 0px,
      rgb(255, 29, 94) -10px -10px 0px,
      rgb(255, 29, 94) -10px 10px 0px;
  }

  100% {
    box-shadow: rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px,
      rgb(255, 29, 94) 0px 0px 0px;
  }
}</style>