<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-title>Вход</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="login">
        <v-text-field v-model="email" label="Email" required></v-text-field>
        <v-text-field v-model="password" label="Пароль" type="password" required></v-text-field>
        <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert> <!-- Сообщение об ошибке -->
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
    const error = ref(''); // Поле для хранения ошибок
    const router = useRouter();

    const login = async () => {
      try {
        // Очищаем поле ошибки перед попыткой входа
        error.value = '';
        
        // Попытка входа
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/Home'); // Перенаправление на домашнюю страницу
      } catch (err) {
        // Обработка ошибки входа
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          error.value = 'Неправильный логин или пароль. Пожалуйста, попробуйте снова.';
        } else {
          error.value = 'Ошибка входа: ' + err.message;
        }
      }
    };

    return { email, password, error, login };
  },
};
</script>

