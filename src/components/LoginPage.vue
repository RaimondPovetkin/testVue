<template>
  <v-app id="inspire">
    <v-container fill-height fluid>
      <v-row justify="space-around" align="center">
        <v-col
            cols="12"
            md="4"
        >
          <v-sheet
              elevation="10"
              class="mx-auto pa-10"
              rounded
          >
            <v-text-field
                v-model="email"
                placeholder="Почтовый адрес"
                required
            >
            </v-text-field>
            <v-text-field
                v-model="password"
                placeholder="Пароль"
            >
            </v-text-field>
            <span>
                Нет аккаунта?
            </span>
            <router-link to="register">
              <span>
                Зарегистрироваться
              </span>
            </router-link>

              <v-btn
                  block
                  color="primary"
                  class="mt-4"
                  @click="loginClick"
              >
                Войти
              </v-btn>

          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data: () => ({
    password: '',
    token: '',
    email: '',
  }),
  methods: {
    async loginClick() {
      await axios.post(`http://markwebdev.ru/api/v1/auth/login?email=${this.email}&password=${this.password}`)
          .then(response => {
            this.token = response.data.data.token
            localStorage.setItem('token', response.data.data.token)
            this.$router.push('home')
          }).catch(error => {
            console.log(error)
          })
    },
  }
}
</script>

<style scoped>
a {
  color: #8d8176;
  text-decoration: none !important;
  border: none !important;
}
</style>