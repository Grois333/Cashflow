<template>
  <Suspense>
    <template #default>
      <Home />
    </template>
    <template #fallback>
      <SplashScreen />
    </template>
  </Suspense>
</template>

<script>
import SplashScreen from "./components/SplashScreen.vue";
import { defineAsyncComponent } from "vue";
import store from "./store.js";

export default {
  components: {
    SplashScreen,
    Home: defineAsyncComponent(
      () =>
        new Promise((resolve) => {
          const savedCurrency = JSON.parse(localStorage.getItem("currency"));
          //console.log(console.log(store.state.currency));
          if(savedCurrency == null){
            localStorage.setItem("currency", JSON.stringify({symbol: store.state.currency, class: 'fa fa-dollar-sign'}));
          }
          setTimeout(() => {
            resolve(import("./components/Home.vue"));
          }, 2500);
        })
    ),
  },
};
</script>

<style>
html,
body,
.app {
  min-height: 100vh;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  --brand-green: #04b500;
  --brand-blue: #0689b0;
}
</style>
