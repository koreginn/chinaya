<template>
  <main>
    <section class="basket">
      <h1 class="basket-title">Корзина</h1>
      <div v-if="basket == null" class="basket-empty">
        <img class="basket-empty__image" src="@/assets/img/basket.empty.png" alt="Пустая корзина" />
        <h2 class="basket-empty__title">В вашей корзине ещё нет товаров...</h2>
        <p
          class="basket-empty__text"
        >Главная цель вашей корзины - хранить классные товары, которые вы можете купить в нашем магазине. Порадуйте корзину своим выбором, ищите кнопки «В корзину» на сайте!</p>
      </div>
      <div v-if="basket != null" class="basket-menu">
        <div @click="continueProcessing()" class="basket-menu__action">
          <div class="basket-return__icon">
            <i class="fas fa-wallet"></i>
          </div>
          <span>Перейти к оформлению</span>
        </div>
        <div @click="deleteBasket()" class="basket-menu__action">
          <i class="fas fa-trash-alt"></i>
          <span>Очистить корзину</span>
        </div>
      </div>
      <div v-if="basket != null" class="basket-goods">
        <div v-for="(item, index) in basketOrder" v-bind:key="index" class="basket-goods__block">
          <span class="basket-goods__block-number">{{ index + 1 }}.</span>
          <div class="basket-goods__block-description">
            <router-link class="photo-good__basket" v-bind:to="'/about-good/' + item.id_good">
              <img class="basket-goods__block-image" :src="item.photo" alt="Фотография чая" />
            </router-link>
            <div class="basket-goods__block-text">
              <h2>{{ item.title }}</h2>
            </div>
          </div>
          <div class="basket-goods__info-text">
            <p v-if="item.status <= 5">
              <b>{{ item.box }}</b> упаков. по
              <b>{{ item.gram }}</b>г.
            </p>
            <p v-if="item.status >= 6">
              <b>{{ item.box }}</b>шт.
            </p>
          </div>
          <span class="basket-goods__block-price">{{ item.price * (item.box * item.gram) }}₽</span>
          <i
            @click="deleteGoodFromBasket(item.id_product, item.price, item.box, item.gram)"
            class="far fa-times-circle basket-goods__block-delete"
          ></i>
        </div>
      </div>
      <div v-if="basket != null" class="basket-total__pay">
        <span class="basket-total__pay-text">Итого к оплате:</span>
        <span class="basket-total__pay-value">{{ total_price }}₽</span>
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
@import "../assets/css/basket.css";
</style>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "Корзина"
  },
  data: () => ({
    basket: [],
    basketOrder: [],
    modalStatus: false,
    textModalStatus: "",
    total_price: null
  }),
  created() {
    axios
      .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/basket", {
        id_user: this.$store.getters.getUserID
      })
      .then(response => {
        if (response.data["status"] == "Empty") {
          this.basket = null;
          this.basketOrder = null;
        } else {
          this.basket = response.data["basket"];
          this.basketOrder = response.data["basket_orders"];
          this.total_price = this.basket[0]["total_price"];
        }
      });
  },
  methods: {
    continueProcessing() {
      this.$store.commit(
        "setNumberProduct",
        this.basketOrder[0]["id_number_order"]
      );
      this.$router.push("/order-payment");
    },
    deleteBasket() {
      axios
        .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/all-delete-basket", {
          id_number_order: this.basketOrder[0]["id_number_order"]
        })
        .then(response => {
          this.$store.commit("deleteBasket");
          this.basket = response.data["basket"];
          this.basketOrder = response.data["basket_orders"];
          this.total_price = null;
          this.textModalStatus = "Корзина очищена!";
          this.modalStatus = true;
          setTimeout(() => (this.modalStatus = false), 2000);
        });
    },
    deleteGoodFromBasket(id, price, box, gram) {
      axios
        .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/delete-basket", {
          id_number_order: this.basketOrder[0]["id_number_order"],
          id_product: id,
          total_price: price * (box * gram)
        })
        .then(response => {
          this.$store.commit("deleteGoodFromBasket");
          this.basket = response.data["basket"];
          this.basketOrder = response.data["basket_orders"];

          if (this.basket == null && this.basketOrder == null) {
            this.total_price = null;
          } else {
            this.total_price = this.basket[0]["total_price"];
          }

          this.textModalStatus = "Товар удалён из корзины!";
          this.modalStatus = true;
          setTimeout(() => (this.modalStatus = false), 2000);
        });
    }
  }
};
</script>
