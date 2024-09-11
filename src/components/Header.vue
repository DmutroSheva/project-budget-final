<template>
  <v-app-bar color="primary" dense>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-title>Мой бюджет</v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- Имя пользователя -->
    <v-banner-text v-if="isAuthenticated">{{ currentUser?.displayName || 'Пользователь' }}
      <v-icon icon="mdi-account-circle"></v-icon>
    </v-banner-text>
  </v-app-bar>

  <!-- Боковое меню -->
  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index" @click="navigateTo(item.route)">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Блок аутентификации -->
      <v-list-item v-if="!isAuthenticated" @click="navigateTo('/Login')">
        <v-list-item-title>Вход</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!isAuthenticated" @click="navigateTo('/Register')">
        <v-list-item-title>Регистрация</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isAuthenticated" @click="logout">
        <v-list-item-title>Выход</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth } from '@/firebase';
import { useRouter } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  setup() {
    const drawer = ref(false);
    const currentUser = ref(null); // Данные пользователя
    const isAuthenticated = ref(false); // Состояние аутентификации
    const router = useRouter();

    // Обновление данных при изменении состояния аутентификации
    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          currentUser.value = user;
          isAuthenticated.value = true;
        } else {
          currentUser.value = null;
          isAuthenticated.value = false;
        }
      });
    });

    const logout = async () => {
      await auth.signOut();
      currentUser.value = null;
      isAuthenticated.value = false;
      router.push('/Login');
    };

    const navigateTo = (route) => {
      router.push(route);
      drawer.value = false;
    };

    const items = [
      { title: 'Главная', route: '/Home' },
      { title: 'Доходы', route: '/IncomeTracker' },
      { title: 'Расходы', route: '/ExpenseTracker' },
      { title: 'Цели', route: '/Goals' },
      { title: 'Баланс', route: '/Balance' },
    ];

    return {
      drawer,
      currentUser,
      isAuthenticated,
      logout,
      items,
      navigateTo,
    };
  },
};
</script>

<style>
span {
  padding: 0 16px;
}
</style>