<template>
  <v-select
      v-model="currentSelectView"
      @change="setcurrentView()"
      :items="viewItems.map(i=>i.value)"
      menu-props="auto"
      label="Select"
      hide-details
      :prepend-icon="viewItems.find(i=>i.value === currentSelectView).icon"
      single-line
  ></v-select>
</template>

<script>
export default {
  name: "SelectItems",
  emits: {
    changeCurrentView: null
  },
  data: () => ({
    currentSelectView: 'Сетка',
    viewItems: [
      {
        value: 'Сетка',
        icon: 'mdi-view-grid'
      },
      {
        value: 'Список',
        icon: 'mdi-format-list-bulleted'
      }
    ],
  }),
  methods: {
    setcurrentView(){
      localStorage.setItem('currentSelect', this.currentSelectView)
      this.$emit('changeCurrentView', this.currentSelectView)
    },
  },
  mounted() {
    if(localStorage.getItem('currentSelect')){
      this.currentSelectView = localStorage.getItem('currentSelect')
    } else {
      this.currentSelectView = 'Сетка'
    }
    this.$emit('changeCurrentView', this.currentSelectView)
  }
}
</script>

<style scoped>

</style>