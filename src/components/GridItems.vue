<template>
  <div
      class="grid pt-5 px-5"
  >
    <div v-for="(item, i) in paginatedItems" :key="i">
      <v-card height="110" align="center">
        <v-img
            :src="item.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            width="100%"
            height="70%"
        >
        </v-img>
        <v-row
            class="ma-1"
            align="center"
            justify="space-between"
        >
          <div class="hidden">
            <v-card-title class="pa-1 text-caption" v-text="item.title"></v-card-title>
          </div>


          <!--                      <v-btn icon >-->
          <!--                        <v-icon>mdi-delete</v-icon>-->
          <!--                      </v-btn>-->
        </v-row>


      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "GridItems",
  props:{
    paginatedItems:Array
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 110px);
}
.grid > * {
  height: 110px;
}
.hidden {
  width: 110px;
  height: 20px;
  overflow: hidden;
}
</style>