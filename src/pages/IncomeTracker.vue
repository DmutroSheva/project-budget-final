<template>
  <div class="tracker">
    <h2>Доходы</h2>
    <form @submit.prevent="addIncomeHandler" class="income-form">
      <select v-model="incomeCategory" required class="input-field">
        <option disabled value="">Выберите категорию</option>
        <option value="Зарплата">Зарплата</option>
        <option value="Фриланс">Фриланс</option>
        <option value="Инвестиции">Инвестиции</option>
        <option value="Прочее">Прочее</option>
      </select>
      <input v-model.number="incomeAmount" placeholder="Сумма" type="number" required class="input-field" />
      <h3>Отложить деньги на цели?</h3>
      <select v-model="selectedGoal" class="input-field">
        <option disabled value="">Выберите цель</option>
        <option v-for="goal in goals" :key="goal.id" :value="goal">{{ goal.title }}</option>
      </select>
      <input v-model.number="allocationAmount" placeholder="Сумма для откладывания" type="number" class="input-field" />
      <button type="submit" class="submit-button">Добавить Доход</button>
    </form>

    <ul class="income-list">
      <li v-for="(income, index) in incomes" :key="index" class="income-item">
        {{ income.category }}: {{ income.amount }} UA
        <button @click="removeIncomeHandler(income.id)" class="delete-button">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useBudgetStore } from '@/stores/budget';

export default {
  setup() {
    const budgetStore = useBudgetStore();
    const incomeCategory = ref('');
    const incomeAmount = ref(0);
    const selectedGoal = ref('');
    const allocationAmount = ref(0);

    const addIncomeHandler = async () => {
      if (incomeAmount.value > 0) {
        // Проверяем, выбрана ли цель и указана ли сумма для откладывания
        if (selectedGoal.value && allocationAmount.value > 0 && allocationAmount.value <= incomeAmount.value) {
          // Обновляем уже существующую цель, увеличивая отложенную сумму
          const goalToUpdate = selectedGoal.value;
          goalToUpdate.allocatedAmount += allocationAmount.value; // Увеличиваем отложенную сумму

          await budgetStore.updateGoal(goalToUpdate); // Обновляем цель

          incomeAmount.value -= allocationAmount.value; // Вычитаем сумму, отложенную на цель
        }

        await budgetStore.addIncome({
          category: incomeCategory.value,
          amount: incomeAmount.value,
        });

        // Сброс значений
        incomeCategory.value = '';
        incomeAmount.value = 0;
        selectedGoal.value = '';
        allocationAmount.value = 0;
      }
    };

    const removeIncomeHandler = async (incomeId) => {
      await budgetStore.removeIncome(incomeId);
    };

    return {
      incomeCategory,
      incomeAmount,
      incomes: computed(() => budgetStore.incomes),
      goals: computed(() => budgetStore.goals),
      selectedGoal,
      allocationAmount,
      addIncomeHandler,
      removeIncomeHandler,
    };
  },
};
</script>




  
  <style>
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

h3 {
  font-size: 20px;
  color: #38303aca;
  margin-top: 20px;
}
.income-form
.allocation-form {
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

.submit-button, .allocate-button {
  background-color: #6200ea;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover,
.allocate-button:hover {
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
.delete-button {
  background-color: #ff5252;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 15px;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #e04040;
}

input,
button {
  margin: 10px 0;
  padding: 10px;
  width: 90%;
}

.calculate-button {
  margin-top: 20px;
  width: 100%;
}

p {
  margin-top: 15px;
  text-align: center;
  color: #333;
  font-size: 16px;
}
  </style>
  