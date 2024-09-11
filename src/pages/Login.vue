<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-title>Вход</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="login">
        <v-text-field v-model="email" label="Email" required></v-text-field>
        <v-text-field v-model="password" label="Пароль" type="password" required></v-text-field>
        <v-btn type="submit" color="primary">Войти</v-btn>
      </v-form>
      <router-link to="/Register">Нет аккаунта? Зарегистрироваться</router-link>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from 'vue';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const login = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/Home');
      } catch (error) {
        console.error('Ошибка входа:', error);
      }
    };

    return { email, password, login };
  },
};
</script>
