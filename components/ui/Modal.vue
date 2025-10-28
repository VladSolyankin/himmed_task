<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="$emit('close')"></div>
    <div
      class="relative z-10 w-full max-w-lg rounded-lg bg-white p-4 shadow-lg"
    >
      <button
        class="absolute right-2 top-2 rounded p-1 text-gray-500 hover:bg-gray-100"
        aria-label="Закрыть"
        @click="$emit('close')"
      >
        ✕
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ (e: "close"): void }>();
</script>

<style scoped></style>
