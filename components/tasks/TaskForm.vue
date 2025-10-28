<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <h2 class="text-lg font-semibold">Новая задача</h2>
    <div class="space-y-2">
      <label class="block text-sm font-medium">Название *</label>
      <input
        v-model.trim="model.title"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Например: Купить продукты"
        required
      />
    </div>
    <div class="space-y-2">
      <label class="block text-sm font-medium">Дата *</label>
      <input
        v-model="model.date"
        type="date"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        required
      />
    </div>
    <div class="space-y-2">
      <label class="block text-sm font-medium">Описание</label>
      <textarea
        v-model.trim="model.description"
        rows="4"
        class="w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Подробнее о задаче"
      />
    </div>
    <div class="flex justify-end gap-3">
      <button
        type="button"
        class="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
        @click="$emit('cancel')"
      >
        Отмена
      </button>
      <button
        type="submit"
        class="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        Сохранить
      </button>
    </div>
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useTasksStore } from "@/stores/tasks";
import type { CreateTaskPayload } from "@/types/task";

const emit = defineEmits<{ (e: "success"): void; (e: "cancel"): void }>();

const model = reactive<CreateTaskPayload>({
  title: "",
  date: "",
  description: "",
});
const error = ref<string>("");

const store = useTasksStore();

function onSubmit() {
  try {
    store.addTask(model);
    emit("success");
  } catch (e: any) {
    error.value = e?.message || "Ошибка сохранения";
  }
}
</script>

<style scoped></style>
