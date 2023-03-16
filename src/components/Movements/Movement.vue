<template>
    <div :class="['summary', classDate]">
      <div>{{ "Summary "+currentDate+":" }}</div>
      <p class="green">Entries: {{ totalMonth[0] }}</p>
      <p class="red">Expenses: {{ totalMonth[1] }}</p>
    </div>

    <div class="movement">
      <div class="content">
        <h4>{{ title }}</h4>
        <p>{{ description }}</p>
      </div>
      <div class="action">
        <img src="@/assets/trash-icon.svg" alt="borrar" @click="remove" />
        <p
          :class="{
            red: isNegative,
            green: !isNegative,
          }"
        >
          {{ amountCurrency }}
        </p>
      </div>
    </div>
</template>

<script setup>
import { toRefs, defineProps, defineEmits, computed, onMounted } from "vue";
import store from '@/store.js';
//import currencyFormatter from "@/js/currencyFormater";

// const currencyFormatter = new Intl.NumberFormat("es-MX", {
//   style: "currency",
//   currency: "MXN",
// });

const props = defineProps({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
  },
  time: {
    type: String
  },
  index: {
    type: Number
  },
  movementDate: {
    type: Array
  },

});

const { id, title, description, amount, time, movementDate } = toRefs(props);

const amountCurrency = computed(() =>{
  //console.log(store.state.currency);

  //let newTotal = currencyFormatter.format(amount.value);
  let newTotal = store.state.currencyFormatter.format(amount.value);

  function swapFirstTwoChars(str) {
    if (str.length <= 1) return str;
    return str[1] + str[0] + str.substring(2);
  }

  let newNewTotal;
  if(newTotal.startsWith('-')){
    newNewTotal = swapFirstTwoChars(newTotal);
    //console.log(newNewTotal);
    return newNewTotal;
  } else{
    //return currencyFormatter.format(amount.value);
    //return this.$store.state.currencyFormatter.format(amount.value);
    return newTotal;
  }

});

const isNegative = computed(() => amount.value < 0);

const emit = defineEmits(["remove"]);

const remove = () => {
  emit("remove", id.value);
};

const currentDate = computed(() =>{
  //let currentTime = JSON.stringify(time.value);
  let currentMonth = time.value.toLocaleString('default', { month: 'long' });
  let currentYear = time.value.getFullYear();
  let currentTime = currentMonth + " " + currentYear
  return currentTime;
})

const classDate = computed(() =>{
  //let currentTime = JSON.stringify(time.value);
  let currentMonth = time.value.toLocaleString('default', { month: 'long' });
  let currentYear = time.value.getFullYear();
  let currentTime = "date-" + currentMonth + "-" + currentYear
  return currentTime;
})

const totalMonth = computed(() =>{
  // console.log(movementDate.value)
  // console.log(currentDate.value)
  let totalAmount = [];

  for (const item of movementDate.value) {
    //console.log(item)
    //console.log(item.currentTime)
    if(item.currentTime == currentDate.value){
      //console.log(item.currentTime)
      totalAmount.push(item.currentAmount)
    }
  }
  //console.log(totalAmount);

  let totalNegative = 0;
  for (let i = 0; i < totalAmount.length; ++i) {
      if (totalAmount[i] < 0) {
        totalNegative += totalAmount[i];
      }
  }
  totalNegative = store.state.currencyFormatter.format(totalNegative);
  function swapFirstTwoChars(str) {
    if (str.length <= 1) return str;
    return str[1] + str[0] + str.substring(2);
  }
  if(totalNegative.startsWith('-')){
    totalNegative = swapFirstTwoChars(totalNegative);
  }

  let totalPositive = 0;
  for (let i = 0; i < totalAmount.length; ++i) {
      if (totalAmount[i] >= 0) {
        totalPositive += totalAmount[i];
      }
  }
  totalPositive = store.state.currencyFormatter.format(totalPositive);

  // let summary = `Entries: <p>${totalPositive}</p> 
  //                Expenses: ${totalNegative}`;

  let summary = [totalPositive, totalNegative]
  //console.log(summary)
  return summary;
})


onMounted(() => {
  //descendantContainsClass()

  const nodeList = document.querySelectorAll('.summary');
  const elements = Array.from(nodeList);
  //console.log(elements);

  // create an empty object to keep track of unique classes
  const uniqueClasses = {};

  // create an empty array to store repeated elements
  const repeatedElements = [];

  // loop over each element
  elements.forEach((element, index) => {
    //console.log(element)
    // get the element's class name
    const className = element.className;
    // check if the class name has been seen before
    if (uniqueClasses[className]) {
      // if the class name has been seen before and it's not the first occurrence, add the element to the repeated elements array
      if (uniqueClasses[className] !== index) {
        repeatedElements.push(element);
      }
    } else {
      // if the class name hasn't been seen before, add it to the unique classes object
      uniqueClasses[className] = index;
    }
  });

  //console.log(repeatedElements)
  // remove all repeated elements
  repeatedElements.forEach((element) => {
    element.remove();
  });

  // // create an empty object to keep track of unique classes
  // const uniqueClasses = {};

  // // loop over each element
  // elements.forEach((element, index) => {
  //   // get the element's class name
  //   const className = element.className;
  //   // check if the class name has been seen before
  //   if (uniqueClasses[className]) {
  //     // if the class name has been seen before and it's not the first occurrence, remove the element
  //     if (uniqueClasses[className] !== index) {
  //       element.remove();
  //     }
  //   } else {
  //     // if the class name hasn't been seen before, add it to the unique classes object
  //     uniqueClasses[className] = index;
  //   }
  // });
})

</script>

<style scoped>
.movement {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: #e6f9ff;
  border-radius: 8px;
  box-sizing: border-box;
}

.movement .content {
  width: 100%;
}

.movement .action {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
}

h4,
p {
  margin: 0;
  padding: 0;
}

h4 {
  margin-bottom: 8px;
}

.movement .action img {
  margin-bottom: 16px;
}

.red {
  color: red;
}

.green {
  color: green;
}
.summary .green{
  margin: 5px 0;
}

.summary:nth-child(3) {
  display: none
}


</style>
