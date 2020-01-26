<template
  >
  <main>
    <section class="good">
      <div class="good-breadcrumb">
        <ul class="good-breadcrumb__menu">
          <li @click="returnToPage()" class="good-breadcrumb__menu-item">Главная</li>
          <li class="good-breadcrumb__menu-item">
            <i class="fas fa-chevron-right"></i>
          </li>
          <li @click="returnToCatalog()" class="good-breadcrumb__menu-item">Каталог</li>
          <li class="good-breadcrumb__menu-item">
            <i class="fas fa-chevron-right"></i>
          </li>
          <li class="good-breadcrumb__menu-item active-item">{{ titleProduct }}</li>
        </ul>
      </div>
      <div v-for="(item, index) in product" v-bind:key="index" class="good-about">
        <div class="good-about-information">
          <img class="good-about__image" :src="item.photo" alt="Чай" />
          <div class="good-about__price">
            <h2 class="good-about__price-title">{{ item.title }}</h2>
            <span class="good-about__price-value">
              Цена:
              <span v-if="item.status <= 5" class="price-add">{{ item.price }}руб. за 1 грамм</span>
              <span v-if="item.status >= 6" class="price-add">{{ item.price }}руб. за 1 штуку</span>
            </span>
            <span class="good-about__category">
              Категория:
              <span class="price-add">{{ item.name_categories }}</span>
            </span>
            <div v-if="item.status <= 5" class="basket-goods__block-edit-good">
              <p class="good-box__text">Количество грамм:</p>
              <div class="catalog-goods__items-select">
                <span
                  v-bind:class="{ activegram: activeQuantityGram == 10 }"
                  @click="selectGram(10)"
                >10г.</span>
                <span
                  v-bind:class="{ activegram: activeQuantityGram == 25 }"
                  @click="selectGram(25)"
                >25г.</span>
                <span
                  v-bind:class="{ activegram: activeQuantityGram == 50 }"
                  @click="selectGram(50)"
                >50г.</span>
              </div>
            </div>
            <div v-if="item.status <= 5" class="good-box__select-quantity">
              <p class="good-box__text">Количество упаковок:</p>
              <div class="good-box__select-block">
                <i @click="editBox(-1)" class="fas fa-minus"></i>
                <span>{{ activeQuantityBox }}</span>
                <i @click="editBox(1)" class="fas fa-plus"></i>
              </div>
            </div>
            <div class="block-button__basket">
              <button @click="inBasketGood(item.id_good)" class="good-about__button">В корзину</button>
              <p v-if="item.status <= 5">
                Итоговая сумма:
                <b>{{ totalPrice }}</b>
              </p>
            </div>
          </div>
        </div>
        <div class="good__about-descrition">
          <h3 class="good__about-descrition-title">Описание и приготовление</h3>
          <p class="good__about-descrition-text">{{ item.description }}</p>
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
@import "../assets/css/about-good.css";
</style>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "О товаре"
  },
  props: ["date"],
  data: () => ({
    product: [],
    categoriesProduct: [],
    statusProduct: [],
    titleProduct: "",
    activeQuantityGram: null,
    activeQuantityBox: 1,
    modalStatus: false,
    textModalStatus: ""
  }),
  created() {
    axios
      .get(
        "https://api.xn----7sba9au1d3c.xn--p1ai/api/goods/" +
          this.$route.params.id
      )
      .then(responce => {
        if (responce.data["status"] == "Error") {
          this.$router.push("/404");
        } else {
          if (responce.data[0]["status"] <= 5) {
            this.product = responce.data;
            this.titleProduct = responce.data[0]["title"];
          }

          if (responce.data[0]["status"] >= 6) {
            this.activeQuantityGram = 1;
            this.activeQuantityBox = 1;
            this.product = responce.data;
            this.titleProduct = responce.data[0]["title"];
          }
        }
      });
    axios
      .get("https://api.xn----7sba9au1d3c.xn--p1ai/api/categories")
      .then(responce => {
        this.categoriesProduct = responce.data;
      });
    axios
      .get("https://api.xn----7sba9au1d3c.xn--p1ai/api/status-product")
      .then(responce => {
        this.statusProduct = responce.data;
        this.options = responce.data;
      });
  },
  computed: {
    totalPrice() {
      return (
        this.product[0]["price"] *
        (this.activeQuantityGram * this.activeQuantityBox)
      );
    }
  },
  methods: {
    returnToCatalog() {
      this.$router.push("/catalog");
    },
    returnToPage() {
      this.$router.push("/");
    },
    editBox(number) {
      if (this.activeQuantityGram == null) {
        this.textModalStatus = "Выберите количество грамм!";
        this.modalStatus = true;
        setTimeout(() => (this.modalStatus = false), 2000);
      } else {
        if (this.activeQuantityGram == 10) {
          this.activeQuantityBox += number;

          if (this.activeQuantityBox == 21) {
            this.textModalStatus = "Нельзя купить больше 200грамм!";
            this.modalStatus = true;
            setTimeout(() => (this.modalStatus = false), 2000);
            this.activeQuantityBox = 20;
          }

          if (this.activeQuantityBox == 0) {
            this.textModalStatus = "Нельзя купить 0грамм!";
            this.modalStatus = true;
            setTimeout(() => (this.modalStatus = false), 2000);
            this.activeQuantityBox = 1;
          }
        }

        if (this.activeQuantityGram == 25) {
          this.activeQuantityBox += number;

          if (this.activeQuantityBox == 9) {
            this.textModalStatus = "Нельзя купить больше 200грамм!";
            this.modalStatus = true;
            setTimeout(() => (this.modalStatus = false), 2000);
            this.activeQuantityBox = 8;
          }

          if (this.activeQuantityBox == 0) {
            this.textModalStatus = "Нельзя купить 0грамм!";
            this.modalStatus = true;
            setTimeout(() => (this.modalStatus = false), 2000);
            this.activeQuantityBox = 1;
          }
        }

        if (this.activeQuantityGram == 50) {
          this.activeQuantityBox += number;

          if (this.activeQuantityBox == 5) {
            this.textModalStatus = "Нельзя купить больше 200грамм!";
            this.modalStatus = true;
            setTimeout(() => (this.modalStatus = false), 2000);
            this.activeQuantityBox = 4;
          }

          if (this.activeQuantityBox == 0) {
            this.textModalStatus = "Нельзя купить 0грамм!";
            this.modalStatus = true;
            setTimeout(() => (this.modalStatus = false), 2000);
            this.activeQuantityBox = 1;
          }
        }
      }
    },
    selectGram(number) {
      this.activeQuantityBox = 1;
      this.activeQuantityGram = number;
    },
    inBasketGood(id) {
      if (this.$store.getters.getAuth == false) {
        this.$store.commit("modalAuth");
      } else {
        if (
          this.totalPrice != "" &&
          this.activeQuantityGram != "" &&
          this.activeQuantityBox != ""
        ) {
          axios
            .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/add-basket", {
              id_user: this.$store.getters.getUserID,
              total_price: this.totalPrice,
              id_product: id,
              box: this.activeQuantityBox,
              gram: this.activeQuantityGram
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
        } else {
          this.textModalStatus = "Укажите данные!";
          this.modalStatus = true;
          setTimeout(() => (this.modalStatus = false), 2000);
        }
      }
    }
  }
};
</script>
