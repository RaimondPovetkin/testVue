<template>
  <div>
    <v-data-table
        :hide-default-footer="true"
        :hide-default-header="true"
        :items="paginatedItems"
        :items-per-page="10"
        class="elevation-1 pt-5"
        v-if="paginatedItems.length"
    >
      <template v-slot:body="{items}">
        <tbody>
        <tr v-for="(item,index) in items" :key="index">
          <div>

          </div>
          <td>
            <v-icon
                size="32"
            >
              mdi-file
            </v-icon>
          </td>
          <td class="item-title">
            {{ item.name }}
          </td>
          <td class="item-size">
            {{ getSizeItem(item.size)}}
          </td>
          <td class="item" padding="1">
            <div class="item-flex">
              <v-btn icon @click="$emit('downloadItem', item.id)">
                <v-icon size="18">mdi-download</v-icon>
              </v-btn>
              <v-btn icon @click="$emit('renameItem', item.id)">
                <v-icon size="18">mdi-lead-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="$emit('deleteItem', item.id)">
                <v-icon size="18">mdi-delete</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
        </tbody>
      </template>
    </v-data-table>
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
  name: "TableItems",
  props: {
    paginatedItems: Array,
    getSizeItem: Function
  },
  methods:{
  }
}
</script>

<style lang="sass">
$edit-dialog-content-padding: 0 2px !default
$medium: 600px
.item-size
  min-width: 100px
  font-size: 8px
  overflow: hidden
.item-flex
  display: flex
@media screen and (max-width: $medium)
  .item
    min-width: 80px
    font-size: 8px
    overflow: hidden
  .item-title
    width: 100%
    min-width: 120px
    font-size: 8px
    overflow: hidden

//@media (max-width: 600px) {
//  .item {
//    min-width: 80px;
//    font-size: 8px;
//    overflow: hidden;
//  }
//
//  .item-title {
//    min-width: 120px;
//    font-size: 8px;
//    overflow: hidden;
//  }
//}
</style>