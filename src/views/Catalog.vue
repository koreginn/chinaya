<template>
  <main>
    <section class="catalog">
      <div class="catalog-goods">
        <div class="catalog-goods__filter" v-if="openHeaderForMobile == true">
          <i
            v-if="width <= 1440"
            @click="openHeaderForMobile = !openHeaderForMobile"
            class="fas fa-times close-header__mobile"
          ></i>
          <h1 class="catalog-goods__filter-title">Чай</h1>
          <ul class="catalog-goods__filter-menu">
            <li
              v-for="(item, index) in categories"
              v-bind:key="index"
              v-show="item.refers_category == 1"
              class="catalog-goods__filter-menu__item"
              @click="
                filterCatalog(item.name_categories),
                  (openBreadcrumbTitle = true),
                  activeButtonSort = 0
              "
            >{{ item.name_categories }}</li>
          </ul>
          <h2 class="catalog-goods__filter-title h2-style">Чайная посуда и аксесуары</h2>
          <ul class="catalog-goods__filter-menu">
            <li
              v-for="(item, index) in categories"
              v-bind:key="index"
              v-show="item.refers_category == 2"
              class="catalog-goods__filter-menu__item"
              @click="
                filterCatalog(item.name_categories),
                  (openBreadcrumbTitle = true),
                  activeButtonSort = 0

              "
            >{{ item.name_categories }}</li>
          </ul>
          <span
            v-if="openBreadcrumbTitle == true"
            @click="cancelFilter()"
            class="cleaner-filter__button"
          >Показать все</span>
        </div>
        <div class="catalog-goods__items">
          <div class="catalog-goods__items-sort">
            <div class="catalog-breadcrumb">
              <ul class="catalog-breadcrumb__menu">
                <li @click="returnToPage()" class="catalog-breadcrumb__menu-item">Главная</li>
                <li class="catalog-breadcrumb__menu-item">
                  <i class="fas fa-chevron-right"></i>
                </li>
                <li
                  v-if="openBreadcrumbTitle == false"
                  class="catalog-breadcrumb__menu-item breadcrumb"
                >Каталог</li>
                <li
                  v-if="openBreadcrumbTitle == true"
                  @click="cancelFilter()"
                  class="catalog-breadcrumb__menu-item"
                >Каталог</li>
                <li class="catalog-breadcrumb__menu-item">
                  <i v-if="openBreadcrumbTitle == true" class="fas fa-chevron-right"></i>
                </li>
                <li
                  v-if="openBreadcrumbTitle == true"
                  class="catalog-breadcrumb__menu-item active-item"
                >{{ openBreadcrumbText }}</li>
              </ul>
            </div>
            <div class="catalog-goods__items-block">
              <h3 class="catalog-goods__items-title">Сортировать по:</h3>
              <div class="catalog-goods__items-select-catalog">
                <span
                  v-bind:class="{ activesortspan: activeButtonSort == 1 }"
                  @click="sortButton(1)"
                >Новинки</span>
                <span
                  v-bind:class="{ activesortspan: activeButtonSort == 2 }"
                  @click="sortButton(2)"
                >Дешевле</span>
                <span
                  v-bind:class="{ activesortspan: activeButtonSort == 3 }"
                  @click="sortButton(3)"
                >Дороже</span>
              </div>
            </div>
          </div>
          <div class="catalog-goods__filter-mobile">
            <span
              @click="openHeaderForMobile = !openHeaderForMobile"
              class="categoris-button__mobile"
            >Фильтр</span>
          </div>
          <div class="catalog-goods__items-card">
            <div
              v-for="(item, index) in goodsList"
              v-bind:key="index"
              class="tea-new__block catalog-item"
            >
              <img v-if="item.this_is_new == 2" class="product-new" src="@/assets/img/new.png" />
              <router-link class="tea-new__link" v-bind:to="'/about-good/' + item.id_good">
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
@import "../assets/css/catalog.css";
</style>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "Каталог"
  },
  data: () => ({
    goods: [],
    categories: [],
    openBreadcrumbTitle: false,
    openBreadcrumbText: "",
    value: "",
    activeButtonSort: 0,
    modalStatus: false,
    width: window.innerWidth,
    textModalStatus: "",
    openHeaderForMobile: false
  }),
  computed: {
    goodsList() {
      return this.sortTeasCatalog();
    }
  },
  mounted() {
    window.onresize = () => {
      this.width = window.innerWidth;
    };
  },
  created() {
    if (this.width >= 1441) {
      this.openHeaderForMobile = true;
    }
    axios
      .get("https://api.xn----7sba9au1d3c.xn--p1ai/api/shop-goods")
      .then(responce => {
        this.goods = responce.data;
      });
    axios
      .get("https://api.xn----7sba9au1d3c.xn--p1ai/api/categories")
      .then(responce => {
        this.categories = responce.data;
      });
  },
  methods: {
    filterCatalog(name_categories) {
      this.openBreadcrumbText = name_categories;

      if (this.width <= 1440) {
        this.openHeaderForMobile = false;
      }
    },
    cancelFilter() {
      this.openBreadcrumbText = "";
      this.openBreadcrumbTitle = !this.openBreadcrumbTitle;

      if (this.width <= 1440) {
        this.openHeaderForMobile = false;
      }
    },
    sortButton(id) {
      switch (id) {
        case 1:
          if (this.activeButtonSort == 1) {
            this.activeButtonSort = 0;
          } else {
            this.activeButtonSort = 1;
          }
          break;
        case 2:
          if (this.activeButtonSort == 2) {
            this.activeButtonSort = 0;
          } else {
            this.activeButtonSort = 2;
          }
          break;
        case 3:
          if (this.activeButtonSort == 3) {
            this.activeButtonSort = 0;
          } else {
            this.activeButtonSort = 3;
          }
          break;
      }
    },
    sortTeasCatalog() {
      switch (this.activeButtonSort) {
        case 0:
          return this.goods.filter(
            item => item.name_categories.indexOf(this.openBreadcrumbText) !== -1
          );
        case 1:
          return this.goods.filter(item => item.this_is_new == 2);
        case 2:
          return this.goods.sort((a, b) => a.price - b.price);
        case 3:
          return this.goods.sort((a, b) => b.price - a.price);
      }
    },
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
    },
    returnToPage() {
      this.$router.push("/");
    }
  }
};
</script>
