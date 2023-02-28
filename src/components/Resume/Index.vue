<template>
  <main>

    <div class="currencySelect">
      <div class="icon-dropdown">
        <div class="selected-icon" @click="toggleList">
          <i v-if="selectedClass" :class="selectedClass"></i>
          <i v-else :class="currency.class"></i>
        </div>
        <ul class="icon-list" v-if="showList">
          <li v-for="icon in icons" :key="icon" @click="selectIcon(icon)">
            <i :class="icon.class"></i> {{icon.text}}
          </li>
        </ul>
      </div>
    </div>
    
    <p>{{ labelVisual }}</p>
    <h1 :class="parseFloat(amountVisual) < 0 ? 'red' : 'green'">{{ amountCurrency }}</h1>
    <div class="graphic">
      <slot name="graphic"></slot>
    </div>
    <div class="action">
      <slot name="action"></slot>
    </div>
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
//import currencyFormatter from "@/js/currencyFormater";
// const currencyFormatter = new Intl.NumberFormat("es-MX", {
//   style: "currency",
//   currency: "MXN",
// });

// const currencyFormatter = new Intl.NumberFormat("es-EC", {
//   style: "currency",
//   currency: "USD",
// });

// const currencyFormatter = new Intl.NumberFormat("il-Il", {
//   style: "currency",
//   currency: "ILS",
// });

// const currencyFormatter = new Intl.NumberFormat("es-VE", {
//   style: "currency",
//   currency: "VES",
// });



export default {
  props: {
    totalLabel: {
      type: String,
    },
    label: {
      type: String,
      default: null,
    },
    totalAmount: {
      type: Number,
    },
    amount: {
      type: Number,
      default: null,
    },
    currency: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showList: false,
      selectedClass: '',
      selectedIcon: '',
      currencysaved: '',
      icons: [
        { class: 'fa fa-shekel-sign', text: '' },
        { class: 'fa fa-dollar-sign', text: '' },
        { class: 'fa fa-euro-sign', text: '' },
      ],
      currencyFormatter: new Intl.NumberFormat("us-US", {
        style: "currency",
        currency: "USD",
      }),
    }
  },
  mounted() {
    const savedCurrency = JSON.parse(localStorage.getItem("currency"));
    //console.log(savedCurrency.symbol);
    if(savedCurrency != null){
      this.currencysaved = savedCurrency.symbol;
      this.formatCurrency();
    }
  },
  computed: {
    labelVisual() {
      return this.label !== null ? this.label : this.totalLabel;
    },
    amountVisual() {
      return this.amount !== null ? this.amount : this.totalAmount;
    },

    amountCurrency() {

      //console.log(this.currency.symbol)
      //this.formatCurrency();
      //let newTotal = this.currencyFormatter.format(this.amountVisual);

      //console.log(this.$store.state.currency);
      let newTotal = this.$store.state.currencyFormatter.format(this.amountVisual);

      function swapFirstTwoChars(str) {
        if (str.length <= 1) return str;
        return str[1] + str[0] + str.substring(2);
      }

      let newNewTotal;
      if(newTotal.startsWith('-')){
        newNewTotal = swapFirstTwoChars(newTotal);
        //console.log(newNewTotal);
        return newNewTotal;
      } else {
        //console.log(newTotal)
        return newTotal;
      }
    },

    ...mapState(['currency']),
  },
  methods: {
    toggleList() {
      this.showList = !this.showList;
    },
    selectIcon(icon) {
      this.selectedClass = icon.class;
      this.showList = false;

      //console.log(icon.class);
      if(icon.class == 'fa fa-euro-sign'){
        //this.$store.commit('updateCurrency')
        this.updateCurrency('€')
        this.selectedIcon = '€'
        //console.log(this.$store.state.currency);
        //this.$store.state.currency = '€'
        this.$store.state.currencyFormatter = new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: "EUR",
        });
        localStorage.setItem("currency", JSON.stringify({symbol: this.$store.state.currency, class: icon.class}));
      } else if(icon.class == 'fa fa-shekel-sign'){
        this.updateCurrency('₪')
        this.selectedIcon = '₪'
        //console.log(this.$store.state.currency);
        //this.$store.state.currency = '₪'
        this.currencyFormatter = new Intl.NumberFormat("il-Il", {
            style: "currency",
            currency: "ILS",
        });
        //this.$store.state.currency = '$'
        this.$store.state.currencyFormatter = new Intl.NumberFormat("il-Il", {
            style: "currency",
            currency: "ILS",
        });
        localStorage.setItem("currency", JSON.stringify({symbol: this.$store.state.currency, class: icon.class}));
      } else{
        this.updateCurrency('$')
        this.selectedIcon = '$'
        //console.log({symbol: this.$store.state.currency, class: icon.class});
        this.$store.state.currencyFormatter = new Intl.NumberFormat("us-US", {
            style: "currency",
            currency: "USD",
        });
        localStorage.setItem("currency", JSON.stringify({symbol: this.$store.state.currency, class: icon.class}));
      }
    },

    formatCurrency(){
      //console.log(this.currency.symbol)
      //console.log(this.$store.state.currency)
      //console.log(this.selectedIcon)

      if(this.currencysaved == '€'){
        //console.log(this.currency.symbol)
        //console.log(typeof this.currencyFormatter)
        this.updateCurrency('€')
        this.$store.state.currencyFormatter = new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: "EUR",
        });
        //return this.currencyFormatter;
      } else if(this.currencysaved == '₪'){
        this.updateCurrency('₪')
          this.$store.state.currencyFormatter = new Intl.NumberFormat("il-IL", {
              style: "currency",
              currency: "ILS",
          });
          //return this.currencyFormatter;
      } else{
        this.updateCurrency('$')
        this.$store.state.currencyFormatter = new Intl.NumberFormat("us-US", {
              style: "currency",
              currency: "USD",
          });
          //return this.currencyFormatter;
      }

    },

    ...mapMutations(['setCurrency']),
    updateCurrency(currency) {
      this.$store.state.currency = currency;
    }

  },
  
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

h1,
p {
  margin: 0;
  text-align: center;
}

h1 {
  margin-top: 14px;
  color: var(--brand-green);
}
.green{
  color: var(--brand-green);
}
.red{
    color: red;
}

.graphic {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 48px 24px;
  box-sizing: border-box;
  padding: 20px 24px;
  padding-bottom: 5px;
}

.currencySelect{
  position: absolute;
  top: 10vh;
  right: 15vw;
  color: var(--brand-green);
}
.currencySelect li{
  list-style-type: none;
  margin: 10px 0;
}
.currencySelect .selected-icon i{
  font-size: 20px;
}
</style>
