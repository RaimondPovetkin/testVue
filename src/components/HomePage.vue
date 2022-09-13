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
        v-model="drawer"
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
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
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
        {{ dialogString }}


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
              ></menu-container>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
                rounded="lg"
            ><v-btn @click="currentFolder = -1">Файл</v-btn>
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
              <div class="text-center mt-10 pb-5">
                {{ getCurrentSize() }}
                <v-pagination
                    v-if="paginationLength>1"
                    v-model="page"
                    :length="paginationLength"
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
import SelectItems from "@/components/SelectItems";
import TextField from "@/components/TextField";
import MenuContainer from "@/components/MenuContainer";
import instance from "@/API/Axios";
import DialogRename from "@/components/DialogRename";
import DialogNewFolder from "@/components/DialogNewFolder";
import FolderItems from "@/components/FolderItems";

export default {
  name: "HomePage",
  components: {DialogNewFolder, DialogRename, MenuContainer, TextField, SelectItems, GridItems, FolderItems, TableItems},
  data: () => ({
    currentFolder: -1,
    folders: [],
    dialogRename: false,
    dialogString: '',
    dialogTitle: '',
    dialogNewFolder: false,
    selectedFile: null,
    renameField: {
      id: null,
      name: null
    },
    snackbarMessage: '',
    snackbar: false,
    dialog: false,
    drawer: null,
    screenWidth: window.innerWidth,
    paginationLength: 2,
    filter: '',
    page: 1,
    cloudItems: [],
    links: [
      'Dashboard',
      'Messages',
    ],
    currentView: 'Сетка',
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
  },
  watch: {
    filter() {
      this.page = 1;
      this.changePaginationLength()
    },
    currentFolder(){
      this.getFiles()
    }
  },
  methods: {
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
            this.dialog = false
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
                console.log(id)
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
            console.log(this.cloudItems)
          }).catch(error => {
            console.log(error)
          })
    },
    async getFolders() {
      await instance.get(`folders`)
          .then(response => {
            console.log(response)
            this.folders = response.data.data
          }).catch(error => {
            console.log(error)
          })
    },
    changePaginationLength() {
      this.paginationLength = Math.ceil(this.filteredItems.length / 10)
    },
    onResize() {
      this.screenWidth = window.innerWidth
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    this.getFiles(-1)
    this.getFolders()
    this.changePaginationLength()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
}
</script>
<style>

</style>