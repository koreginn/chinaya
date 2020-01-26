<template>
  <div id="app">
    <Main>
      <router-view />
    </Main>
  </div>
</template>

<script>
import Main from "@/layouts/Main";
export default {
  components: {
    Main
  }
};
</script>

<style>
@import "assets/css/index.css";
@import "assets/css/modal.css";
</style>
