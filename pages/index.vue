<template>
  <div class="min-h-full bg-gray-50 text-gray-900">
    <div class="mx-auto max-w-3xl px-4 py-6">
      <header class="flex items-center justify-between gap-4">
        <h1 class="text-2xl font-semibold">Ежедневник</h1>
        <div class="flex items-center gap-3">
          <input
            v-model="dateFilter"
            type="date"
            class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            :max="today"
            placeholder="Выберите дату"
          />
          <button
            @click="openCreateForm"
            class="inline-flex items-center justify-center rounded-full bg-blue-600 p-2 text-white shadow hover:bg-blue-700 focus:outline-none"
            aria-label="Добавить задачу"
            title="Добавить задачу"
          >
            <span class="text-xl leading-none">+</span>
          </button>
        </div>
      </header>

      <main class="mt-6">
        <TaskList
          :date="dateFilter || undefined"
          @request-create="openCreateForm"
        />
      </main>
    </div>

    <Modal v-if="showCreate" @close="closeCreateForm">
      <TaskForm @success="handleCreated" @cancel="closeCreateForm" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useTasksStore } from "@/stores/tasks";
import TaskList from "@/components/tasks/TaskList.vue";
import Modal from "@/components/ui/Modal.vue";
import TaskForm from "@/components/tasks/TaskForm.vue";

const store = useTasksStore();
onMounted(() => {
  store.loadFromStorage();
});

const showCreate = ref(false);
function openCreateForm() {
  showCreate.value = true;
}
function closeCreateForm() {
  showCreate.value = false;
}
function handleCreated() {
  showCreate.value = false;
}

const dateFilter = ref<string>("");
const today = computed(() => new Date().toISOString().slice(0, 10));

watch(dateFilter, (val) => {
  if (!val) {
    // очистка фильтра — список вернется к "все"
  }
});
</script>

<style scoped></style>
