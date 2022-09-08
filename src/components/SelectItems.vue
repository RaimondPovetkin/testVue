<template>
  <v-select
      v-model="currentSelectView"
      @change="$emit('changeCurrentView', currentSelectView)"
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
  props: {
    viewItems: Array
  },
  emits: {
    changeCurrentView: null
  },
  data: () => ({
    currentSelectView: 'Сетка'
  })
}
</script>

<style scoped>

</style>