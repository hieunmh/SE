import { createStore } from "vuex";

import state from "./state.js";
import mutations from "./mutations.js";
import actions from "./actions.js";


const store = createStore({
  state,
  mutations, 
  actions
});

export default store;