<template>
  <q-form @submit.prevent="onSubmit">
    <q-card>
      <q-card-section>
        <q-input v-model="form.name" label="Name" filled />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="secondary" @click="$emit('cancel')" />
        <q-btn type="submit" label="Save" color="primary" />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue';
import type { Employee } from 'src/types/Employee';

const props = defineProps<{ employee?: Employee }>();
const emit = defineEmits<{
  (e: 'save', data: Omit<Employee, 'id'> | Employee): void;
  (e: 'cancel'): void;
}>();

const form = ref<Omit<Employee, 'id'> & { id?: number }>({
  name: '',
});

watch(
  () => props.employee,
  (newVal) => {
    form.value = newVal ? { ...newVal } : { name: '' };
  },
  { immediate: true },
);

const onSubmit = () => {
  emit('save', form.value);
};
</script>
