import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Task, CreateTaskPayload } from "@/types/task";

const STORAGE_KEY = "daily-planner:tasks";

function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value));
    } catch (error) {
      console.error("Ошибка сохранения в localStorage", error);
    }
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        tasks.value = parsed;
      }
    } catch {
      tasks.value = [];
    }
  }

  function addTask(payload: CreateTaskPayload) {
    if (!payload.title?.trim() || !payload.date?.trim()) {
      throw new Error("Обязательные поля: название и дата");
    }
    const newTask: Task = {
      id: generateId(),
      title: payload.title.trim(),
      date: payload.date,
      description: payload.description?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    tasks.value.unshift(newTask);
    persist();
  }

  function removeTask(id: string) {
    const idx = tasks.value.findIndex((t) => t.id === id);
    if (idx !== -1) {
      tasks.value.splice(idx, 1);
      persist();
    }
  }

  const allTasks = computed(() => tasks.value);

  const tasksByDate = computed(() => (date?: string) => {
    if (!date) return tasks.value;
    return tasks.value.filter((t) => t.date === date);
  });

  return {
    tasks,
    allTasks,
    tasksByDate,
    loadFromStorage,
    addTask,
    removeTask,
  };
});
