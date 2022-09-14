<template>
  <v-app id="inspire">

    <v-snackbar
        v-model="snackbar"
        top
        :timeout="2000"
    >
      Заполните поля правильно пожалуйста
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
          <v-form
              v-model="valid"
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
                  v-model="name"
                  placeholder="Имя"
                  :rules="requiredRules"
              >
              </v-text-field>
              <v-text-field
                  type="password"
                  v-model="password"
                  placeholder="Пароль"
                  :rules="requiredRules"
              >
              </v-text-field>
              <v-text-field
                  type="password"
                  v-model="passwordDouble"
                  placeholder="Повторите пароль"
                  :rules="[password === passwordDouble || 'Пароли должны совпадать']"
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
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import instance from "@/API/Axios";

export default {
  name: "RegisterBlock",
  data: () => ({
    snackbar: false,
    valid: false,
    name: '',
    passwordDouble: '',
    token: '',
    password: '',
    email: '',
    emailRules: [
      v => !!v || 'Введите e-mail',
      v => /.+@.+/.test(v) || 'Введите валидный e-mail',
    ],
    requiredRules: [
      v => !!v || 'Введите пароль',
    ],
  }),
  methods:{
    async registerClick(){
      if(this.valid){
        await instance.post(`auth/register?email=${this.email}&name=${this.name}&password=${this.password}`)
            .then(response => {
              console.log(this.email)
              console.log(this.password)
              console.log(response.data)
              this.$router.push('/')
            }).catch(error => {
              console.log(error)
            })
      } else {
        this.snackbar = true
      }
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