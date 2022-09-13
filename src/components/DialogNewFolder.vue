<template>
  <v-dialog
      v-model="show"
      max-width="80%"
  >
    <v-card>
      <v-card-title class="text-h5">
        Новая папка
      </v-card-title>

      <v-text-field class="px-5" :placeholder="dialogString" v-model="inputText">
      </v-text-field>

      <v-card-actions>

        <div
            align="center"
            justify="start"
        >
          <v-btn
              small
              color="primary"
              @click="$emit('SaveFolder',inputText),inputText=''"
          >
            Сохранить
          </v-btn>
          <v-btn
              small
              class="ml-3"
              color="primary"
              @click.stop="show=false,inputText=''"
          >
            Отмена
          </v-btn>
        </div>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogNewFolder",
  props: {
    value: Boolean,
    dialogString: String
  },
  data: () => ({
    inputText: ''
  })
  ,
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
}
</script>

<style scoped>

</style>