<template>
  <v-list color="transparent">
    <div align="left" class="pt-6 load-field-block">
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
          @click="createFolder()"
          :disabled="!(currentFolder === -1)"
      >
        Новая папка
      </v-btn>
    </div>




    <v-list-item class="big-padding">
      <v-list-item-content>
        <v-list-item-title
        >
          <span class="blue-text-main">
            {{'На диске ' + allSize}}
          </span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>



    <v-divider class="my-2"></v-divider>

    <v-list-item>
      <v-list-item-content>
        <v-btn
            outlined
            color="error"
            @click="logout"
        >
          Выйти
        </v-btn>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import instance from "@/API/Axios";

export default {
  name: "MenuContainer",
  data: () => ({
    selectedFile: null,
    isSelecting: false,
    mainFolderSize: 0,
  }),
  props: {
    currentFolder: Number,
    allSize: String
  },
  methods:{
    async logout(){
      await instance.post(`auth/logout`)
          .then(() => {
            this.$router.push('/')
              }
          ).catch(error => {
            console.log(error)
          })
    },
    createFolder(){
      this.$emit('createFolder')
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
      if(this.selectedFile.name.split('.').pop() === 'php' || this.selectedFile.size > 20971520){
        this.$emit('errorUploadFile', 'Нельзя загружать файлы .php или файлы весом боьше 20Мб')
      } else {
        const fd = new FormData()
        fd.append('file', this.selectedFile)
        if(this.currentFolder === -1){
          await instance.post(
              `files`,
              fd,
          ).then((responce) => {
                this.$emit('uploadFile',responce.data.data)
              }
          ).catch(error=> {
            console.log(error)
            this.$emit('errorUploadFile', 'Не удалось выбрать файл')
          })
        } else {
          await instance.post(
              `files?folder_id=${this.currentFolder}`,
              fd,
          ).then((responce) => {
                this.$emit('uploadFile',responce.data.data)
              }
          ).catch(error=> {
            console.log(error)
            this.$emit('errorUploadFile', 'Не удалось выбрать файл')
          })
        }
      }
    },
  },
}
</script>

<style scoped>
.big-padding{
  padding-top: 140px;
}
.blue-text-main{
  color: #64a8ed;
  font-size: 17px;
}
.load-field-block{
  display: flex;
  justify-content: center;
}
.load-field {
  width: 65% !important;
}
@media (max-width: 700px) {
  .load-field {
    min-width: 60% !important;
  }
}
</style>