<template>
  <v-text-field
      prepend-icon="mdi-magnify"
      placeholder="Найти"
      v-model="filter"
      @input="$emit('changeFilter', filter)"
      class="mr-8"
      dense
      flat
      hide-details
      rounded
      solo-inverted
  ></v-text-field>
</template>

<script>
export default {
  name: "TextField",
  data: () => ({
    filter: ''
  }),
  emits: {
    changeFilter: null
  },
}
</script>

<style scoped>

</style>