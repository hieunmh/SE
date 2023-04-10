export default {
  scrollToTop() {
    window.scrollTo(0, 0);
  },
  setUser(state, matchUser) {
    state.user = matchUser;
  },
  setEmail(state, userEmail) {
    state.email = userEmail;
  },
  setFoods(state, products) {
    state.allFoods = products;
  },
  setAdmin(state,admin) {
    state.admin = admin;
  }
}