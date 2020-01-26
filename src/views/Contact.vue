<template>
  <main>
    <section class="contact">
      <h1 class="contact-title">Контакты</h1>
      <div class="contact-information">
        <div class="contact-information__block">
          <h2>Чайная №1</h2>
          <div class="contact-information__text">
            <div class="contact-shop__about">
              <i class="fas fa-map-marker-alt">
                <span>Адрес:</span>
              </i>
              <span class="contact-shop__about-text"
                >просп. Ленина, 65/1, Ростов-на-Дону</span
              >
            </div>
            <div class="contact-shop__about">
              <i class="far fa-clock">
                <span>Время работы:</span>
              </i>
              <span class="contact-shop__about-text"
                >пн-пт 7:00–21:00; сб 9:00–21:00; вс 10:00–20:00</span
              >
            </div>
            <div class="contact-shop__about">
              <i class="fas fa-phone-alt">
                <span>Телефон:</span>
              </i>
              <span class="contact-shop__about-text">+7 928 617-88-73</span>
            </div>
            <div class="contact-shop__image">
              <img src="@/assets/img/chinay1.jpg" alt="Чайная лавка" />
            </div>
          </div>
        </div>
        <div class="contact-information__block">
          <h2>Чайная №2</h2>
          <div class="contact-information__text">
            <div class="contact-shop__about">
              <i class="fas fa-map-marker-alt">
                <span>Адрес:</span>
              </i>
              <span class="contact-shop__about-text"
                >Московская ул., 12/16, Ростов-на-Дону (эт. 1)</span
              >
            </div>
            <div class="contact-shop__about">
              <i class="far fa-clock">
                <span>Время работы:</span>
              </i>
              <span class="contact-shop__about-text"
                >пн-пт 7:00–21:00; сб 9:00–21:00; вс 10:00–20:00</span
              >
            </div>
            <div class="contact-shop__about">
              <i class="fas fa-phone-alt">
                <span>Телефон:</span>
              </i>
              <span class="contact-shop__about-text">+7 928 617-88-73</span>
            </div>
            <div class="contact-shop__image">
              <img src="@/assets/img/chinay2.jpg" alt="Чайная лавка" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
@import "../assets/css/contact.css";
</style>

<script>
export default {
  metaInfo: {
    title: "Контакты"
  }
};
</script>
