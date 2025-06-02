import { ref, type Ref } from 'vue';

export function useEmpForm<T extends object>(initialState: T) {
  const form = ref({ ...initialState }) as Ref<T>;

  const resetForm = () => {
    form.value = { ...initialState };
  };

  return { form, resetForm };
}
