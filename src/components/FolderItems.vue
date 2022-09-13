<template>

  <div
      class="grid pt-5 px-5"
  >
    <div v-for="(item, i) in paginatedItems" :key="i">
      <v-card elevation="0" height="90" align="center" @click="folderClick(item)">
        <v-icon
            color="primary"
            class="mt-1"
            size="32"
        >
          mdi-folder
        </v-icon>
        <v-row
            class="ma-1"
            align="center"
            justify="space-between"
        >
          <div class="hidden">
            <v-card-title class="pa-1 text-caption folder-name justify-center" v-text="item.name">
            </v-card-title>
          </div>
          <div class="hidden">
            <v-card-title class="pa-1 text-caption justify-center">{{ getSizeItem(item.size)}}</v-card-title>
          </div>
        </v-row>

      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "FolderItems",
  props:{
    paginatedItems:Array,
    getSizeItem: Function
  },
  methods:{
    folderClick(item){
      if(!item.full_name){
        this.$emit('changeCurrentFolder', item.id)
      }
    }
  }
}
</script>

<style scoped>
.folder-name{
  font-weight: 700;
}
.grid {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, 80px);
}
.grid > * {
  height: 110px;
}
.hidden {
  width: 110px;
  height: 23px;
  overflow: hidden;
}
</style>