<template>
  <q-card>
    <q-card-section>
      <q-input v-model="form.name" label="Name" />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn label="Cancel" @click="$emit('cancel')" color="secondary" />
      <q-btn label="Save" @click="saveEmployee" color="primary" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useEmpForm } from 'src/composables/useForm';
import { useEmployeeStore } from 'src/stores/employeeStore';
import type { Employee } from 'src/types/Employee';
import { watch } from 'vue';

const props = defineProps<{ employee: Employee | null }>();

const emit = defineEmits(['cancel', 'saved']);
const strore = useEmployeeStore();
const { form, resetForm } = useEmpForm({
  id: null as number | null,
  name: '',
});

watch(
  () => props.employee,
  (newEmployee) => {
    if (newEmployee) {
      form.value.id = newEmployee.id;
      form.value.name = newEmployee.name;
    } else {
      resetForm();
    }
  },
  { immediate: true },
);

const saveEmployee = async () => {
  if (form.value.id) {
    await strore.updateEmployee(form.value.id, {
      name: form.value.name,
      id: 0,
    });
  } else {
    await strore.createEmployee({ name: form.value.name });
  }
  emit('saved');
  resetForm();
};
</script>
