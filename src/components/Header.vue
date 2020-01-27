<template>
  <header class="header">
    <div class="header-size">
      <div class="header-size__block-first">
        <router-link class="header-logotype" to="/">
          <img src="@/assets/img/logotype1.png" alt="ChinaЯ" />
        </router-link>
        <nav class="header-menu">
          <ul class="header-menu__list">
            <li class="header-menu__list-item">
              <router-link to="/">Главная</router-link>
            </li>
            <li class="header-menu__list-item">
              <router-link to="/history">История</router-link>
            </li>
            <li class="header-menu__list-item">
              <router-link to="/catalog">Каталог</router-link>
            </li>
            <li class="header-menu__list-item">
              <router-link to="/support">Поддержка</router-link>
            </li>
            <li class="header-menu__list-item">
              <router-link to="/contact">Контакты</router-link>
            </li>
          </ul>
        </nav>
        <div v-if="this.$store.getters.getAuth == false" class="user-menu">
          <img
            @click="closeModalAuth()"
            class="header-user"
            src="https://img.icons8.com/ios/100/000000/user-male-circle.png"
          />
        </div>
        <div v-if="this.$store.getters.getAuth == true" class="user-auth">
          <span>{{ $store.getters.getNameUser }}.</span>
          <router-link to="/profile">
            <img
              v-if="$store.getters.getPhotoUser == null"
              class="header-user"
              src="https://img.icons8.com/ios/100/000000/user-male-circle.png"
            />
            <img
              v-if="$store.getters.getPhotoUser != null"
              class="header-user auth-user"
              :src="$store.getters.getPhotoUser"
            />
          </router-link>
          <router-link class="basket-menu__block" to="/basket">
            <img src="https://img.icons8.com/pastel-glyph/64/000000/shopping-cart--v2.png" />
            <span class="basket-menu__value">{{ $store.getters.getBasketGoods }}</span>
          </router-link>
        </div>
      </div>
      <div class="header-size__block-second">
        <nav class="header-menu">
          <ul class="header-menu__list">
            <li class="header-menu__list-item">
              <router-link to="/">Главная</router-link>
            </li>
            <li class="header-menu__list-item">
              <router-link to="/history">История</router-link>
            </li>
            <li class="header-menu__list-item">
              <router-link to="/catalog">Каталог</router-link>
            </li>
            <li class="header-menu__list-item">
              <router-link to="/support">Поддержка</router-link>
            </li>
            <li class="header-menu__list-item">
              <router-link to="/contact">Контакты</router-link>
            </li>
          </ul>
        </nav>
        <div @click="openMenuMobile()" class="modal-menu__button">Открыть меню</div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="this.$store.getters.getStatusModalAuth != false" class="modal-auth">
        <transition name="fade">
          <div v-if="modalStatus == true" class="modal-auth__error">
            <span>{{ textModalStatus }}</span>
          </div>
        </transition>
        <form @submit.prevent="authUser" class="modal-auth__form">
          <div class="modal-auth__size">
            <i @click="closeModalAuth()" class="far fa-times-circle modal__close"></i>
            <h4 class="modal-auth__size-title">Авторизация</h4>
            <input
              v-model="email"
              class="modal-auth__input"
              type="text"
              placeholder="Электронная почта"
            />
            <input
              v-model="password"
              class="modal-auth__input"
              type="password"
              placeholder="Пароль"
            />
            <input class="modal-auth__button" type="submit" value="Войти" />
            <div class="modal-auth__action">
              <span
                @click="
                  (closeModalAuth()), (modalRegister = !modalRegister)
                "
              >Создать аккаунт!</span>
              <span
                @click="
                  (closeModalAuth()),
                    (modalReturnPassword = !modalReturnPassword)
                "
              >Забыли пароль?</span>
            </div>
          </div>
        </form>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="modalReturnPassword != false" class="modal-auth">
        <transition name="fade">
          <div v-if="modalStatus == true" class="modal-auth__error">
            <span>{{ textModalStatus }}</span>
          </div>
        </transition>
        <form @submit.prevent="returnPassword" class="modal-auth__form">
          <div class="modal-auth__size">
            <i
              @click="modalReturnPassword = !modalReturnPassword"
              class="far fa-times-circle modal__close"
            ></i>
            <h4 class="modal-auth__size-title">Восстановление пароля</h4>
            <input
              class="modal-auth__input"
              v-model="email"
              type="text"
              placeholder="Электронная почта"
            />
            <input class="modal-auth__button" type="submit" value="Отправить" />
            <div class="modal-auth__action">
              <span
                @click="
                  (modalReturnPassword = !modalReturnPassword),
                    (closeModalAuth())
                "
              >Войти в аккаунт!</span>
              <span
                @click="
                  (modalReturnPassword = !modalReturnPassword),
                    (modalRegister = !modalRegister)
                "
              >Создать аккаунт!</span>
            </div>
          </div>
        </form>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="modalRegister != false" class="modal-auth">
        <transition name="fade">
          <div v-if="modalStatus == true" class="modal-auth__error">
            <span>{{ textModalStatus }}</span>
          </div>
        </transition>
        <form @submit.prevent="registerUser" class="modal-auth__form">
          <div class="modal-auth__size">
            <i @click="modalRegister = !modalRegister" class="far fa-times-circle modal__close"></i>
            <h4 class="modal-auth__size-title">Регистрация</h4>
            <input
              v-model="email"
              class="modal-auth__input"
              type="text"
              placeholder="Электронная почта"
            />
            <input v-model="surname" class="modal-auth__input" type="text" placeholder="Фамилия" />
            <input v-model="name" class="modal-auth__input" type="text" placeholder="Имя" />
            <input v-model="last_name" class="modal-auth__input" type="text" placeholder="Отчество" />
            <input
              v-model="password"
              class="modal-auth__input"
              type="password"
              placeholder="Пароль"
            />
            <input class="modal-auth__button" type="submit" value="Создать аккаунт" />
            <div class="modal-auth__action">
              <span
                @click="
                  (modalRegister = !modalRegister), (closeModalAuth())
                "
              >Войти в аккаунт!</span>
              <span
                @click="
                  (modalRegister = !modalRegister),
                    (modalReturnPassword = !modalReturnPassword)
                "
              >Забыли пароль?</span>
            </div>
          </div>
        </form>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="this.$store.getters.getMenuMobile != false" class="modal-auth">
        <ul class="modal-menu__list">
          <i @click="closeMenuMobile()" class="far fa-times-circle modal__close"></i>
          <li class="modal-menu__list-item">
            <router-link to="/">Главная</router-link>
          </li>
          <li class="modal-menu__list-item">
            <router-link to="/history">История</router-link>
          </li>
          <li class="modal-menu__list-item">
            <router-link to="/catalog">Каталог</router-link>
          </li>
          <li class="modal-menu__list-item">
            <router-link to="/support">Поддержка</router-link>
          </li>
          <li class="modal-menu__list-item">
            <router-link to="/contact">Контакты</router-link>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<style>
