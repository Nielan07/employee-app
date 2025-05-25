<template>
  <q-page class="q-pa-md">
    <q-btn color="primary" label="Add User" @click="openCreateForm" class="q-mb-md" />

    <div class="row q-gutter-md">
      <EmployeeCard
        v-for="employee in employees"
        :key="employee.id"
        :employee="employee"
        @delete="deleteEmployee"
        @select="openEditForm"
      >
        <template #header>
          <div class="text-bold text-primary">{{ employee.name }}</div>
        </template>
      </EmployeeCard>
    </div>

    <q-dialog v-model="formDialog">
      <EmployeeForm :employee="editedEmployee" @save="handleSave" @cancel="closeForm" />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useEmployees } from 'src/composables/useEmployee';
import { useEmployeeStore } from 'src/stores/employeeStore';
import EmployeeCard from 'src/components/EmployeeCard.vue';
import EmployeeForm from 'src/components/EmployeeForm.vue';
import type { Employee } from 'src/types/Employee';

const { employees, fetchEmployees, deleteEmployee, createEmployee, updateEmployee } =
  useEmployees();
const store = useEmployeeStore();

const formDialog = ref(false);
const editedEmployee = ref<Employee | undefined>(undefined);

const openCreateForm = () => {
  editedEmployee.value = undefined;
  formDialog.value = true;
};

const openEditForm = (employee: Employee) => {
  editedEmployee.value = employee;
  formDialog.value = true;
};

const handleSave = async (data: Omit<Employee, 'id'> | Employee) => {
  if (editedEmployee.value) {
    await updateEmployee({ ...editedEmployee.value, ...data });
  } else {
    await createEmployee(data);
  }
};

const closeForm = () => {
  formDialog.value = false;
};

onMounted(fetchEmployees);
</script>
