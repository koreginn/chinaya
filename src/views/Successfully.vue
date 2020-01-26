<template>
  <main>
    <section class="payment-successfully">
      <h1 class="payment-successfully__title">Заказ успешно оформлен</h1>
      <div class="payment-successfully__information">
        <div class="payment-successfully__text">
          <img
            class="payment-successfully__img"
            src="@/assets/img/completed.png"
            alt="Успешно заказ оформлен"
          />
          <p class="payment-successfully__description">
            Ваш заказ успешно оформлен. Следите за статусом заказа в личном
            кабинете. Номер вашего заказа №
            <b>{{ this.$store.getters.getLastOrderValue }}</b>
          </p>
          <router-link class="payment-successfully__link" to="/profile">Перейти к заказам</router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
@import "../assets/css/successfully.css";
</style>

<script>
export default {
  metaInfo: {
    title: "Заказ оформлен"
  },
  created() {
    if (
      this.$store.getters.getLastOrderValue == null ||
      this.$store.getters.getAuth == false
    ) {
      this.$router.push("/404");
    }
  }
};
</script>