@import "../assets/css/index.css";
</style>

<script>
import axios from "axios";

export default {
  data: () => ({
    modalRegister: false,
    modalReturnPassword: false,
    textModalStatus: "",
    modalStatus: false,
    email: "",
    surname: "",
    name: "",
    last_name: "",
    password: "",
    auth: ""
  }),
  created() {
    if (localStorage.getItem("auth") == null) {
      this.auth = false;
    } else {
      this.auth = true;
    }
  },
  methods: {
    registerUser() {
      if (
        this.email != "" &&
        this.surname != "" &&
        this.name != "" &&
        this.last_name != "" &&
        this.password != ""
      ) {
        axios
          .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/register", {
            email: this.email,
            surname: this.surname,
            name: this.name,
            last_name: this.last_name,
            password: this.password
          })
          .then(response => {
            if (response.data["status"] == "Error") {
              this.textModalStatus =
                "Указанная электронная почта уже существует!";
              this.modalStatus = true;
              setTimeout(() => (this.modalStatus = false), 2000);
            } else {
              this.textModalStatus = "Аккаунт успешно создан";
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
    authUser() {
      if (this.email != "" && this.password != "") {
        axios
          .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/login", {
            email: this.email,
            password: this.password
          })
          .then(response => {
            if (response.data["status"] == "error") {
              this.textModalStatus =
                "Ошибка! Электронная почта или пароль не правильно указаны";
              this.modalStatus = true;
              setTimeout(() => (this.modalStatus = false), 2000);
            } else {
              this.$store.commit("login");
              localStorage.setItem("api_token", response.data["api_token"]);
              localStorage.setItem("auth", true);
              this.auth = true;
              this.$store.commit("modalAuth");
              this.$router.push("/profile");
            }
          });
      } else {
        this.textModalStatus = "Заполните все данные!";
        this.modalStatus = true;
        setTimeout(() => (this.modalStatus = false), 2000);
      }
    },
    closeModalAuth() {
      this.$store.commit("modalAuth");
    },
    closeMenuMobile() {
      this.$store.commit("setMenuMobile");
    },
    openMenuMobile() {
      this.$store.commit("setMenuMobile");
    },
    returnPassword() {
      if (this.email != "") {
        axios.post(
          "https://api.xn----7sba9au1d3c.xn--p1ai/api/return-password",
          {
            email: this.email
          }
        );
        this.textModalStatus = "Проверьте свою почту!";
        this.modalStatus = true;
        setTimeout(
          () => (
            (this.modalStatus = false),
            (this.modalReturnPassword = false),
            this.$store.commit("modalAuth")
          ),
          2000
        );
      } else {
        this.textModalStatus = "Заполните все данные!";
        this.modalStatus = true;
        setTimeout(() => (this.modalStatus = false), 2000);
      }
    }
  }
};
</script>
