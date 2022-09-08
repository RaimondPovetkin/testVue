<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-container>
        <v-select
            menu-props="auto"
            label="Select"
            hide-details
            single-line
        ></v-select>
        <v-text-field
            class="mr-8"
            dense
            flat
            hide-details
            rounded
            solo-inverted
        ></v-text-field>
        <menu-container></menu-container>
      </v-container>

    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      main
    </v-main>
  </v-app>
</template>

<script>
import MenuContainer from "@/components/MenuContainer";
export default {
  components: {MenuContainer},
  data: () => ({ drawer: null }),
}
</script>