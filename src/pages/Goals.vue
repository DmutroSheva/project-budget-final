<template>
  <div class="goals">
    <h2>Финансовые цели</h2>
    <p><strong>Отложено всего:</strong> {{ totalAllocatedAmount }} UA</p> <!-- Общий баланс отложенных денег -->
    <form @submit.prevent="addNewGoalHandler" class="goal-form">
      <select v-model="selectedCategory" required class="input-field">
        <option value="" disabled>Выберите категорию</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <input v-model="goalTitle" placeholder="Название цели" required class="input-field" />
      <input v-model.number="goalAmount" type="number" placeholder="Сумма цели" required class="input-field" />
      <button type="submit" class="submit-button">Добавить Цель</button>
    </form>

    <ul>
      <li v-for="goal in goals" :key="goal.id">
        <strong>{{ goal.category }}</strong> ({{ goal.title }}): {{ goal.allocatedAmount }} / {{ goal.amount }} UA
        <p>Прогресс: {{ goalProgress(goal) }}%</p>
        <div class="progress-bar">
          <div class="progress" :style="{ width: goalProgress(goal) + '%' }"></div>
        </div>
        <button @click="deleteGoalHandler(goal.id)" class="delete-button">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useBudgetStore } from '@/stores/budget';

export default {
  name: 'Goals',
  setup() {
    const budgetStore = useBudgetStore();
    const goalTitle = ref('');
    const selectedCategory = ref('');
    const goalAmount = ref(0);
    const categories = ref(['Сбережения', 'Путешествия', 'Образование', 'Покупки']);

    const addNewGoalHandler = async () => {
      const goalId = Date.now().toString();
      await budgetStore.addGoal({
        id: goalId,
        title: goalTitle.value,
        category: selectedCategory.value,
        amount: goalAmount.value,
        allocatedAmount: 0, // Изначально отложено 0
      });
      goalTitle.value = '';
      selectedCategory.value = '';
      goalAmount.value = 0;
    };

    const deleteGoalHandler = async (goalId) => {
      await budgetStore.removeGoal(goalId);
    };

    const goals = computed(() => budgetStore.goals);
    const totalAllocatedAmount = computed(() =>
      goals.value.reduce((sum, goal) => sum + goal.allocatedAmount, 0)
    );

    const goalProgress = (goal) => {
      return ((goal.allocatedAmount / goal.amount) * 100).toFixed(2);
    };

    return {
      goalTitle,
      selectedCategory,
      goalAmount,
      addNewGoalHandler,
      deleteGoalHandler,
      goals,
      categories,
      totalAllocatedAmount,
      goalProgress,
    };
  },
};
</script>




  
    <style scoped>
    .goals {
  max-width: 400px;
  margin: 0 auto;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.income-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-field {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #6200ea;
}

.submit-button {
  background-color: #6200ea;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #3700b3;
}

.income-list {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

.income-item {
  background-color: #ffffff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 16px;
}
input,
button {
  margin: 10px 0;
  padding: 10px;
  width: 90%;
}
ul {
  list-style-type: none;
  padding: 0;
}
  </style>