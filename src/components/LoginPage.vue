<template>
  <v-app id="inspire">
    <v-snackbar
        v-model="snackbar"
        top
        :timeout="2000"
    >
      Неправильно введён пароль или email
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
                :rules="emailRules"
            >
            </v-text-field>
            <v-text-field
                v-model="password"
                placeholder="Пароль"
                :rules="requiredRules"
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
import instance from "@/API/Axios";

export default {
  name: "LoginPage",
  data: () => ({
    snackbar: false,
    password: '',
    token: '',
    email: '',
    emailRules: [
      v => !!v || 'Введите e-mail',
      v => /.+@.+/.test(v) || 'Введите валидный e-mail',
    ],
    requiredRules: [
      v => !!v || 'Введите пароль',
    ],
  }),
  methods: {
    async loginClick() {
      await instance.post(`auth/login?email=${this.email}&password=${this.password}`)
          .then(response => {
            this.token = response.data.data.token
            localStorage.setItem('token', response.data.data.token)
            this.$router.push('home')
          }).catch(() => {
            this.snackbar = true
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