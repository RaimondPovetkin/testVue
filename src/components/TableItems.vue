<template>
  <div>
    <div v-if="paginatedItems.length" class="teble-top">
      <div v-for="(item,index) in paginatedItems" :key="index">
        <div class="py-3 row-item">

          <div class="row-start">
            <div class="row-icon">
              <v-icon
                  size="32"
              >
                mdi-file
              </v-icon>
            </div>

            <div class="row-info">
              <div class="row-name">
                {{ item.full_name }}
              </div>
              <div class="row-size">
                {{ getSizeItem(item.size) }}
              </div>
            </div>
          </div>
          <div class="row-end">
            <div class="row-date">
              {{ $moment(item.created_at).format('D.M.YYYY, H:MM')    }}
            </div>
            <div class="row-btn">
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
          </div>
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
  name: "TableItems",
  props: {
    paginatedItems: Array,
    getSizeItem: Function
  },
  methods: {}
}
</script>

<style lang="sass" scoped>
.teble-top
  padding-top: 20px
.row-end
  width: 55%
  display: flex
  justify-content: space-between
  align-items: center
.row-start
  width: 45%
  display: flex
  align-items: center
.row-item
  width: 100%
  display: flex
  align-items: center
  justify-content: space-between
.row-icon
  padding-left: 10px
  width: 45px
.row-info
  width: 70%
  display: flex
  flex-direction: column
.row-date
  width: 50%
  font-size: 14px
.row-btn
  padding-right: 10px
  width: 50%
  display: flex
  justify-content: end
.row-name
  font-size: 14px
  height: 20px
  overflow: hidden
.row-size
  font-size: 12px
  color: #72a9e1

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
  .row-date
    font-size: 9px
  .row-btn
    padding-right: 5px
  .row-name
    font-size: 12px
  .row-size
    font-size: 10px

</style>