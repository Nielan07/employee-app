<template>
  <q-page padding>
    <employee-list @edit="editEmployee" @delete="deleteEmployee" />
    <q-dialog v-model="showForm">
      <employee-form
        @cancel="showForm = false"
        @saved="handleEmployeeSaved"
        :employee="selectedEmployee"
      />
    </q-dialog>
    <q-btn label="Add Employee" @click="addEmployee" color="primary" />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import EmployeeList from 'src/components/EmployeeList.vue';
import EmployeeForm from 'src/components/EmployeeForm.vue';
import { useEmployeeStore } from 'src/stores/employeeStore';

const store = useEmployeeStore();
const showForm = ref(false);
const selectedEmployee = ref(null);

onMounted(() => {
  void store.fetchEmployees();
});

const addEmployee = () => {
  selectedEmployee.value = null;
  showForm.value = true;
};
const editEmployee = (employee: null) => {
  selectedEmployee.value = employee;
  showForm.value = true;
};
const deleteEmployee = async (id: number) => {
  await store.deleteEmployee(id);
};
const handleEmployeeSaved = () => {
  showForm.value = false;
  selectedEmployee.value = null;
};
</script>
