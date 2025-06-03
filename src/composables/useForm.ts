import { ref } from 'vue';

export function useEmpForm<T extends { id: number | null; name: string }>(initialState: T) {
  const form = ref<T>({ ...initialState });

  const resetForm = () => {
    form.value = { ...initialState };
  };

  return { form, resetForm };
}
