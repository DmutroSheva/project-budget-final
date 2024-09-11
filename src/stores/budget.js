import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/firebase'; // Импорт Firestore
import { collection, doc, setDoc, getDocs, query, Timestamp, deleteDoc } from 'firebase/firestore';
import { auth } from '@/firebase'; // Импорт аутентификации Firebase

export const useBudgetStore = defineStore('budget', () => {
  const expenses = ref([]);
  const incomes = ref([]);
  const goals = ref([]);

  // Проверка на авторизацию пользователя
  const isAuthenticated = () => auth.currentUser !== null;

  // Добавление расхода в Firestore
  const addExpense = async (expense) => {
    if (!isAuthenticated()) {
      console.error("Пользователь не авторизован.");
      return;
    }

    const userId = auth.currentUser.uid;
    const expenseId = Date.now().toString();
    const expenseData = {
      ...expense,
      createdAt: Timestamp.fromDate(new Date()),
    };

    try {
      await setDoc(doc(db, "users", userId, "expenses", expenseId), expenseData);
      expenses.value.push({ id: expenseId, ...expenseData });
    } catch (error) {
      console.error("Ошибка при добавлении расхода в Firestore:", error);
    }
  };

  // Загрузка расходов из Firestore
  const fetchExpenses = async () => {
    if (!isAuthenticated()) {
      console.error("Пользователь не авторизован.");
      return;
    }

    const userId = auth.currentUser.uid;
    const expenseQuery = query(collection(db, "users", userId, "expenses"));
    try {
      const expenseSnapshot = await getDocs(expenseQuery);
      expenses.value = expenseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Ошибка при загрузке расходов из Firestore:", error);
    }
  };

  // Удаление расхода из Firestore
  const deleteExpense = async (expenseId) => {
    if (!isAuthenticated()) {
      console.error("Пользователь не авторизован.");
      return;
    }

    const userId = auth.currentUser.uid;
    try {
      await deleteDoc(doc(db, "users", userId, "expenses", expenseId));
      expenses.value = expenses.value.filter(expense => expense.id !== expenseId);
    } catch (error) {
      console.error("Ошибка при удалении расхода из Firestore:", error);
    }
  };

  // Добавление дохода в Firestore
  const addIncome = async (income) => {
    if (!isAuthenticated()) {
      console.error("Пользователь не авторизован.");
      return;
    }

    const userId = auth.currentUser.uid;
    const incomeId = Date.now().toString();
    const incomeData = {
      ...income,
      createdAt: Timestamp.fromDate(new Date()),
    };

    try {
      await setDoc(doc(db, "users", userId, "incomes", incomeId), incomeData);
      incomes.value.push({ id: incomeId, ...incomeData });
    } catch (error) {
      console.error("Ошибка при добавлении дохода в Firestore:", error);
    }
  };

  // Удаление дохода из Firestore
  const removeIncome = async (incomeId) => {
    if (!isAuthenticated()) {
      console.error("Пользователь не авторизован.");
      return;
    }

    const userId = auth.currentUser.uid;
    try {
      await deleteDoc(doc(db, "users", userId, "incomes", incomeId));
      incomes.value = incomes.value.filter((income) => income.id !== incomeId);
    } catch (error) {
      console.error("Ошибка при удалении дохода из Firestore:", error);
    }
  };

  // Загрузка доходов из Firestore
  const fetchIncomes = async () => {
    if (!isAuthenticated()) {
      console.error("Пользователь не авторизован.");
      return;
    }

    const userId = auth.currentUser.uid;
    const incomeQuery = query(collection(db, "users", userId, "incomes"));
    try {
      const incomeSnapshot = await getDocs(incomeQuery);
      incomes.value = incomeSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Ошибка при загрузке доходов из Firestore:", error);
    }
  };

  // Добавление цели в Firestore
  const addGoal = async (goal) => {
    if (!isAuthenticated()) {
      console.error("Пользователь не авторизован.");
      return;
    }

    const userId = auth.currentUser.uid;
    const goalId = Date.now().toString();
    const goalData = {
      ...goal,
      createdAt: Timestamp.fromDate(new Date()),
    };

    try {
      await setDoc(doc(db, "users", userId, "goals", goalId), goalData);
      goals.value.push({ id: goalId, ...goalData });
    } catch (error) {
      console.error("Ошибка при добавлении цели в Firestore:", error);
    }
  };

  // Удаление цели из Firestore
  const removeGoal = async (goalId) => {
    if (!isAuthenticated()) {
      console.error("Пользователь не авторизован.");
      return;
    }

    const userId = auth.currentUser.uid;
    try {
      await deleteDoc(doc(db, "users", userId, "goals", goalId));
      goals.value = goals.value.filter((goal) => goal.id !== goalId);
    } catch (error) {
      console.error("Ошибка при удалении цели из Firestore:", error);
    }
  };

  // Загрузка целей из Firestore
  const fetchGoals = async () => {
    if (!isAuthenticated()) {
      console.error("Пользователь не авторизован.");
      return;
    }

    const userId = auth.currentUser.uid;
    const goalQuery = query(collection(db, "users", userId, "goals"));
    try {
      const goalSnapshot = await getDocs(goalQuery);
      goals.value = goalSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Ошибка при загрузке целей из Firestore:", error);
    }
  };

  // Обновление существующей цели в Firestore
  const updateGoal = async (updatedGoal) => {
    if (!isAuthenticated()) {
      console.error("Пользователь не авторизован.");
      return;
    }

    const userId = auth.currentUser.uid;
    const goalRef = doc(db, "users", userId, "goals", updatedGoal.id);

    try {
      // Обновляем цель в Firestore
      await setDoc(goalRef, updatedGoal, { merge: true });
      // Находим и обновляем цель в локальном хранилище
      const goalIndex = goals.value.findIndex(goal => goal.id === updatedGoal.id);
      if (goalIndex !== -1) {
        goals.value[goalIndex] = { ...updatedGoal }; // Обновляем существующую цель
      }
    } catch (error) {
      console.error("Ошибка при обновлении цели в Firestore:", error);
    }
  };

  // Вычисляемая сумма всех расходов
  const totalExpense = computed(() => {
    return expenses.value.reduce((total, expense) => total + (expense.amount || 0), 0);
  });

  // Вычисляемая сумма всех доходов
  const totalIncome = computed(() => {
    return incomes.value.reduce((total, income) => total + (income.amount || 0), 0);
  });

  // Вычисляемый баланс (доходы - расходы)
  const balance = computed(() => totalIncome.value - totalExpense.value);

  // Загрузка всех данных при аутентификации пользователя
  const fetchData = async () => {
    await fetchExpenses();
    await fetchIncomes();
    await fetchGoals();
  };

  return {
    expenses,
    incomes,
    goals,
    addExpense,
    deleteExpense,
    addIncome,
    removeIncome,
    addGoal,
    removeGoal,
    updateGoal,
    fetchExpenses,
    fetchIncomes,
    fetchGoals,
    fetchData,
    totalExpense,
    totalIncome,
    balance,
  };
});
