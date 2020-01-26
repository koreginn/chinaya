<template>
  <main>
    <section class="profile">
      <div v-for="(item, index) in dataUser" v-bind:key="index" class="profile-banner">
        <img
          @click="modalChangePhoto = !modalChangePhoto"
          v-if="item.photo != null"
          :src="item.photo"
          alt="Фотография пользователя"
        />
        <img
          @click="modalChangePhoto = !modalChangePhoto"
          v-if="item.photo == null"
          src="@/assets/img/profile/add-photo.jpg"
          alt="Фотография пользователя"
        />
        <div class="profile-banner__text">
          <span class="profile-banner__text-name">{{ item.name }} {{ item.surname }}</span>
          <div class="profile-banner__bonus">
            <span class="profile-banner__text-bonus">Бонусов:</span>
            <span class="profile-banner__text-value">{{ $store.getters.getBonus }}</span>
          </div>
        </div>
        <div class="edit-data__auth">
          <span @click="modalNewPassword = !modalNewPassword">Изменить пароль</span>
          <span @click="modalChangeEmail = !modalChangeEmail">Изменить почту</span>
          <span class="logout" @click="logout()">Выход</span>
        </div>
        <div class="user-id__auth">
          <span>№{{ item.id }}</span>
        </div>
      </div>
      <div v-for="(item, index) in dataUser" v-bind:key="'a' + index" class="profile-user">
        <div class="profile-user__header">
          <h2>Персональные данные</h2>
          <span @click="modalEditPersonalData = !modalEditPersonalData">Изменить данные</span>
        </div>
        <div class="profile-user__text">
          <span>ФИО</span>
          <span>Дата рождения</span>
          <span>Телефон</span>
          <span>Электронная почта</span>
        </div>
        <div class="profile-user__information">
          <div class="profile-user__description">
            <span
              class="profile-user__description-text"
            >{{ item.surname }} {{ item.name }} {{ item.last_name }}</span>
            <span v-if="item.birth_date == null" class="profile-user__description-text">Не указано</span>
            <span
              v-if="item.birth_date != null"
              class="profile-user__description-text"
            >{{ item.birth_date }}</span>
            <span v-if="item.phone == null" class="profile-user__description-text">Не указан</span>
            <span v-if="item.phone != null" class="profile-user__description-text">{{ item.phone }}</span>
            <span class="profile-user__description-text">{{ item.email }}</span>
          </div>
        </div>
      </div>
      <div class="profile-user">
        <div class="profile-user__header">
          <h2>Адрес доставки</h2>
          <span @click="modalEditDelivery = !modalEditDelivery">Изменить данные</span>
        </div>
        <div class="profile-user__text">
          <span>Город</span>
          <span>Область</span>
          <span>Адрес</span>
          <span>Квартира</span>
          <span>Индекс</span>
        </div>
        <div class="profile-user__information">
          <div
            v-for="(item, index) in deliveryUser"
            v-bind:key="'a' + index"
            v-show="emptyDeliver == false"
            class="profile-user__description"
          >
            <span v-if="item.city == null" class="profile-user__description-text">Не указан</span>
            <span v-if="item.city != null" class="profile-user__description-text">{{ item.city }}</span>
            <span v-if="item.region == null" class="profile-user__description-text">Не указана</span>
            <span
              v-if="item.region != null"
              class="profile-user__description-text"
            >{{ item.region }}</span>
            <span v-if="item.address == null" class="profile-user__description-text">Не указана</span>
            <span
              v-if="item.address != null"
              class="profile-user__description-text"
            >{{ item.address }}</span>
            <span v-if="item.flat == null" class="profile-user__description-text">Не указана</span>
            <span v-if="item.flat != null" class="profile-user__description-text">{{ item.flat }}</span>
            <span v-if="item.index == null" class="profile-user__description-text">Не указан</span>
            <span v-if="item.index != null" class="profile-user__description-text">{{ item.index }}</span>
          </div>
          <div v-if="emptyDeliver == true" class="profile-user__description">
            <span class="profile-user__description-text">Не указан</span>
            <span class="profile-user__description-text">Не указана</span>
            <span class="profile-user__description-text">Не указан</span>
            <span class="profile-user__description-text">Не указана</span>
            <span class="profile-user__description-text">Не указан</span>
          </div>
        </div>
      </div>
      <div class="profile-user">
        <div class="profile-user__header">
          <h2>Заказы</h2>
        </div>
        <div class="profile-user__text">
          <span>Номер заказа</span>
          <span>Дата заказа</span>
          <span>Статус заказа</span>
          <span>Управление</span>
        </div>
        <div class="profile-user__information">
          <div
            v-for="(item, index) in orderData"
            v-bind:key="'a' + index"
            class="profile-user__description"
          >
            <span class="profile-user__description-text">№{{ item.id_order }}</span>
            <span class="profile-user__description-text">{{ item.created_at }}</span>
            <div v-if="item.id_status == 7" class="profile-user__description-text">
              <span>Не просмотрен</span>
            </div>
            <div v-if="item.id_status == 9" class="profile-user__description-text status-scanned">
              <span>Просмотрен</span>
            </div>
            <div v-if="item.id_status == 10" class="profile-user__description-text status-shipped">
              <span>Отправлен</span>
            </div>
            <div
              v-if="item.id_status == 11"
              class="profile-user__description-text status-delivered"
            >
              <span>Доставлен</span>
            </div>
            <div
              v-if="item.id_status == 12"
              class="profile-user__description-text status-cancelled"
            >
              <span>Отменён</span>
            </div>
            <div class="profile-user__description-text">
              <router-link
                class="goods-blocks__control-view"
                v-bind:to="'/about-order/' + item.id_order"
              >Просмотреть</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <transition name="fade">
      <div v-if="modalEditPersonalData != false" class="modal-auth">
        <transition name="fade">
          <div v-if="modalStatus == true" class="modal-auth__error">
            <span>{{ textModalStatus }}</span>
          </div>
        </transition>
        <form @submit.prevent="changeDataUser" class="modal-auth__form">
          <div class="modal-auth__size">
            <i
              @click="modalEditPersonalData = !modalEditPersonalData"
              class="far fa-times-circle modal__close"
            ></i>
            <h4 class="modal-auth__size-title">Персональные данные</h4>
            <input
              class="modal-auth__input"
              v-model="surnameUser"
              type="text"
              placeholder="Фамилия"
            />
            <input class="modal-auth__input" v-model="nameUser" type="text" placeholder="Имя" />
            <input
              class="modal-auth__input"
              v-model="last_nameUser"
              type="text"
              placeholder="Отчество"
            />
            <input
              class="modal-auth__input"
              v-model="birth_day"
              type="date"
              placeholder="Дата рождения"
            />
            <input
              class="modal-auth__input"
              v-model="userPhone"
              type="text"
              placeholder="Телефон (Пример: 89005750418)"
            />
            <input class="modal-auth__button" type="submit" value="Изменить" />
          </div>
        </form>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="modalChangeEmail != false" class="modal-auth">
        <transition name="fade">
          <div v-if="modalStatus == true" class="modal-auth__error">
            <span>{{ textModalStatus }}</span>
          </div>
        </transition>
        <form @submit.prevent="changeEmail" class="modal-auth__form">
          <div class="modal-auth__size">
            <i
              @click="modalChangeEmail = !modalChangeEmail"
              class="far fa-times-circle modal__close"
            ></i>
            <h4 class="modal-auth__size-title">Изменить эл. почту</h4>
            <input
              class="modal-auth__input"
              v-model="email_old"
              type="text"
              placeholder="Старая почта"
            />
            <input
              class="modal-auth__input"
              v-model="email_new"
              type="text"
              placeholder="Новая почта"
            />
            <input class="modal-auth__button" type="submit" value="Изменить" />
          </div>
        </form>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="modalChangePhoto != false" class="modal-auth">
        <transition name="fade">
          <div v-if="modalStatus == true" class="modal-auth__error">
            <span>{{ textModalStatus }}</span>
          </div>
        </transition>
        <form @submit.prevent="changePhoto" class="modal-auth__form">
          <div class="modal-auth__size">
            <i
              @click="modalChangePhoto = !modalChangePhoto"
              class="far fa-times-circle modal__close"
            ></i>
            <h4 class="modal-auth__size-title">Изменить фотографию</h4>
            <input
              class="modal-auth__input"
              v-model="photoUser"
              type="text"
              placeholder="URL - Фотографии"
            />
            <input class="modal-auth__button" type="submit" value="Изменить" />
          </div>
        </form>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="modalNewPassword != false" class="modal-auth">
        <transition name="fade">
          <div v-if="modalStatus == true" class="modal-auth__error">
            <span>{{ textModalStatus }}</span>
          </div>
        </transition>
        <form @submit.prevent="changePassword" class="modal-auth__form">
          <div class="modal-auth__size">
            <i
              @click="modalNewPassword = !modalNewPassword"
              class="far fa-times-circle modal__close"
            ></i>
            <h4 class="modal-auth__size-title">Изменить пароль</h4>
            <input
              class="modal-auth__input"
              v-model="password_old"
              type="password"
              placeholder="Старый пароль"
            />
            <input
              class="modal-auth__input"
              v-model="password_new"
              type="password"
              placeholder="Новый пароль"
            />
            <input class="modal-auth__button" type="submit" value="Изменить" />
          </div>
        </form>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="modalEditDelivery != false" class="modal-auth">
        <transition name="fade">
          <div v-if="modalStatus == true" class="modal-auth__error">
            <span>{{ textModalStatus }}</span>
          </div>
        </transition>
        <form @submit.prevent="changeDataDelivery" class="modal-auth__form">
          <div class="modal-auth__size">
            <i
              @click="modalEditDelivery = !modalEditDelivery"
              class="far fa-times-circle modal__close"
            ></i>
            <h4 class="modal-auth__size-title">Адрес доставки</h4>
            <input class="modal-auth__input" v-model="cityUser" type="text" placeholder="Город" />
            <input class="modal-auth__input" v-model="regionUser" type="text" placeholder="Область" />
            <input class="modal-auth__input" v-model="addressUser" type="text" placeholder="Адрес" />
            <input class="modal-auth__input" v-model="flatUser" type="text" placeholder="Квартира" />
            <input class="modal-auth__input" v-model="indexUser" type="text" placeholder="Индекс" />
            <input class="modal-auth__button" type="submit" value="Изменить" />
          </div>
        </form>
      </div>
    </transition>
  </main>
