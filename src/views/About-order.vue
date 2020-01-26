<template>
  <main>
    <section class="order">
      <div class="common-return">
        <i class="fas fa-arrow-left"></i>
        <router-link to="/profile">Назад</router-link>
      </div>
      <div class="order-user">
        <div class="order-user__header">
          <h2>Данные о заказе</h2>
        </div>
        <div class="order-user__text order-user__header-items">
          <span>Название товара</span>
          <span>Упаковок</span>
          <span>Количество</span>
          <span>Цена</span>
        </div>
        <div v-for="item in orderData" v-bind:key="item.id_product" class="order-user__information">
          <div class="order-user__description">
            <span class="order-user__description-text order-user__items">{{ item.title }}</span>
            <span
              v-if="item.status <= 5"
              class="order-user__description-text order-user__items"
            >{{ item.box }}</span>
            <span v-if="item.status >= 6" class="order-user__description-text order-user__items">0</span>
            <span
              v-if="item.status <= 5"
              class="order-user__description-text order-user__items"
            >{{ item.gram }}г.</span>
            <span
              v-if="item.status >= 6"
              class="order-user__description-text order-user__items"
            >{{ item.gram }}шт.</span>
            <span
              class="order-user__description-text order-user__items"
            >{{ item.price * item.box * item.gram }} ₽</span>
          </div>
        </div>
      </div>
      <div class="order-user">
        <div class="order-user__header">
          <h2>Данные об оплате</h2>
        </div>
        <div class="order-user__text">
          <span>Дата заказа</span>
          <span>Скидка</span>
          <span>Итоговая сумма</span>
          <span>Статус оплаты</span>
        </div>
        <div class="order-user__information">
          <div class="order-user__description">
            <span class="order-user__description-text">{{ dataDelivery['created_at'] }}</span>
            <span class="order-user__description-text">{{ dataDelivery['sale'] }}%</span>
            <span class="order-user__description-text">{{ dataDelivery['total_price'] }}</span>
            <span
              v-if="dataDelivery['id_status'] == 7"
              class="order-user__description-text"
            >Не оплачено</span>
            <span
              v-if="dataDelivery['id_status'] >= 8"
              class="order-user__description-text"
            >Оплачено</span>
          </div>
        </div>
      </div>
      <div class="trackcode">
        <img class="trackcode__image" src="@/assets/img/track.png" />
        <span v-if="dataDelivery['trackcode'] != null" class="trackcode__text">Номер отслеживания:</span>
        <span
          v-if="dataDelivery['trackcode'] == null"
          class="trackcode__text"
        >Номер отслеживания временно не доступен</span>
        <span
          v-if="dataDelivery['trackcode'] != null"
          class="trackcode__value"
        >{{ dataDelivery['trackcode'] }}</span>
      </div>
      <div class="problems-with-order">
        <img src="@/assets/img/mark.png" alt="Восклицательный знак" />
        <p>
          Если возникли проблемы с заказом обратитесь в
          <router-link class="problems-with-order__link" to="/support">службу поддержки</router-link>
        </p>
      </div>
    </section>
  </main>
</template>

<style>
@import "../assets/css/about-order.css";
</style>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "О заказе"
  },
  props: ["date"],
  data: () => ({
    orderData: [],
    dataDelivery: []
  }),
  created() {
    if (this.$store.getters.getAuth == false) {
      this.$router.push("/404");
    } else {
      axios
        .post(
          "https://api.xn----7sba9au1d3c.xn--p1ai/api/order/" +
            this.$route.params.id
        )
        .then(responce => {
          if (responce.data["status"] == "Error") {
            this.$router.push("/404");
          } else {
            this.orderData = responce.data;
            this.dataDelivery = responce.data[0];
          }
        });
    }
  }
};
</script>
