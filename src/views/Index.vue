<template>
  <main>
    <section class="photo-slider">
      <div class="photo-slider__background">
        <img src="@/assets/img/bg.jpg" alt="Фото слайдера" />
      </div>
      <div class="photo-slider__text">
        <h1 class="photo-slider__title">Добро пожаловать в мир чая Ростова-на-Дону</h1>
        <router-link to="/history">
          Подробнее
          <i class="fas fa-chevron-right"></i>
        </router-link>
      </div>
    </section>
    <section class="tea-about">
      <div class="tea-about__size">
        <h2 class="tea-about__title">Поможем выбрать чай</h2>
        <div class="tea-about__blocks">
          <div class="tea-about__block">
            <div class="tea-about__block-fisrt">
              <img src="@/assets/img/index/kettle.jpg" alt="Чайник" />
            </div>
            <div class="tea-about__block-second tea-about__first-post">
              <h3>Кто такой чайный мастер?</h3>
              <p class="tea-about__text">Это человек, увлеченный...</p>
              <a
                class="tea-about__block-link"
                href="https://vk.com/chinaya_tc?w=wall-120964254_1905%2Fall"
              >
                <i class="fas fa-chevron-right"></i>
              </a>
            </div>
          </div>
          <div class="tea-about__block">
            <div class="tea-about__block-fisrt">
              <img src="@/assets/img/index/tea-fon.jpg" alt="Чайная Церемония" />
            </div>
            <div class="tea-about__block-second tea-about__second-post">
              <h3>Что такое чайная церемония?</h3>
              <p class="tea-about__text">Что такое чайная церемония и что в ней особенного?</p>
              <a
                class="tea-about__block-link"
                href="https://vk.com/chinaya_tc?w=wall-120964254_1912%2Fall"
              >
                <i class="fas fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="tea-new">
      <div class="tea-new__size">
        <h2 class="tea-new__title">Новинки чая</h2>
        <div class="tea-new__blocks">
          <div v-for="item in lastGoods" v-bind:key="item.id_good" class="tea-new__block">
            <router-link v-bind:to="'/about-good/' + item.id_good">
              <img :src="item.photo" alt="Фотография чая" />
            </router-link>
            <span class="tea-new__category">{{ item.name_categories }}</span>
            <span class="tea-new__name">{{ item.title }}</span>
            <span class="tea-new__price">{{ item.price }} ₽</span>
            <button
              @click="inBasketGood(item.id_good, item.price, item.status)"
              class="tea-new__in-basket"
            >В корзину</button>
          </div>
        </div>
      </div>
    </section>
    <section class="welcome">
      <div class="welcome__size">
        <h2 class="welcome__title">Мы ждём вас</h2>
        <div class="welcome-blocks">
          <div class="welcome-blocks__item">
            <div class="welcome-blocks__item-first">
              <img src="@/assets/img/index/banner1.jpg" alt="Баннер" />
            </div>
            <div class="welcome-blocks__item-second">
              <h4 class="welcome-blocks__item-title">Бонусная система</h4>
              <p
                class="welcome-blocks__item-text"
              >Бонусная система работает при покупки товаров в нашем интернет-магазине и оплатить до 50% бонусами</p>
            </div>
          </div>
          <div class="welcome-blocks__item">
            <div class="welcome-blocks__item-first">
              <img src="@/assets/img/index/banner2.jpg" alt="Баннер" />
            </div>
            <div class="welcome-blocks__item-second">
              <h4 class="welcome-blocks__item-title">Оплата онлайн</h4>
              <p
                class="welcome-blocks__item-text"
              >Мы можете оплатить понравишейся вам товар любым спобом и получить 1% от полной стоимости заказа бонусами на бонусный счёт</p>
            </div>
          </div>
          <div class="welcome-blocks__item">
            <div class="welcome-blocks__item-first">
              <img src="@/assets/img/index/banner3.jpg" alt="Баннер" />
            </div>
            <div class="welcome-blocks__item-second">
              <h4 class="welcome-blocks__item-title">Большой ассортимент</h4>
              <p
                class="welcome-blocks__item-text"
              >В нашем магазине огромное количество разнообразного и наулучшего качества чая на любой вкус и цвет</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <transition name="fade">
      <div v-if="modalStatus != false" class="payment-modal">
        <div class="modal-payment">
          <i class="fas fa-bell"></i>
          <span>{{ textModalStatus }}</span>
        </div>
      </div>
    </transition>
  </main>
</template>

<style>
@import "../assets/css/index.css";
</style>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "Главная"
  },
  data: () => ({
    lastGoods: [],
    textModal: "",
    modalStatus: false,
    textModalStatus: ""
  }),
  created() {
    axios
      .get("https://api.xn----7sba9au1d3c.xn--p1ai/api/last-new-goods")
      .then(responce => {
        this.lastGoods = responce.data;
      });
  },
  methods: {
    inBasketGood(id, price, status) {
      if (this.$store.getters.getAuth == false) {
        this.$store.commit("modalAuth");
      } else {
        if (status <= 5) {
          axios
            .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/add-basket", {
              id_user: this.$store.getters.getUserID,
              total_price: price * (10 * 1),
              id_product: id,
              box: 1,
              gram: 10
            })
            .then(response => {
              if (response.data["status"] == "Successfully") {
                this.$store.commit("setGoodInBasket");
                this.textModalStatus = "Товар добавлен в корзину!";
                this.modalStatus = true;
                setTimeout(() => (this.modalStatus = false), 2000);
              } else {
                this.textModalStatus = "Товар уже в корзине!";
                this.modalStatus = true;
                setTimeout(() => (this.modalStatus = false), 2000);
              }
            });
        }

        if (status >= 6) {
          axios
            .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/add-basket", {
              id_user: this.$store.getters.getUserID,
              total_price: price,
              id_product: id,
              box: 1,
              gram: 1
            })
            .then(response => {
              if (response.data["status"] == "Successfully") {
                this.$store.commit("setGoodInBasket");
                this.textModalStatus = "Товар добавлен в корзину!";
                this.modalStatus = true;
                setTimeout(() => (this.modalStatus = false), 2000);
              } else {
                this.textModalStatus = "Товар уже в корзине!";
                this.modalStatus = true;
                setTimeout(() => (this.modalStatus = false), 2000);
              }
            });
        }
      }
    }
  }
};
</script>
