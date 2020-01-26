<template>
  <main>
    <section class="payment">
      <h1 class="payment-title">Оформление заказа</h1>
      <div class="payment-information">
        <div class="order-user">
          <div class="order-user__header">
            <h2>Данные о заказе</h2>
          </div>
          <div class="order-user__text order-user__header-items">
            <span>Название товара</span>
            <span>Количество</span>
            <span>Упаковок</span>
            <span>Цена</span>
          </div>
          <div class="order-user__information">
            <div
              v-for="(item, index) in basketOrder"
              v-bind:key="index"
              class="order-user__description"
            >
              <span class="order-user__description-text order-user__items">{{ item.title }}</span>
              <span
                v-if="item.status <= 5"
                class="order-user__description-text order-user__items"
              >{{ item.gram }}г.</span>
              <span
                v-if="item.status >= 6"
                class="order-user__description-text order-user__items"
              >{{ item.gram }}шт.</span>
              <span
                v-if="item.status <= 5"
                class="order-user__description-text order-user__items"
              >{{ item.box }}</span>
              <span v-if="item.status >= 6" class="order-user__description-text order-user__items">0</span>
              <span
                class="order-user__description-text order-user__items"
              >{{ item.price * item.box * item.gram }} ₽</span>
            </div>
          </div>
        </div>
        <div class="order-user">
          <div class="order-user__header">
            <h2>Итоговая сумма</h2>
          </div>
          <div class="order-user__text order-user__header-items">
            <span>Итоговая сумма</span>
            <span>Скидка</span>
            <span v-if="useBonus != true">Промокод</span>
          </div>
          <div class="order-user__information">
            <div class="order-user__description">
              <span class="order-user__description-text order-user__items">{{ total_price_sale }}₽</span>
              <span class="order-user__description-text order-user__items">{{ promocodeValue }}%</span>
              <div
                v-if="useBonus != true"
                class="order-user__description-text order-user__promocode"
              >
                <form @submit.prevent="activatePromoCode()">
                  <input
                    v-model="name_sale"
                    class="order-user__promocode-input"
                    type="text"
                    placeholder="Промокод"
                  />
                  <input class="order-user__promocode-button" type="submit" value="Активировать" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <h3 class="delivery-data">Доставка</h3>
        <div class="data-delivery">
          <div
            v-bind:class="{ disableselect: selectDeliveruNumber == 2 }"
            class="data-delivery__new"
          >
            <p class="data-delivery__title">Укажите данные для доставки</p>
            <form @submit.prevent="changeDataDelivery" class="modal-auth__form new-delivery">
              <div class="modal-auth__size">
                <input class="modal-auth__input" v-model="cityUser" type="text" placeholder="Город" />
                <input
                  class="modal-auth__input"
                  v-model="regionUser"
                  type="text"
                  placeholder="Область"
                />
                <input
                  class="modal-auth__input"
                  v-model="addressUser"
                  type="text"
                  placeholder="Адрес"
                />
                <input
                  class="modal-auth__input"
                  v-model="flatUser"
                  type="text"
                  placeholder="Квартира"
                />
                <input
                  v-model="indexUser"
                  class="modal-auth__input"
                  type="text"
                  placeholder="Индекс"
                />
                <input
                  v-bind:class="{ disablebutton: selectDelivery == true }"
                  class="modal-auth__button"
                  type="submit"
                  value="Выбрать"
                />
              </div>
            </form>
          </div>
          <div
            v-bind:class="{ disableselect: selectDeliveruNumber == 1 }"
            v-if="delivery != null"
            class="data-delivery__old"
          >
            <p class="data-delivery__title">Вы можете использовать данные, которые указывались ранее</p>
            <div
              v-for="(item, index) in delivery"
              v-bind:key="index"
              class="data-delivery__old-datas"
            >
              <div class="data-delivery__old-data">
                <span class="data-delivery__old-text">Город:</span>
                <span class="data-delivery__old-value">{{ item.city }}</span>
              </div>
              <div class="data-delivery__old-data">
                <span class="data-delivery__old-text">Область:</span>
                <span class="data-delivery__old-value">{{ item.region }}</span>
              </div>
              <div class="data-delivery__old-data">
                <span class="data-delivery__old-text">Адрес:</span>
                <span class="data-delivery__old-value">{{ item.address }}</span>
              </div>
              <div class="data-delivery__old-data">
                <span class="data-delivery__old-text">Квартира:</span>
                <span class="data-delivery__old-value">{{ item.flat }}</span>
              </div>
              <div class="data-delivery__old-data">
                <span class="data-delivery__old-text">Индекс:</span>
                <span class="data-delivery__old-value">{{ item.index }}</span>
              </div>
            </div>
            <button
              v-bind:class="{ disablebutton: selectDelivery == true }"
              @click="oldDataDelivery()"
              class="data-delivery__old-button"
            >Выбрать</button>
          </div>
        </div>
        <h4 class="select-delivery__title">Способ получения</h4>
        <div class="select-delivery">
          <div
            v-bind:class="{ activeselectdilivery: selectDeliveryNumber == 1 }"
            @click="selectDeliveryNumber = 1"
            class="select-delivery__block"
          >
            <h5>Курьером</h5>
            <span class="select-delivery__text">В удобный для вас день и интервал времени</span>
            <span class="select-delivery__price">300 ₽</span>
          </div>
          <div
            v-bind:class="{ activeselectdilivery: selectDeliveryNumber == 2 }"
            @click="selectDeliveryNumber = 2"
            class="select-delivery__block"
          >
            <h5>СДЭК</h5>
            <span class="select-delivery__text">Наложенным платежом в размере стоимости доставки</span>
            <span class="select-delivery__price">от 200 ₽</span>
          </div>
          <div
            v-bind:class="{ activeselectdilivery: selectDeliveryNumber == 3 }"
            @click="selectDeliveryNumber = 3"
            class="select-delivery__block"
          >
            <h5>Почта России</h5>
            <span class="select-delivery__text">Наложенным платежом в размере стоимости доставки</span>
            <span class="select-delivery__price">от 200 ₽</span>
          </div>
        </div>
        <h5
          v-if="this.bonusValue != 0 && this.usePromoCode == false"
          class="pay-bonus__title"
        >Воспользуйтесь дополнительными возможностями</h5>
        <div v-if="this.bonusValue != 0 && this.usePromoCode == false" class="pay-bonus">
          <span v-if="this.originalTotalPrice < 1000">
            Использовать бонусные баллы (Можно списать до:
            <b>{{ (this.originalTotalPrice / 100) * 20 }}</b>)
          </span>
          <span v-if="this.originalTotalPrice >= 1000">
            Использовать бонусные баллы (Можно списать до:
            <b>{{ (this.originalTotalPrice / 100) * 50 }}</b>)
          </span>
          <div class="pay-bonus__block">
            <button
              v-bind:class="{ bonusactive: this.useBonus == true }"
              @click="useBonusSystem(true)"
              class="pay-bonus__block-button"
            >Да</button>
            <button
              v-bind:class="{ bonusactive: this.useBonus == false }"
              @click="useBonusSystem(false)"
              class="pay-bonus__block-button"
            >Нет</button>
          </div>
        </div>
        <span
          v-if="this.selectDeliveryNumber == 0"
          class="total_price__payment"
        >Итого: {{ this.total_price_sale }} ₽</span>
        <span
          v-if="this.selectDeliveryNumber == 1"
          class="total_price__payment"
        >Итого: {{ this.total_price_sale }} ₽ + 300 ₽ Доставка</span>
        <span
          v-if="selectDeliveryNumber >= 2"
          class="total_price__payment"
        >Итого: {{ this.total_price_sale }} ₽ + Наложенный платёж в размере стоимости доставки</span>
        <span @click="payOrder()" class="order-payment__button-pay">
          Оплатить
          <i class="fas fa-shopping-cart"></i>
        </span>
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
@import "../assets/css/order-payment.css";
</style>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "Оформление заказа"
  },
  data: () => ({
    modalStatus: false,
    textModalStatus: "",
    basket: [],
    basketOrder: [],
    delivery: [],
    cityUser: "",
    addressUser: "",
    regionUser: "",
    flatUser: "",
    indexUser: "",
    selectDelivery: false,
    selectDeliveruNumber: 0,
    selectDeliveryNumber: 0,
    name_sale: "",
    promocodeValue: 0,
    total_price_sale: null,
    useBonus: null,
    originalTotalPrice: 0,
    bonusValue: 0,
    usePromoCode: false,
    newBonusValue: 0
  }),
  created() {
    if (
      this.$store.getters.getAuth == false ||
      this.$store.getters.getBasketGoods == 0
    ) {
      this.$router.push("/404");
    } else {
      axios
        .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/order-payment", {
          id_user: this.$store.getters.getUserID,
          id_number_order: this.$store.getters.getNumberBasket
        })
        .then(response => {
          this.selectDelivery = false;
          this.selectDeliveruNumber = 0;
          this.basket = response.data["basket"];
          this.basketOrder = response.data["basket_orders"];
          this.delivery = response.data["delivery"];
          this.total_price_sale = this.basket[0]["total_price"];
          this.originalTotalPrice = this.basket[0]["total_price"];
          this.bonusValue = this.$store.getters.getBonus;
        });
    }
  },
  methods: {
    oldDataDelivery() {
      this.selectDelivery = true;
      this.selectDeliveruNumber = 2;
      this.textModalStatus = "Данные доставки выбраны!";
      this.modalStatus = true;
      setTimeout(() => (this.modalStatus = false), 2000);
    },
    activatePromoCode() {
      if (this.name_sale != "") {
        axios
          .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/promocode", {
            name_sale: this.name_sale
          })
          .then(response => {
            if (response.data["status"] == "Error") {
              this.textModalStatus = "Промокода не существует!";
              this.modalStatus = true;
              setTimeout(() => (this.modalStatus = false), 2000);
            } else {
              this.total_price_sale =
                this.total_price_sale -
                (this.total_price_sale / 100) * response.data["sale"];
              this.originalTotalPrice = this.total_price_sale;
              this.promocodeValue = response.data["sale"];
              this.usePromoCode = true;
              this.textModalStatus = "Вы успешно активировали промокод!";
              this.modalStatus = true;
              setTimeout(() => (this.modalStatus = false), 2000);
            }
          });
      } else {
        this.textModalStatus = "Введите промокод!";
        this.modalStatus = true;
        setTimeout(() => (this.modalStatus = false), 2000);
      }
    },
    changeDataDelivery() {
      if (
        this.cityUser != "" &&
        this.addressUser != "" &&
        this.regionUser != "" &&
        this.flatUser != "" &&
        this.indexUser != ""
      ) {
        axios
          .post(
            "https://api.xn----7sba9au1d3c.xn--p1ai/api/change-delivery-data",
            {
              email: this.$store.getters.getEmailUser,
              cityUser: this.cityUser,
              addressUser: this.addressUser,
              regionUser: this.regionUser,
              flatUser: this.flatUser,
              indexUser: this.indexUser
            }
          )
          .then(response => {
            if (response.data["status"] == "Successfully") {
              this.selectDelivery = true;
              this.selectDeliveruNumber = 1;
              this.textModalStatus = "Данные доставки выбраны!";
              this.modalStatus = true;
              setTimeout(() => (this.modalStatus = false), 2000);
            } else {
              this.textModalStatus =
                "Данные доставки не выбраны. Повторите попытку!";
              this.modalStatus = true;
              setTimeout(() => (this.modalStatus = false), 2000);
            }
          });
      } else {
        this.textModalStatus = "Укажите все данные!";
        this.modalStatus = true;
        setTimeout(() => (this.modalStatus = false), 2000);
      }
    },
    payOrder() {
      if (this.selectDelivery == true && this.selectDeliveryNumber != 0) {
        if (this.selectDeliveryNumber == 1) {
          this.total_price_sale += 300;
        }

        axios
          .post(
            "https://api.xn----7sba9au1d3c.xn--p1ai/api/order-registration",
            {
              id_user: this.$store.getters.getUserID,
              id_number_order: this.$store.getters.getNumberBasket,
              way_delivery: this.selectDeliveryNumber,
              total_price: this.total_price_sale,
              sale: this.promocodeValue,
              originalBonusValue: this.bonusValue,
              newBonusValue: this.newBonusValue
            }
          )
          .then(response => {
            if (response.data["status"] == "Successfully") {
              this.$store.commit("deleteBasket");
              this.$store.commit("setOrderValue", response.data["orderValue"]);
              this.$router.push("/successfully");
            } else {
              this.textModalStatus =
                "Что-то пошло не по плану. Повторите попытку!";
              this.modalStatus = true;
              setTimeout(() => (this.modalStatus = false), 2000);
            }
          });
      } else {
        this.textModalStatus = "Выбери способ доставки!";
        this.modalStatus = true;
        setTimeout(() => (this.modalStatus = false), 2000);
      }
    },
    useBonusSystem(value) {
      if (value == true) {
        this.useBonus = true;
        this.total_price_sale = this.originalTotalPrice;

        if (this.originalTotalPrice < 1000) {
          let twentyProcent = (this.originalTotalPrice / 100) * 20;

          if (this.bonusValue > twentyProcent) {
            let extra = this.bonusValue - twentyProcent;
            this.total_price_sale =
              this.originalTotalPrice - (this.bonusValue - extra);
            this.newBonusValue = this.bonusValue - extra;
          }

          if (this.bonusValue <= twentyProcent) {
            this.total_price_sale -= this.bonusValue;
            this.newBonusValue = this.bonusValue;
          }
        }

        if (this.originalTotalPrice >= 1000) {
          let fiftyProcent = (this.originalTotalPrice / 100) * 50;
          this;

          if (this.bonusValue > fiftyProcent) {
            let extra = this.bonusValue - fiftyProcent;
            this.total_price_sale =
              this.originalTotalPrice - (this.bonusValue - extra);
            this.newBonusValue = this.bonusValue - extra;
          }

          if (this.bonusValue <= fiftyProcent) {
            this.total_price_sale -= this.bonusValue;
            this.newBonusValue = this.bonusValue;
          }
        }
      }

      if (value == false) {
        this.useBonus = false;
        this.total_price_sale = this.originalTotalPrice;
      }
    }
  }
};
</script>
