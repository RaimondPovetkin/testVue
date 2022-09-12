<template>
  <div>
    <div v-if="paginatedItems.length">
      <div
          class="grid pt-5 px-5"
      >
        <div v-for="(item, i) in paginatedItems" :key="i">
          <v-card height="110" align="center" @contextmenu="show">
            <v-icon
                class="mt-5"
                size="32"
            >
              mdi-file
            </v-icon>
            <v-row
                class="ma-1"
                align="center"
                justify="space-between"
            >
              <div class="hidden">
                <v-card-title class="pa-1 text-caption" v-text="item.name"></v-card-title>
              </div>
            </v-row>
            <v-btn icon @click="$emit('downloadItem', item.id)">
              <v-icon size="18">mdi-download</v-icon>
            </v-btn>
            <v-btn icon @click="$emit('renameItem', item.id)">
              <v-icon size="18">mdi-lead-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="$emit('deleteItem', item.id)">
              <v-icon size="18">mdi-delete</v-icon>
            </v-btn>

          </v-card>
          <v-menu

              :position-x="100"
              :position-y="100"
              absolute
              offset-y
          >
          </v-menu>
        </div>
      </div>
    </div>
    <div v-else>
      <div align="center" class="pt-10">
        Файлов пока нет
      </div>
      <div align="center">
        <v-icon size="32">mdi-halloween</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GridItems",
  props:{
    paginatedItems:Array
  },
  methods:{
    show(){
      console.log('rrr')
    }
  }
}
</script>

<style scoped>
.line{
  border-bottom: 2px solid black;
  width: 100%;
}
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