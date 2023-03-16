<template>
  <div class="movements" >
    <h2 class="title">History</h2>
    <!-- <div>{{ movements }}</div> -->
    <div class="content">
      <!-- {{ movementDate }} -->
      <Movement
        v-for="({ id, title, description, amount, time }, index) in movements"
        :key="id"
        :id="id"
        :title="title"
        :description="description"
        :amount="amount"
        :movementDate="movementDate"
        :time="time"
        :index="index"
        @remove="remove"
      />
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps, defineEmits, computed } from "vue";
import Movement from "./Movement.vue";

const props = defineProps({
  movements: {
    type: Array,
    default: () => [],
  },
});

const { movements } = toRefs(props);

const emit = defineEmits(["remove"]);

const remove = (id) => {
  emit("remove", id);
};

const movementDate = computed(() =>{
  //console.log(movements.value);
  let currentMonth;
  let currentYear;
  let currentTime;
  let currentAmount;
  let datesAmounts = [];
  for (let mvnt in movements.value) {

    //console.log(movements.value[mvnt].time)
    currentMonth = movements.value[mvnt].time.toLocaleString('default', { month: 'long' });
    
    currentYear = movements.value[mvnt].time.getFullYear();
    currentTime = currentMonth + " " + currentYear
    currentAmount = movements.value[mvnt].amount;
    //console.log(currentAmount);

    datesAmounts.push({currentTime: currentTime, currentAmount: currentAmount })

    // if(){
    //   datesAmounts = 
    // }
  }
  //console.log(datesAmounts)
  //return currentMonth;
  return datesAmounts;
})
</script>

<style scoped>
.movements {
  max-height: 100%;
  padding: 0 8px;
  margin-bottom: 14px;
}

.title {
  margin: 8px 16px 24px 16px;
  color: var(--brand-blue);
}

.content {
  max-height: 68vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: scroll;
}
</style>
