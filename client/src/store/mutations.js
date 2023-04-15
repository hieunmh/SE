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
  setAdmin(state, admin) {
    state.admin = admin;
  },
  setLogged(state, isLogin) {
    state.isLogin = isLogin;
  }
};