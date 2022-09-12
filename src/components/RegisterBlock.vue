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
                  v-model="name"
                  placeholder="Имя"
              >
              </v-text-field>
              <v-text-field
                  v-model="password"
                  placeholder="Пароль"
              >
              </v-text-field>
              <v-text-field
                  v-model="passwordDouble"
                  placeholder="Повторите пароль"
              >
              </v-text-field>
              <span
              >
                Есть аккаунт?
            </span>
              <router-link to="/">
              <span>
                Войти
              </span>
              </router-link>
              <v-btn
                  block
                  color="primary"
                  @click="registerClick"
                  class="mt-4"
              >
                Зарегистрироваться
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
  name: "RegisterBlock",
  data: () => ({
    name: '',
    passwordDouble: '',
    token: '',
    password: '',
    email: '',
  }),
  methods:{
    async registerClick(){
      await axios.post(`http://markwebdev.ru/api/v1/auth/register?email=${this.email}&name=Name11&password==${this.password}`)
          .then(response => {
            console.log(response.data)
            this.$router.push('/')
          }).catch(error => {
            console.log(error)
          })
    },
    async query(){
      console.log(localStorage.getItem('token'))
      await axios.get(`http://markwebdev.ru/api/v1/files`,{ headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
          .then(response => {
            console.log(response.data)
          }).catch(error => {
            console.log(error)
          })
    },
  }
}
</script>

<style scoped>

</style>