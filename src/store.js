//import Vue from 'vue';
import { createStore } from 'vuex';
//import Vuex from 'vuex';

// Vue.use(Vuex)

// const store = new Vuex.Store({
//   state: {
//     message: 'Hello world!'
//   },
//   mutations: {
//     setMessage(state, message) {
//       state.message = message
//     }
//   }
// })

// Create a new store instance.
const store = createStore({
  state () {
    return {
      //count: 0,
      currency: '$',
      currencyFormatter: new Intl.NumberFormat("us-US", {
        style: "currency",
        currency: "USD",
      }),
    }
  },
  mutations: {
    // increment (state) {
    //   state.count++
    // }
    // updateMessage(state) {
    //   state.message = 'New message';
    // }
  }
})

export default store;