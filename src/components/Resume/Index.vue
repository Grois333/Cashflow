<template>
  <main>
    <p>{{ labelVisual }}</p>
    <h1>{{ amountCurrency }}</h1>
    <div class="graphic">
      <slot name="graphic"></slot>
    </div>
    <div class="action">
      <slot name="action"></slot>
    </div>
  </main>
</template>

<script>
import currencyFormatter from "@/js/currencyFormater";
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
  },
  computed: {
    labelVisual() {
      return this.label !== null ? this.label : this.totalLabel;
    },
    amountVisual() {
      return this.amount !== null ? this.amount : this.totalAmount;
    },
    amountCurrency() {
      return currencyFormatter.format(this.amountVisual);
    },
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
</style>
