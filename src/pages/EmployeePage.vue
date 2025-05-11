<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-form @submit.prevent="handleSubmit">
        <q-input v-model="form.name" label="Name" filled class="q-mb-sm" />
        <q-btn type="submit" label="Save" color="secondary" class="q-mr-sm" />
        <q-btn label="Clear" color="secondary" @click="clearForm" />
      </q-form>
    </q-card>

    <q-table
      title="Employees"
      :rows="employees"
      :columns="columns"
      row-key="id"
      class="q-mt-md"
      flat
      bordered
      virtual-scroll
    >
      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn dense flat icon="edit" @click="editEmployee(props.row)" />
          <q-btn dense flat icon="delete" color="red" @click="removeEmployee(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

//script setup //composable // slots
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Employee } from 'src/types/Employee';
import * as employeeApi from 'src/api/employeeApi';
import type { QTableProps } from 'quasar';
import { useQuasar } from 'quasar';

const employees = ref<Employee[]>([]);
const form = ref<Partial<Employee>>({});
const editingId = ref<number | null>(null);
const $q = useQuasar();

const columns: QTableProps['columns'] = [
  { name: 'id', label: 'Id', field: 'id', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' },
];

onMounted(loadEmployees);

async function loadEmployees() {
  employees.value = await employeeApi.getEmployees();
}

async function handleSubmit() {
  if (editingId.value) {
    const updated = await employeeApi.updateEmployee(editingId.value, form.value);
    const index = employees.value.findIndex((u) => u.id === editingId.value);
    if (index > -1) employees.value[index] = updated;
  } else {
    const created = await employeeApi.createEmployee(form.value);
    employees.value.unshift(created);
  }
  clearForm();
  await loadEmployees();
}

function editEmployee(employee: Employee) {
  form.value = { ...employee };
  editingId.value = employee.id;
}

// eslint-disable-next-line @typescript-eslint/require-await
async function removeEmployee(id: number) {
  $q.dialog({
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this employee?',
    cancel: true,
    persistent: true,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
  }).onOk(async () => {
    await employeeApi.deleteEmployee(id);
    employees.value = employees.value.filter((u) => u.id !== id);
    await loadEmployees();
  });
}

function clearForm() {
  form.value = {};
  editingId.value = null;
}
</script>
