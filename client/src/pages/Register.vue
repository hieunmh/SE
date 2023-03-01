<template>
  <div class = "register">
    <div class = "register-form">
      <form id="registerForm" action="">
        <h3>Tao tai khoan</h3>

        <div class = "form-group">
          <label for="userName">Nhap ten cua ban:</label>
          <input type="text" class = "form-control" id="userName" placeholder="VD: Nguyen Minh Hieu">
        </div>
        
        <div class = "form-group">
          <label for="userEmail">Nhap email cua ban:</label>
          <input type="email" class = "form-control" id="userEmail" placeholder="VD: hieu@gmail.com">
        </div>

        <div class = "form-group">
          <label for="userPass">Nhap mat khau cua ban:</label>
          <input type="text" class = "form-control" id="userPass" placeholder="Nhap mat khau cua ban">
        </div>

        <div class = "form-group">
          <label for="userPassConfirm">Nhap lai mat khau cua ban:</label>
          <input type="password" class = "form-control" id="userPassconfirm" placeholder="Nhap lai mat khau cua ban">
        </div>

        <div class = "form-group">
          <label for="userPhonenumber">Nhap so dien thoai cua ban:</label>
          <input type="tel" class = "form-control" id="userPhonenumber" placeholder="VD: 0123456789">
        </div>

        <div class = "form-group">
          <label for="userBirth">Nhap ngay sinh cua ban:</label>
          <input type="date" class = "form-control" id="userBirth" placeholder="Nhap ngay sinh cua ban">
        </div>

        <div class = "form-group">
          <label for="">Chon gioi tinh cua ban</label>
          <div>
            <input type="radio" name="gender" id="maleGender"><span>Nam</span>
            <input type="radio" name="gender" id="femaleGender"><span>Nu</span>
            <input type="radio" name="gender" id="otherGender"><span>Khac</span>
          </div>
        </div>

        <div class="form-group">
          <input type="submit" value="Dang ky" class="btnn">
          <p>Ban da co tai khoan? <RouterLink to="/login">Dang nhap</RouterLink></p>
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
  padding: 2rem 9%;
  .register-form {
    background-color: #fff;
    height: 90vh;
    form {
      position: relative;
      background-color: #f4f4f4;
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
        width: 4rem;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.5rem;
        padding-left: 0.7rem;
        padding-right: 3rem;
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
        padding: 2rem 1rem;
        font-size: 1.5rem;
        color: #130f40;
        text-transform: none;
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
      label {
        font-size: 1.8rem;
        margin: 0;
        padding: 0;
        margin-left: 0.5rem;
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
      .form-group {
        margin: 0;
      }
    }
  }
}

</style>