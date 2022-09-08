<template>
  <v-data-table
      :hide-default-footer="true"
      :hide-default-header="true"
      :headers="headers"
      :items="paginatedItems"
      :items-per-page="10"
      class="elevation-1 pt-5"
  >
    <template v-slot:body="{items}">
      <tbody>
      <tr v-for="(item,index) in items" :key="index">
        <td>
          <img
              :src="item.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              width="110"
              height="77"
          />
        </td>
        <td>
          {{item.title}}
        </td>
        <td>
          {{item.size}}
        </td>
        <td>
          {{item.date}}
        </td>
        <td>
          <v-btn icon >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "TableItems",
  props:{
    headers:Array,
    paginatedItems:Array
  }
}
</script>

<style scoped>

</style>