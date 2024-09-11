<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-title>Регистрация</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="register">
        <!-- Поле для юзернейма -->
        <v-text-field v-model="username" label="Имя пользователя" required></v-text-field>
        <v-text-field v-model="email" label="Email" required></v-text-field>
        <v-text-field v-model="password" label="Пароль" type="password" required></v-text-field>
        <v-checkbox v-model="terms" label="Я согласен с условиями" required></v-checkbox>
        <v-btn type="submit" color="primary">Зарегистрироваться</v-btn>
      </v-form>
      <router-link to="/Login">Уже есть аккаунт? Войти</router-link>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from 'vue';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const username = ref(''); // Новое поле для имени пользователя
    const terms = ref(false);
    const router = useRouter();

    const register = async () => {
      if (!terms.value) {
        alert('Примите условия');
        return;
      }
      try {
        // Создание пользователя
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // Обновление профиля пользователя с юзернеймом
        await updateProfile(user, {
          displayName: username.value,
        });

        // Перенаправление на домашнюю страницу
        router.push('/Home');
      } catch (error) {
        console.error('Ошибка регистрации:', error);
      }
    };

    return { email, password, username, terms, register };
  },
};
</script>
