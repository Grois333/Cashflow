<template>
  <Layout>
    <template #header>
      <Header></Header>
    </template>

    <!-- <template #currencySelect>
      <CurrencySelect></CurrencySelect>
    </template> -->

    <template #resume>
      <Resume
        :total-label="'Total savings'"
        :label="label"
        :total-amount="totalAmount"
        :amount="amount"
        :currency="currency"
      >
        <template #graphic>
          <Graphic 
            :amounts="amounts" 
            :totalEntries="totalEntries"
            :totalExpenses="totalExpenses"
            @select="select" />
        </template>

        <template #action>
          <Action @create="create" />
        </template>
        
      </Resume>
    </template>
    
    <template #movements>
      <Movements
        :movements="movements"
        @remove="remove"
      />
    </template>
  </Layout>
</template>

<script>
import Layout from "./Layout.vue";
import Header from "./Header.vue";
import Resume from "./Resume/Index.vue";
//import CurrencySelect from "./CurrencySelect.vue";
import Action from "./Action.vue";
import Movements from "./Movements/Index.vue";
import Graphic from "./Resume/Graphic.vue";
//import currencyFormatter from "@/js/currencyFormater";

export default {
  components: {
    Layout,
    Header,
    Resume,
    //CurrencySelect,
    Action,
    Movements,
    Graphic,
},
  data() {
    return {
      label: null,
      amount: null,
      movements: [],
      currency: '',
    };
  },
  computed: {
    amounts() {
      const lastDays = this.movements
        .filter(m => {
          const today = new Date();
          const oldDate = today.setDate(today.getDate() - 30);

          return m.time > oldDate;
        })
        .map(m => m.amount);

      return lastDays.map((m, i) => {
        const lastMovements = lastDays.slice(0, i + 1);

        return lastMovements.reduce((suma, movement) => {
          return suma + movement
        }, 0);
      });
    },
    totalAmount() {
      return this.movements.reduce((suma, m) => {
        return suma + m.amount;
      }, 0);
    },
    totalEntries(){
      let total = 0;
      for (let movement of this.movements) {
          //console.log(movement.amount);
          if(movement.amount >= 0){
              total = total + movement.amount;
          }
      }
      //console.log(this.$store.state.currency);
      //return currencyFormatter.format(total);
      return this.$store.state.currencyFormatter.format(total);
    },
    totalExpenses(){
      let total = 0;
      for (let movement of this.movements) {
          //console.log(movement.amount);
          if(movement.amount < 0){
              total = total + movement.amount;
          }
      }
      //return currencyFormatter.format(total);
      return this.$store.state.currencyFormatter.format(total);
    },
  },
  mounted() {
    const movements = JSON.parse(localStorage.getItem("movements"));
    //console.log(movements);

    const savedCurrency = JSON.parse(localStorage.getItem("currency"));
    //console.log(savedCurrency);
    if(savedCurrency == null){
      localStorage.setItem("currency", JSON.stringify({symbol: this.$store.state.currency, class: 'fa fa-dollar-sign'}));
      location.reload();
    }

    this.currency = savedCurrency;
    //console.log(this.currency)
    this.$store.state.currency = this.currency.symbol;

    if (Array.isArray(movements)) {
      this.movements = movements.map(m => {
        return { ...m, time: new Date(m.time) };
      });
    }
  },
  methods: {
    create(movement) {
      //this.movements.push(movement);
      this.movements.unshift(movement);
      this.save();
    },
    remove(id) {
      const index = this.movements.findIndex(m => m.id === id);
      this.movements.splice(index, 1);
      this.save();
    },
    save() {
      localStorage.setItem("movements", JSON.stringify(this.movements));
    },
    select(el) {
      //console.log(el);
      this.amount = el;
    }
  }
};
</script>
