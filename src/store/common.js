/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
export default {
  mutations: {
    logout(state) {
      state.auth = false;
      state.photoUser = null;
      state.nameUser = null;
      state.nameUser = null;
      state.userID = null;
      state.goodInBasket = null;
      state.numberBasket = null;
      state.emailUser = null;
      state.orderValue = null;
      state.bonus = null;
    },
    login(state, id) {
      state.auth = true;
    },
    modalAuth(state) {
      state.modalAuth = !state.modalAuth;
    },
    setDataUser(state, data) {
      state.photoUser = data[0].photo;
      state.nameUser = data[0].name + " " + data[0].surname.slice(0, 1);
      state.userID = data[0].id;
      state.emailUser = data[0].email;
      state.bonus = data[0].bonus;
    },
    setValueBasket(state, value) {
      state.goodInBasket = value;
    },
    setGoodInBasket(state) {
      state.goodInBasket += 1;
    },
    deleteGoodFromBasket(state) {
      state.goodInBasket -= 1;
    },
    deleteBasket(state) {
      state.goodInBasket = 0;
    },
    setNumberProduct(state, number) {
      state.numberBasket = number;
    },
    setOrderValue(state, value) {
      state.orderValue = value;
    },
    setMenuMobile(state) {
      state.modalMenuMobile = !state.modalMenuMobile;
    }
  },
  getters: {
    getAuth: state => state.auth,
    getStatusModalAuth: state => state.modalAuth,
    getPhotoUser: state => state.photoUser,
    getNameUser: state => state.nameUser,
    getUserID: state => state.userID,
    getBasketGoods: state => state.goodInBasket,
    getNumberBasket: state => state.numberBasket,
    getEmailUser: state => state.emailUser,
    getLastOrderValue: state => state.orderValue,
    getBonus: state => state.bonus,
    getMenuMobile: state => state.modalMenuMobile
  },
  state: {
    auth: false,
    modalAuth: false,
    photoUser: null,
    nameUser: null,
    userID: null,
    goodInBasket: 0,
    numberBasket: null,
    emailUser: null,
    orderValue: null,
    bonus: null,
    modalMenuMobile: false
  }
};
