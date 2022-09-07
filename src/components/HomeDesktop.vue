<template>
  <v-app id="inspire">
    <v-app-bar
        app
        color="white"
        flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
            class="mr-10"
            color="grey darken-1"
            size="32"
        ></v-avatar>

        <v-btn
            v-for="link in links"
            :key="link"
            text
        >
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="160">
          <v-text-field
              v-model="filter"
              class="mr-8"
              dense
              flat
              hide-details
              rounded
              solo-inverted
          ></v-text-field>
        </v-responsive>


        <v-responsive max-width="160">
          <v-select
              v-model="currentView"
              :items="viewItems.map(i=>i.value)"
              menu-props="auto"
              label="Select"
              hide-details
              :prepend-icon="viewItems.find(i=>i.value === currentView).icon"
              single-line
          ></v-select>
        </v-responsive>

      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
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
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
                min-height="70vh"
                rounded="lg"
            >
              <!--  -->

              <div
                  class="grid pt-5 pl-5"
                  v-if="currentView==='Сетка'"
              >
                <div v-for="(item, i) in paginatedItems" :key="i">
                  <v-card height="110" align="center">
                    <v-img
                        :src="item.src"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        width="100%"
                        height="70%"
                    >
                    </v-img>
                    <v-row
                        class="ma-1"
                        align="center"
                        justify="space-between"
                    >
                      <div class="hidden">
                        <v-card-title class="pa-1 text-caption" v-text="item.title"></v-card-title>
                      </div>


                      <!--                      <v-btn icon >-->
                      <!--                        <v-icon>mdi-delete</v-icon>-->
                      <!--                      </v-btn>-->
                    </v-row>


                  </v-card>
                </div>
              </div>

              <v-data-table
                  :hide-default-footer="true"
                  :hide-default-header="true"
                  :headers="headers"
                  :items="paginatedItems"
                  :items-per-page="10"
                  class="elevation-1 pt-5"
                  v-else
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
              <div class="text-center mt-10 pb-5">
                <v-pagination
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
export default {
  data: () => ({
    filter:'',
    page:1,
    links: [
      'Dashboard',
      'Messages',
    ],
    cloudItems: [
      {date: '2022-01-02',
        title: 'Pre-fab homes',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        size: 6
      },
      {date: '2022-01-02',
        title: 'Pre-fab homes',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        size: 6
      },
      {date: '2022-01-02',
        title: 'Pre-fab homes',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        size: 6
      },
      {date: '2022-01-02',
        title: 'Pre-fab homes',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        size: 6
      },
      {date: '2022-01-02',
        title: 'Pre-fab homes',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        size: 6
      },
      {date: '2022-01-02',
        title: 'Pre-fab homes',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        size: 6
      },
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
    paginationLength() {
      return Math.ceil(this.paginatedItems.length/10)
    },
    filteredItems() {
      return this.cloudItems.filter(item => item.title.toUpperCase().includes(this.filter.toUpperCase()));
    },
    paginatedItems() {
      return this.filteredItems.slice(this.startIndex, this.endIndex);
    },
  },
  watch:{
    filter() {
      this.page = 1;
    },
  },
}
</script>
<style>
.grid {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 110px);
}

.grid > * {
  height: 110px;
}
.hidden {
  width: 110px;
  height: 20px;
  overflow: hidden;
}
</style>