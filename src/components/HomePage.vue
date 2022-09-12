<template>
  <v-app id="inspire">

    <v-dialog
        v-model="dialog"
        max-width="80%"
    >
      <v-card>
        <v-card-title class="text-h5">
          Переименовать файл
        </v-card-title>

        <v-text-field class="px-5" v-model="renameField.name">
        </v-text-field>

        <v-card-actions>

          <div
              align="center"
              justify="start"
          >
            <v-btn
                small
                color="primary"
                @click="renameFile()"
            >
              Переименовать
            </v-btn>
            <v-btn
                small
                class="ml-3"
                color="primary"
                @click="dialog = false"
            >
              Отмена
            </v-btn>
          </div>

        </v-card-actions>
      </v-card>
    </v-dialog>

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
        <menu-container></menu-container>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar
        app
        color="white"
        flat
    >
      <div v-if="screenWidth<700" class="d-flex align-center">
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
        <v-file-input
            @change="selectFile"
            truncate-length="15"
        ></v-file-input>

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
          <v-col cols="2" v-if="screenWidth>700">
            <v-sheet rounded="lg">
              <menu-container></menu-container>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
                rounded="lg"
            >
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
              >
              </table-items>
              <div class="text-center mt-10 pb-5">
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
import axios from "axios";

export default {
  name: "HomePage",
  components: {MenuContainer, TextField, SelectItems, GridItems, TableItems},
  data: () => ({
    selectedFile: null,
    renameField: {
      id: null,
      name: null
    },
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
      return this.cloudItems.filter(item => item.name.toUpperCase().includes(this.filter?.toUpperCase()));
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
  },
  methods: {
    async uploadFile() {
      const fd = new FormData()
      if (this.selectedFile.size < 20971520) {
      fd.append('file', this.selectedFile)
      await axios.post(
          `http://markwebdev.ru/api/v1/files`,
          fd,
          {headers: {authorization: `Bearer ${localStorage.getItem('token')}`}}
      ).then((responce) => {
        this.cloudItems.push(responce.data.data)
          }
      ).catch(error => {
        console.log(error)
      })
      } else {
        console.log('xui')
      }
    },
    selectFile(event) {
      this.selectedFile = event
      this.uploadFile()
    },
    async renameFile() {
      console.log(this.renameField.id)
      await axios.patch(
          `http://markwebdev.ru/api/v1/files/${this.renameField.id}`,
          {name: this.renameField.name},
          {headers: {authorization: `Bearer ${localStorage.getItem('token')}`}}
      ).then(() => {
            this.cloudItems.find(i => i.id === this.renameField.id).name = this.renameField.name
            this.dialog = false
          }
      ).catch(error => {
        console.log(error)
      })
    },
    renameDialog(id) {
      this.dialog = true
      this.renameField = {
        id: id,
        name: this.cloudItems.find(i => i.id === id).name
      }
    },
    async deleteItem(id) {
      await axios.delete(`http://markwebdev.ru/api/v1/files/${id}`, {headers: {authorization: `Bearer ${localStorage.getItem('token')}`}})
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
      await axios.get(`http://markwebdev.ru/api/v1/files/${id}/download`, {
        responseType: 'blob',
        headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
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
      await axios.get(`http://markwebdev.ru/api/v1/files`, {headers: {authorization: `Bearer ${localStorage.getItem('token')}`}})
          .then(response => {
            this.cloudItems = response.data.data
            console.log(this.cloudItems)
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
    this.getFiles()
    this.changePaginationLength()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
}
</script>
<style>

</style>