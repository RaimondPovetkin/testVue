<template>
  <v-app id="inspire">

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
            :viewItems="viewItems"
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
              :viewItems="viewItems"
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
              <!--  -->
              <grid-items
                  v-if="currentView==='Сетка'"
                  :paginatedItems="paginatedItems"
              >
              </grid-items>
              <table-items
                  v-else
                  :headers="headers"
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

export default {
  components: {MenuContainer, TextField, SelectItems, GridItems, TableItems},
  props: {
    cloudItems: Array
  },
  data: () => ({
    drawer: null,
    screenWidth: window.innerWidth,
    paginationLength: 2,
    filter: '',
    page: 1,
    links: [
      'Dashboard',
      'Messages',
    ],
    currentView: 'Сетка',
    viewItems: [
      {
        value: 'Сетка',
        icon: 'mdi-view-grid'
      },
      {
        value: 'Список',
        icon: 'mdi-format-list-bulleted'
      }
    ],
    headers: [
      {
        align: 'start',
        sortable: false,
        value: 'src',
      },
      {
        value: 'title',
        sortable: false
      },
      {
        value: 'size',
        sortable: false
      },
      {
        value: 'date',
        sortable: false
      },
      {
        value: 'delete',
        sortable: false
      },
    ],
  }),
  computed: {
    startIndex() {
      return (this.page - 1) * 10;
    },
    endIndex() {
      return this.page * 10;
    },
    filteredItems() {
      return this.cloudItems.filter(item => item.title.toUpperCase().includes(this.filter?.toUpperCase()));
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
    changePaginationLength() {
      this.paginationLength = Math.ceil(this.filteredItems.length / 10)
    },
    onResize() {
      this.screenWidth = window.innerWidth
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
}
</script>
<style>

</style>