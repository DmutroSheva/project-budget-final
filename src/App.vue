<template>
  <v-app>
    <!-- Шапка -->
    <Header />
    
    <!-- Контейнер с контентом -->
    <v-main>
      <v-container fluid>
        <router-view /> <!-- Основное содержание -->
      </v-container>
    </v-main>

    <!-- Футер -->
    <Footer />
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { auth } from './firebase';
import { ref, onMounted } from 'vue';
import { useBudgetStore } from './stores/budget';

export default {
  components: { Header, Footer },
  setup() {
    const user = ref(null);
    const budgetStore = useBudgetStore();

    onMounted(() => {
      auth.onAuthStateChanged(async (u) => {
        user.value = u;
        if (u) {
          await budgetStore.fetchData();
        }
      });
    });

    return { user, budgetStore };
  },
};
</script>

<style>
/* Добавьте стили для правильного позиционирования футера */

</style>

