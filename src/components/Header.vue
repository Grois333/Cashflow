<template>
  <header>
    <img @click="reload" src="@/assets/cashflow-icon.svg" alt="Logo" />
    <h1><span>Cash</span>Flow</h1>
    <span></span>

    <!-- <div>
      <div class="icon-dropdown">
        <div class="selected-icon" @click="toggleList">
          <i :class="selectedClass"></i>
          <i class="fa fa-dollar-sign"></i>
        </div>
        <ul class="icon-list" v-if="showList">
          <li v-for="icon in icons" :key="icon" @click="selectIcon(icon)">
            <i :class="icon.class"></i> {{icon.text}}
          </li>
        </ul>
      </div>
  </div> -->


  </header>
</template>

<script>
export default {

  data() {
    return {
      // showList: false,
      // selectedClass: '',
      // icons: [
      //   { class: 'fa fa-shekel-sign', text: '' },
      //   { class: 'fa fa-dollar-sign', text: '' },
      //   { class: 'fa fa-euro-sign', text: '' },
      // ]
    }
  },

  methods: {
    reload() {
      location.reload();
    },

    // toggleList() {
    //   this.showList = !this.showList;
    // },
    // selectIcon(icon) {
    //   this.selectedClass = icon.class;
    //   this.showList = false;

    //   console.log(icon);
    // }

  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
}

img,
span {
  width: 48px;
}

h1 {
  font-size: 1.4rem;
  color: var(--brand-blue);
}

h1 span {
  color: var(--brand-green);
}
</style>
