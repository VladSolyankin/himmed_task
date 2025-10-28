<template>
  <article
    class="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow"
  >
    <button
      class="absolute right-2 top-2 hidden rounded p-1 text-gray-500 hover:bg-red-50 hover:text-red-600 group-hover:block"
      title="Удалить"
      aria-label="Удалить"
      @click.stop="$emit('delete', task.id)"
    >
      🗑
    </button>

    <div class="cursor-pointer" @click="$emit('open', task.id)">
      <h3 class="text-base font-semibold">{{ task.title }}</h3>
      <p class="text-xs text-gray-500">{{ task.date }}</p>
    </div>

    <div
      v-if="expanded"
      class="mt-3 border-t pt-3 text-sm text-gray-700 whitespace-pre-line"
    >
      {{ task.description || "Без описания" }}
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Task } from "@/types/task";

defineProps<{ task: Task; expanded?: boolean }>();
defineEmits<{
  (e: "open", id: string): void;
  (e: "delete", id: string): void;
}>();
</script>

<style scoped></style>