</template>

<style>
@import "../assets/css/profile.css";
</style>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "Профиль",
    name: "Profile"
  },
  data: () => ({
    modalNewPassword: false,
    modalChangeEmail: false,
    modalEditDelivery: false,
    modalEditPersonalData: false,
    modalChangePhoto: false,
    textModalStatus: "",
    modalStatus: false,
    dataUser: [],
    deliveryUser: [],
    orderData: [],
    emptyDeliver: true,
    password_old: "",
    password_new: "",
    email_old: "",
    email_new: "",
    surnameUser: "",
    nameUser: "",
    last_nameUser: "",
    birth_day: "",
    cityUser: "",
    addressUser: "",
    regionUser: "",
    flatUser: "",
    indexUser: "",
    userPhone: "",
    photoUser: ""
  }),
  created() {
    if (this.$store.getters.getAuth == false) {
      this.$router.push("/404");
    } else {
      axios
        .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/user-shop", {
          api_token: localStorage.getItem("api_token")
        })
        .then(responce => {
          this.dataUser = responce.data["user"];
          this.orderData = responce.data["orders"];
          this.$store.commit("setDataUser", responce.data["user"]);
          this.$store.commit("setValueBasket", responce.data["goodsInBasket"]);
          if (responce.data["delivery"].length == 0) {
            this.emptyDeliver = true;
          } else {
            this.emptyDeliver = false;
            this.deliveryUser = responce.data["delivery"];
          }
        });
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      localStorage.removeItem("api_token");
      localStorage.removeItem("auth");
      this.$router.push("/");
    },
    changePassword() {
      if (this.password_old != "" && this.password_new != "") {
        axios
          .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/new-password", {
            email: this.dataUser[0]["email"],
            password_old: this.password_old,
            password_new: this.password_new
          })
          .then(response => {
            if (response.data["status"] == "Error") {
              this.textModalStatus = "Старый пароль указан не верно!";
              this.modalStatus = true;
              setTimeout(() => (this.modalStatus = false), 2000);
            } else {
              if (response.data["status"] == "Successfully") {
                this.textModalStatus = "Пароль успешно изменён!";
                this.modalStatus = true;
                setTimeout(() => (this.modalStatus = false), 2000);
              } else {
                this.textModalStatus = "Пароль не изменён. Повторите попытку!";
                this.modalStatus = true;
                setTimeout(() => (this.modalStatus = false), 2000);
              }
            }
          });
      } else {
        this.textModalStatus = "Укажите все данные!";
        this.modalStatus = true;
        setTimeout(() => (this.modalStatus = false), 2000);
      }
    },
    changeEmail() {
      if (this.email_old != "" && this.email_new != "") {
        axios
          .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/change-email", {
            email_old: this.email_old,
            email_new: this.email_new
          })
          .then(response => {
            if (response.data["status"] == "Error") {
              this.textModalStatus = "Старая почта указана не верно!";
              this.modalStatus = true;
              setTimeout(() => (this.modalStatus = false), 2000);
            } else {
              if (response.data["status"] == "Successfully") {
                this.dataUser[0]["email"] = this.email_new;
                this.textModalStatus = "Почта успешно изменена!";
                this.modalStatus = true;
                setTimeout(() => (this.modalStatus = false), 2000);
              } else {
                this.textModalStatus = "Почта не изменена. Повторите попытку!";
                this.modalStatus = true;
                setTimeout(() => (this.modalStatus = false), 2000);
              }
            }
          });
      } else {
        this.textModalStatus = "Укажите все данные!";
        this.modalStatus = true;
        setTimeout(() => (this.modalStatus = false), 2000);
      }
    },
    changeDataUser() {
      if (
        this.surnameUser != "" &&
        this.nameUser != "" &&
        this.last_nameUser != "" &&
        this.birth_day != "" &&
        this.userPhone != ""
      ) {
        if (!isNaN(this.userPhone) && this.userPhone.length == 11) {
          axios
            .post(
              "https://api.xn----7sba9au1d3c.xn--p1ai/api/change-personal-data",
              {
                email: this.dataUser[0]["email"],
                surnameUser: this.surnameUser,
                nameUser: this.nameUser,
                last_nameUser: this.last_nameUser,
                birth_day: this.birth_day,
                userPhone: this.userPhone
              }
            )
            .then(response => {
              if (response.data["status"] == "Successfully") {
                this.dataUser[0]["surname"] = this.surnameUser;
                this.dataUser[0]["name"] = this.nameUser;
                this.dataUser[0]["last_name"] = this.last_nameUser;
                this.dataUser[0]["birth_date"] = this.birth_day;
                this.dataUser[0]["phone"] = this.userPhone;
                this.$store.commit("setDataUser", this.dataUser);
                this.textModalStatus = "Персональные данные изменены!";
                this.modalStatus = true;
                setTimeout(() => (this.modalStatus = false), 2000);
              } else {
                this.textModalStatus =
                  "Персональные данные не изменены. Повторите попытку!";
                this.modalStatus = true;
                setTimeout(() => (this.modalStatus = false), 2000);
              }
            });
        } else {
          this.textModalStatus = "Телефон указан не верно!";
          this.modalStatus = true;
          setTimeout(() => (this.modalStatus = false), 2000);
        }
      } else {
        this.textModalStatus = "Укажите все данные!";
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
              email: this.dataUser[0]["email"],
              cityUser: this.cityUser,
              addressUser: this.addressUser,
              regionUser: this.regionUser,
              flatUser: this.flatUser,
              indexUser: this.indexUser
            }
          )
          .then(response => {
            if (response.data["status"] == "Successfully") {
              if (this.deliveryUser.length == 1) {
                this.deliveryUser[0]["city"] = this.cityUser;
                this.deliveryUser[0]["region"] = this.regionUser;
                this.deliveryUser[0]["address"] = this.addressUser;
                this.deliveryUser[0]["flat"] = this.flatUser;
                this.deliveryUser[0]["index"] = this.indexUser;
              }
              this.textModalStatus = "Данные доставки изменены!";
              this.modalStatus = true;
              setTimeout(() => (this.modalStatus = false), 2000);
            } else {
              this.textModalStatus =
                "Данные доставки не изменены. Повторите попытку!";
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
    changePhoto() {
      if (this.photoUser != "") {
        axios
          .post("https://api.xn----7sba9au1d3c.xn--p1ai/api/update-photo", {
            email: this.dataUser[0]["email"],
            photo: this.photoUser
          })
          .then(response => {
            if (response.data["status"] == "Successfully") {
              this.dataUser[0]["photo"] = this.photoUser;
              this.$store.commit("setDataUser", this.dataUser);
              this.textModalStatus = "Фотография успешно изменена!";
              this.modalStatus = true;
              setTimeout(() => (this.modalStatus = false), 2000);
            } else {
              this.textModalStatus =
                "Фотография не изменена. Повторите попытку!";
              this.modalStatus = true;
              setTimeout(() => (this.modalStatus = false), 2000);
            }
          });
      } else {
        this.textModalStatus = "Укажите все данные!";
        this.modalStatus = true;
        setTimeout(() => (this.modalStatus = false), 2000);
      }
    }
  }
};
</script>