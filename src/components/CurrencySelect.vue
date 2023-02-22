<template>
    <div>
        <h1 class="icon-dropdown">currency select test</h1>
    
        <!-- <div class="icon-dropdown">
            <span class="selected-icon">{{selectedIcon}}</span>
            <i class="fa fa-caret-down"></i>
            <ul class="icon-list" v-if="showList">
                <li v-for="icon in icons" :key="icon" @click="selectIcon(icon)">{{icon}}</li>
            </ul>
        </div> -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      showList: false,
      selectedIcon: '',
      icons: ['fa-home', 'fa-heart', 'fa-star', 'fa-cog', 'fa-folder']
    }
  },
  methods: {
    selectIcon(icon) {
      this.selectedIcon = icon;
      this.showList = false;
    }
  }
}
</script>

  