<template>
      <form class="form" @submit.prevent="sendForm">
        <div class="form-group">
          <label class="form-label">Email</label>
          <div class="input-group">
            <input type="email" placeholder="demo@email" v-model="email" class="form-control" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Пароль</label>
          <div class="input-group">
            <input type="password" placeholder="password" v-model="password" class="form-control" />
          </div>
        </div>
        <div class="form__buttons">
          <button type="submit" class="button button_primary button_block">Войти</button>
        </div>
        <div class="form__append">Нет аккаунта? <router-link :to="{name: 'register'}" class="link">Зарегистрируйтесь</router-link></div>
      </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    sendForm() {
      if (!this.email) {
        alert('Требуется ввести Email');
        return;
      }
      if (!this.password) {
        alert('Требуется ввести пароль');
        return;
      }
      login(this.email, this.password).then((res) => {
        if (res.error) {
          alert('Неверные учетные данные');
        } else {
          alert(res.fullname);
        }
      });
    }
  }

};
</script>

<style scoped></style>
