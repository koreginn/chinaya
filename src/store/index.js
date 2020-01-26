import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import common from "./common";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common
  },
  plugins: [createPersistedState()]
});
