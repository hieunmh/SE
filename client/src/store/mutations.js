export default {
  scrollToTop() {
    window.scrollTo(0, 0);
  },
  setUser(state, matchUser) {
    state.user = matchUser;
  },
  setFoods(state, products) {
    state.allFoods = products;
  },
  setCategory(state, category) {
    state.category = category;
  },
  setAdmin(state, admin) {
    state.admin = admin;
  },
  setLogged(state, isLogin) {
    state.isLogin = isLogin;
  },
  setShowProduct(state, showpro) {
    state.showProduct = showpro;
  },
  setShowOrderDetail(state, orderDetail) {
    state.showOrderDetail = orderDetail;
  },
  setShowAlert(state, showAlert) {
    state.showAlert = showAlert;
  },
  setCartLength(state, length) {
    state.cartLength = length;
  },
  setCartItem(state, cartItem) {
    state.cartItem = cartItem;
  },
  setShowAlertEditInfo(state, showAlertEditInfo) {
    state.showAlertEditInfo = showAlertEditInfo;
  },
  setShowAlertEditPass(state, showAlertEditPass) {
    state.showAlertEditPass = showAlertEditPass;
  },
  setLoading(state, loading) {
    setTimeout(() => {
      state.loading = false;
    }, 1000);
  },
  setShowLoading(state, showLoading) {
    state.showLoading = showLoading;
  },
  setShowSearchLoading(state, showSearchLoading) {
    state.showSearchLoading = showSearchLoading;
  }
};