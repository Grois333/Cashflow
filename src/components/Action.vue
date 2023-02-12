<template>
  <button @click="showModal = true">Add movement</button>
  <teleport to="#app">
    <Modal v-show="showModal" @close="showModal = false">
      <form @submit.prevent="submit">
        <div class="field">
          <label>Title</label>
          <input type="text" v-model="title" />
        </div>
        <div class="field">
          <label>Amount</label>
          <input type="number" step="any" v-model="amount"  @input="checkInput" />
          <span class="red" v-if="showError">Please enter a number other than 0</span>
        </div>
        <div class="field">
          <label>Description</label>
          <textarea rows="4" v-model="description"></textarea>
        </div>
        <div class="field">
          <label class="radio-label">
            <input type="radio" v-model="movementType" value="Ingreso" />
            <span>Entry</span>
          </label>
          <label class="radio-label">
            <input type="radio" v-model="movementType" value="Gasto" />
            <span>Expense</span>
          </label>
        </div>
        <div class="action">
          <button>Add movement</button>
        </div>
      </form>
    </Modal>
  </teleport>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import Modal from "./Modal.vue";

const showModal = ref(false);
const title = ref("");
const amount = ref(0);
const description = ref("");
const movementType = ref("Ingreso");

const showError = ref(false);

const emit = defineEmits(["create"]);

const submit = () => {
  if(amount.value > 0){
    showModal.value = !showModal.value;
    emit("create", {
      title: title.value,
      description: description.value,
      amount: movementType.value === "Ingreso" ? amount.value : -amount.value,
      time: new Date(),
      id: new Date(),
    });
    title.value = "";
    description.value = "";
    amount.value = 0;
    movementType.value = "Ingreso";
  } else{
    //alert('Please enter a number other than 0');
    showError.value = true;
  }
};

const checkInput = () => {
  if (amount.value === 0 || amount.value === '') {
    showError.value = true;
  } else {
    showError.value = false;
  }
}



</script>

<style scoped>
button {
  color: white;
  font-size: 1.25rem;
  background-color: var(--brand-blue);
  border: none;
  width: 100%;
  padding: 24px 60px;
  border-radius: 60px;
  box-sizing: border-box;
}

form {
  font-size: 1.24rem;
  width: 100%;
}

form .action {
  padding: 0 24px;
}

.field {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 16px 24px;
}

label {
  margin-bottom: 8px;
}

input,
textarea {
  font-size: 1.24rem;
  border: 2px solid var(--brand-blue);
  border-radius: 8px;
  padding: 8px;
}

input[type="number"] {
  text-align: right;
}

.radio-label {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.radio-label span {
  margin-top: 4px;
  margin-left: 8px;
}

input[type="radio"] {
  appearance: none;
  width: 1.24rem;
  height: 1.24rem;
  color: var(--brand-blue);
  border: 2px solid var(--brand-blue);
  border-radius: 50%;
}

input[type="radio"]:checked {
  background-color: var(--brand-blue);
}

.red{
    color: red;
}
</style>
