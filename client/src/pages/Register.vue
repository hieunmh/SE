<template>
  <div class = "register">
    <div class = "register-form">
      <form action="">
        <h3>Hieuhub</h3>
        <div class = "form-group">
          <span class = "fas fa-user"></span>
          <input type="text" class = "form-control" id="" placeholder="Enter your full name">
        </div>
        
        <div class = "form-group">
          <span class = "fas fa-user"></span>
          <input type="email" class = "form-control" id="" placeholder="Enter your email">
        </div>

        <div class = "form-group">
          <span class = "fas fa-user"></span>
          <input type="text" class = "form-control" id="" placeholder="Enter your phone number">
        </div>

        <div class = "form-group">
          <span class = "fas fa-lock"></span>
          <input type="password" class = "form-control" id="" placeholder="Enter your password">
        </div>

      </form>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss">
.register {
  position: relative;
  padding: 2rem 9%;
  .register-form {
    background-color: #fff;
    height: 90vh;
    form {
      background-color: #f4f4f4;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 40rem;
      width: 100%;
      box-shadow: -0.5rem -0.5rem 1rem rgba($color: #000000, $alpha: 0.1),  0.5rem 0.5rem 1rem rgba($color: #000000, $alpha: 0.1);
      border: 0.1rem solid rgba($color: #000000, $alpha: 0.05);
      padding: 2rem;
      border-radius: 1rem;
      animation: fadeUp 0.4s linear;
      span {
        position: absolute;
        left: 3rem;
        width: 4rem;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.5rem;
      }
      h3 {
        padding-bottom: 1rem;
        font-size: 2rem;
        font-weight: bolder;
        text-transform: uppercase;
        color: #130f40;
        margin: 0;
      }
      .form-control {
        margin: 0.7rem 0;
        border-radius: 1rem;
        background-color: #f4f4f4;
        padding: 2rem 3.5rem;
        font-size: 1.5rem;
        color: #130f40;
        transform: none;
        width: 100%;
        border: none;
        box-shadow: inset 0.2rem 0.2rem 0.2rem #b3b3b3, inset -0.2rem -0.2rem 0.2rem #fff;
      }
      .btnn {
        width: 100%;
        margin-top: 1rem;
        margin-bottom: 1rem;
        border-radius: 1rem;
      }
      p {
        text-align: center;
        padding-top: 1rem;
        font-size: 1.5rem;
        color: #666;
        margin: 0;
        a {
          color: #27ae60;
          &:hover {
            color: #f38609;
            text-decoration: underline;
          }
        }
      }
    }
  }
}

</style>