<template>
  <footer>
    <div class="footer-size">
      <div @click="openMenuMobile()" class="modal-menu__button footer-button">Открыть меню</div>
      <ul class="footer-menu__list">
        <li class="footer-menu__list-item">
          <router-link to="/history">История</router-link>
        </li>
        <li class="footer-menu__list-item">
          <router-link to="/catalog">Каталог</router-link>
        </li>
        <li class="footer-menu__list-item">
          <router-link to="/support">Поддержка</router-link>
        </li>
        <li class="footer-menu__list-item">
          <router-link to="/contact">Контакты</router-link>
        </li>
      </ul>
      <div class="social-network">
        <p>Посмотрите наш Instagram</p>
        <a href="https://www.instagram.com/Chinaya_rnd/">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<style>
@import "../assets/css/index.css";
</style>

<script>
export default {
  methods: {
    openMenuMobile() {
      this.$store.commit("setMenuMobile");
    }
  }
};
</script>
