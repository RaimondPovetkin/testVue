<template>
  <v-list color="transparent">
    <v-list-item
        v-for="n in 5"
        :key="n"
        link
    >
      <v-list-item-content>
        <v-list-item-title>
          Item {{ n }}
          <br>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="my-2"></v-divider>

    <v-list-item
        link
        color="grey lighten-4"
    >
      <v-list-item-content>
        <v-list-item-title
            @click="foo"
        >
          Refresh
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "MenuContainer",
  methods:{
    foo(){
      console.log(localStorage.getItem('token'))
    }
  }
}
</script>

<style scoped>

</style>