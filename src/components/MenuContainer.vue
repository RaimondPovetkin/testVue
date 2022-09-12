<template>
  <v-list color="transparent">
    <div align="left" class="pt-5 load-field-block">
      <v-icon left class="pl-5">
        mdi-cloud-upload
      </v-icon>
      <v-btn
          color="primary"
          class="mr-8 load-field text-none"
          dense
          hide-details
          rounded
          solo-inverted
          :loading="isSelecting"
          @click="selectFile"
      >
Загрузить
      </v-btn>
      <input
          ref="uploader"
          class="d-none"
          type="file"
          accept="image/*"
          @change="onFileChanged"
      >
    </div>
    <div align="left" class="pt-5 load-field-block">
      <v-icon left class="pl-5">
        mdi-folder-multiple-plus
      </v-icon>
      <v-btn
          outlined
          color="primary"
          class="mr-8 load-field text-none"
          dense
          rounded
          solo-inverted
          @click="createFolder"
      >
        Новая папка
      </v-btn>
    </div>
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
        >
          Refresh
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import axios from "axios";

export default {
  name: "MenuContainer",
  data: () => ({
    defaultButtonText: '画像をアップロード',
    selectedFile: null,
    isSelecting: false
  }),
  methods:{
    createFolder(){
      console.log('xuy')
    },
    selectFile() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })
      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0]
      this.uploadFile()
    },
    async uploadFile() {
      const fd = new FormData()
      if (this.selectedFile.size < 20971520) {
        fd.append('file', this.selectedFile)
        await axios.post(
            `http://markwebdev.ru/api/v1/files`,
            fd,
            {headers: {authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then((responce) => {
          this.$emit('uploadFile',responce.data.data)
            }
        ).catch(error => {
          console.log(error)
        })
      } else {
        console.log('xui')
      }
    },
  },
}
</script>

<style scoped>
.load-field-block{
  display: flex;
  justify-content: center;
}
.load-field {
  width: 65% !important;
}
/*@media (max-width: 1265px) {*/
/*  .load-field {*/
/*    width: 42% !important;*/
/*    font-size: 8px;*/
/*  }*/
/*}*/
@media (max-width: 700px) {
  .load-field {
    min-width: 60% !important;
  }
}
</style>