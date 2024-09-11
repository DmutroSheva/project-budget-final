<template>
  <div class="balance">
    <h2><strong>Баланс:</strong> {{ balance }} UA</h2>
    <p><strong>Всего заработано:</strong> {{ totalIncome }} UA</p>
    <p><strong>Всего потрачено:</strong> {{ totalExpense }} UA</p>

    <h3>Прогресс по целям:</h3>
    <ul>
      <li v-for="goal in goals" :key="goal.id">
        <p><strong>{{ goal.title }}:</strong> {{ goalProgress(goal) }}% выполнено</p>
        <div class="progress-bar">
          <div class="progress" :style="{ width: goalProgress(goal) + '%' }"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useBudgetStore } from '@/stores/budget';

export default {
  setup() {
    const budgetStore = useBudgetStore();

    const totalIncome = computed(() => budgetStore.totalIncome);
    const totalExpense = computed(() => budgetStore.totalExpense);
    const balance = computed(() => budgetStore.balance);
    const goals = computed(() => budgetStore.goals);

    // Прогресс цели основывается только на отложенной сумме
    const goalProgress = (goal) => {
      return ((goal.allocatedAmount / goal.amount) * 100).toFixed(2);
    };

    return {
      totalIncome,
      totalExpense,
      balance,
      goals,
      goalProgress,
    };
  },
};
</script>


<style scoped>
.balance {
  background-color: #aa80ee;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
  border-radius: 8px;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  margin-top: 20px;
}

.progress-bar {
  background-color: #ddd;
  border-radius: 6px;
  width: 100%;
  height: 20px;
  margin-top: 10px;
}

.progress {
  background-color: #6200ea;
  height: 100%;
  border-radius: 6px;
}

li {
  margin-bottom: 15px;
}
ul {
  list-style-type: none;
  padding: 0;
}
</style>
