<template>
  <div class="tracker">
    <h2>Расходы</h2>
    <form @submit.prevent="addExpenseHandler" class="expense-form">
      <select v-model="selectedCategory" required class="input-field">
        <option value="" disabled>Выберите категорию</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <input v-model.number="expenseAmount" placeholder="Сумма" type="number" required class="input-field" />
      
      <button type="submit" class="submit-button">Добавить Расход</button>
    </form>

    <ul>
      <li v-for="(expense, index) in expenses" :key="expense.id">
        {{ expense.category }}: {{ expense.amount }} UA
        <button @click="deleteExpenseHandler(expense.id)" class="delete-button">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useBudgetStore } from '@/stores/budget';

export default {
  setup() {
    const budgetStore = useBudgetStore();
    
    // Доступные категории расходов
    const categories = ref(['Продукты', 'Транспорт', 'Развлечения', 'Здоровье', 'Образование']);

    const selectedCategory = ref('');
    const expenseAmount = ref(0);

    const addExpenseHandler = async () => {
      if (selectedCategory.value && expenseAmount.value > 0) {
        try {
          await budgetStore.addExpense({
            category: selectedCategory.value,
            amount: expenseAmount.value,
          });
          selectedCategory.value = '';
          expenseAmount.value = 0;
        } catch (error) {
          console.error("Ошибка при добавлении расхода:", error);
        }
      }
    };

    const deleteExpenseHandler = async (expenseId) => {
      try {
        await budgetStore.deleteExpense(expenseId);
      } catch (error) {
        console.error("Ошибка при удалении расхода:", error);
      }
    };

    onMounted(() => {
      budgetStore.fetchExpenses(); // Загрузка расходов при монтировании
    });

    return {
      categories,
      selectedCategory,
      expenseAmount,
      expenses: computed(() => budgetStore.expenses),
      addExpenseHandler,
      deleteExpenseHandler,
    };
  },
};
</script>



  
  <style scoped>
  .tracker {
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
  