<template>
  <v-app id="inspire">
    <dialog-rename
        v-model="dialogRename"
        :dialogString="dialogString"
        @SaveName="renameFile($event)"
    ></dialog-rename>
    <dialog-new-folder
        v-model="dialogNewFolder"
        :dialogString="dialogString"
        @SaveFolder="createFolder($event)"
    ></dialog-new-folder>
    <v-snackbar
        v-model="snackbar"
        top
        :timeout="2000"
    >
      {{ snackbarMessage }}
      <template>
        <v-btn
            color="blue"
            text
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-navigation-drawer
        v-if="screenWidth<700"
        v-model="leftDrawer"
        app
    >
      <v-container>
        <text-field
            class="mt-3"
            @changeFilter="filter=$event"
        >
        </text-field>
        <select-items
            class="my-3"
            @changeCurrentView="currentView=$event"
        >
        </select-items>
        <menu-container
            @uploadFile="cloudItems.push($event)"
            @errorUploadFile="openSnackbar($event)"
            @createFolder="createFolderDialog"
            :currentFolder="currentFolder"
            :allSize="getSizeItem(allSize)"
        ></menu-container>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar
        app
        color="white"
        flat
    >
      <div v-if="screenWidth<700">
        <div class="d-flex align-center">
          <v-app-bar-nav-icon @click="leftDrawer = !leftDrawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Application</v-toolbar-title>
        </div>
      </div>

      <v-container class="py-0 fill-height" v-else>
        <v-avatar
            color="#1976D2"
            class="mr-10"
            size="32"
        >
          <v-icon dark>
            mdi-account-circle
          </v-icon>
        </v-avatar>
        <v-toolbar-title>Application</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-responsive max-width="220">
          <text-field
              @changeFilter="filter=$event"
          >
          </text-field>
        </v-responsive>

        <v-responsive max-width="160">
          <select-items
              @changeCurrentView="currentView=$event"
          >
          </select-items>
        </v-responsive>

      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="3" v-if="screenWidth>700">
            <v-sheet rounded="lg">
              <menu-container
                  @uploadFile="cloudItems.push($event)"
                  @errorUploadFile="openSnackbar($event)"
                  @createFolder="createFolderDialog"
                  :currentFolder="currentFolder"
                  :allSize="getSizeItem(allSize)"
              ></menu-container>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
                rounded="lg"
            >
              <div class="ml-3 pt-2">
              <span class="underline-text" @click="currentFolder = -1">
                Главная /
              </span>
                <span>
                {{folders.find(i=>i.id === currentFolder)?.name}}
              </span>
              </div>
              {{filter}}
              <folder-items
                  v-if="currentFolder === -1"
                  :paginatedItems="folders"
                  @changeCurrentFolder="changeFolder($event)"
                  :getSizeItem="getSizeItem"
              >
              </folder-items>
              <grid-items
                  v-if="currentView==='Сетка'"
                  :paginatedItems="paginatedItems"
                  @downloadItem="downloadItem($event)"
                  @renameItem="renameDialog($event)"
                  @deleteItem="deleteItem($event)"
              >
              </grid-items>
              <table-items
                  v-else
                  :paginatedItems="paginatedItems"
                  :getSizeItem="getSizeItem"
                  @downloadItem="downloadItem($event)"
                  @renameItem="renameDialog($event)"
                  @deleteItem="deleteItem($event)"
              >
              </table-items>
              <div v-if="cloudItems.length>0" class="text-left mt-10 pl-3">
                <span class="blue-text">
                  {{ 'Объём папки ' + getCurrentSize() }}
                </span>
              </div>
              <div class="text-center mt-10 pb-5">

                <v-pagination
                    v-if="changePaginationLength>1"
                    v-model="page"
                    :length="changePaginationLength"
                ></v-pagination>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TableItems from "@/components/TableItems";
import GridItems from "@/components/GridItems";
import SelectItems from "@/components/UI/SelectField";
import TextField from "@/components/UI/FilterField";
import MenuContainer from "@/components/MenuContainer";
import instance from "@/API/Axios";
import DialogRename from "@/components/UI/DialogRename";
import DialogNewFolder from "@/components/UI/DialogNewFolder";
import FolderItems from "@/components/FolderItems";

