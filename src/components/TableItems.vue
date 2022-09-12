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
          <td class="item">
            {{ item.size }}
          </td>
          <td class="item">
            <v-btn icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
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
    paginatedItems: Array
  },
}
</script>

<style scoped>
@media (max-width: 600px) {
  .item {
    min-width: 80px;
    font-size: 8px;
    overflow: hidden;
  }

  .item-title {
    min-width: 120px;
    font-size: 8px;
    overflow: hidden;
  }
}
</style>