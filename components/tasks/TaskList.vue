<template>
  <section class="space-y-3">
    <div v-if="showBack" class="mb-1">
      <button class="text-sm text-blue-600 hover:underline" @click="goBack">
        ← Назад
      </button>
    </div>

    <div v-if="!selectedTaskId">
      <p v-if="items.length === 0" class="text-sm text-gray-500">
        Задач нет. Добавьте первую с помощью кнопки "+".
      </p>
      <div class="grid grid-cols-1 gap-3">
        <TaskItem
          v-for="t in items"
          :key="t.id"
          :task="t"
          @open="openTask"
          @delete="deleteTask"
        />
      </div>
    </div>

    <div v-else>
      <TaskItem
        v-if="selected"
        :task="selected"
        :expanded="true"
        @delete="deleteTask"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useTasksStore } from "@/stores/tasks";
import TaskItem from "@/components/tasks/TaskItem.vue";
import { useTasksView } from "@/composables/useTasksView";
import type { Task } from "@/types/task";

const props = defineProps<{ date?: string }>();
const emit = defineEmits<{ (e: "request-create"): void }>();

const store = useTasksStore();
const { tasks } = storeToRefs(store);

const items = computed(() => store.tasksByDate(props.date));

const { selectedTaskId, showBack, openDetail, goBack, reset } = useTasksView();

const selected = computed(
  () => tasks.value.find((t: Task) => t.id === selectedTaskId.value) || null
);

function deleteTask(id: string) {
  store.removeTask(id);
  if (selectedTaskId.value === id) {
    // при удалении из детали — вернуться к предыдущему виду
    goBack();
  }
}

watch(
  () => props.date,
  () => {
    // Если пользователь очистил фильтр даты — убрать back, вернуть список
    if (!props.date) {
      reset();
    }
  }
);

function openTask(id: string) {
  openDetail(id, props.date);
}
</script>

<style scoped></style>