export default {
  name: "HomePage",
  components: {DialogNewFolder, DialogRename, MenuContainer, TextField, SelectItems, GridItems, FolderItems, TableItems},
  data: () => ({
    fullSize: [0,0],
    currentFolder: -1,
    folders: [],
    dialogString: '',
    dialogTitle: '',
    dialogNewFolder: false,
    dialogRename: false,
    renameField: {
      id: null,
      name: null
    },
    snackbarMessage: '',
    snackbar: false,
    leftDrawer: null,
    screenWidth: null,
    filter: '',
    page: 1,
    cloudItems: [],
    currentView: 'Сетка',
    allSize: 0,
  }),
  computed: {
    startIndex() {
      return (this.page - 1) * 10;
    },
    endIndex() {
      return this.page * 10;
    },
    filteredItems() {
      return this.cloudItems.filter(item => item.full_name.toUpperCase().includes(this.filter?.toUpperCase()));
    },
    paginatedItems() {
      return this.filteredItems.slice(this.startIndex, this.endIndex);
    },
    changePaginationLength() {
      return Math.ceil(this.filteredItems.length / 10)
    },
  },
  watch: {
    filter() {
      this.page = 1;
    },
    currentFolder(){
      this.getFiles()
      this.getFolders()
    },
    cloudItems(){
      this.gelAllSizeMainFiles()
    },
  },
  methods: {
    async gelAllSizeMainFiles(){
      await instance.get(`files`)
          .then(response => {
            this.allSize = response.data.data.reduce((sum, item) => sum + item.size, 0)
          }).catch(error => {
            console.log(error)
          })
    },
    changeFolder(id){
      this.currentFolder = id
    },
    createFolderDialog() {
      this.dialogString = 'Новая папка'
      this.dialogNewFolder = true
    },
    async createFolder(nameFolder) {
      this.dialogNewFolder = false

      await instance.post(`folders?name=${nameFolder}`)
          .then((responce) => {
                this.folders.push(responce.data.data)
              }
          ).catch((error) => {
            this.openSnackbar(error.response.data.message)
          })
    },
    getSizeItem(size) {
      if (size > (1024 * 1024)) {
        return Math.round(size / (1024 * 1024)) + " МБ"
      } else if (size > 1024) {
        return Math.round(size / 1024) + " КБ"
      } else {
        return size + " байт"
      }
    },
    getCurrentSize() {
      let size = this.cloudItems.reduce((sum, item) => sum + item.size, 0);
      return this.getSizeItem(size)
    },
    openSnackbar(message) {
      this.snackbarMessage = message
      this.snackbar = true
    },
    async renameFile(newName) {
      this.dialogRename = false
      this.renameField.name = newName
      console.log(this.renameField.id)
      await instance.patch(
          `files/${this.renameField.id}`,
          {name: this.renameField.name}
      ).then(() => {
            this.cloudItems.find(i => i.id === this.renameField.id).name = this.renameField.name
          }
      ).catch(error => {
        console.log(error)
      })
    },
    renameDialog(id) {
      this.dialogString = this.cloudItems.find(i => i.id === id).name
      this.dialogRename = true
      this.renameField = {
        id: id,
        name: this.cloudItems.find(i => i.id === id).name
      }
    },
    async deleteItem(id) {
      await instance.delete(`files/${id}`)
          .then(() => {
                this.cloudItems = this.cloudItems.filter(item => item.id !== id)
              }
          ).catch(error => {
            console.log(error)
          })
    },
    async downloadItem(id) {
      const nameFile = this.cloudItems.find(i => i.id === id).full_name
      await instance.get(`files/${id}/download`, {
        responseType: 'blob'
      })
          .then(response => {
                const blob = new Blob([response.data], {type: `${nameFile.split('.').pop()}`})
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.download = nameFile
                link.click()
                URL.revokeObjectURL(link.href)
              }
          ).catch(error => {
            console.log(error)
          })
    },
    async getFiles() {
      await instance.get(`files?folder_id=${this.currentFolder}`)
          .then(response => {
            this.cloudItems = response.data.data
          }).catch(error => {
            console.log(error)
          })
    },
    async getFolders() {
      await instance.get(`folders`)
          .then(response => {
            this.folders = response.data.data
          }).catch(error => {
            console.log(error)
          })
    },
    onResize() {
      this.screenWidth = window.innerWidth
    },
    checkLogin(){
      if(localStorage.getItem('token') === ''){
        this.$router.push('/')
      }
    }
  },
  mounted() {
    this.screenWidth = window.screen.width
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    this.getFiles()
    this.getFolders()
    this.checkLogin()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
}
</script>
<style>
.blue-text{
  color: #72a9e1;
  font-size: 13px;
}
.underline-text:hover{
  text-decoration: underline;
  cursor: pointer;
}
</style>