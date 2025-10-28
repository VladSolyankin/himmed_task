import { ref, computed } from "vue";

export function useTasksView() {
  const selectedTaskId = ref<string | null>(null);
  const historyStack = ref<
    Array<{ mode: "list" | "detail"; date?: string; selectedId?: string }>
  >([]);

  const showBack = computed(() => historyStack.value.length > 0);

  function openDetail(id: string, currentDate?: string) {
    historyStack.value.push({ mode: "list", date: currentDate });
    selectedTaskId.value = id;
  }

  function goBack() {
    historyStack.value.pop();
    selectedTaskId.value = null;
  }

  function reset() {
    selectedTaskId.value = null;
    historyStack.value = [];
  }

  return {
    selectedTaskId,
    historyStack,
    showBack,
    openDetail,
    goBack,
    reset,
  };
}
