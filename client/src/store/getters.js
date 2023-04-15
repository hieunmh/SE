export default {
  getAdmin(state) {
    return state.admin;
  },

  getLogged(state) {
    return state.isLogin;
  },

  getUser(state) {
    return state.user;
  }

}