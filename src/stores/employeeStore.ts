import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useApi } from 'src/composables/useApi';
import type { Employee } from 'src/types/Employee';

export const useEmployeeStore = defineStore('employeeStore', () => {
  const employees = ref<Employee[]>([]);
  const { loading, error, apiRequest } = useApi();

  const fetchEmployees = async () => {
    try {
      employees.value = await apiRequest('employees', 'get');
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  const createEmployee = async (newEmployee: Omit<Employee, 'id'>) => {
    try {
      const createdEmployee = await apiRequest('employees', 'post', newEmployee);
      employees.value.push(createdEmployee);
    } catch (err) {
      console.error('Error creating employee:', err);
    }
  };

  const updateEmployee = async (id: number, updatedEmployee: Employee) => {
    try {
      const updated = await apiRequest(`items/${id}`, 'put', updatedEmployee);
      const index = employees.value.findIndex((employee) => employee.id === id);
      if (index !== -1) {
        employees.value.splice(index, 1, updated);
      }
    } catch (err) {
      console.error('Error updating employee:', err);
    }
  };

  const deleteEmployee = async (id: number) => {
    try {
      await apiRequest(`items/${id}`, 'delete');
      employees.value = employees.value.filter((employee) => employee.id !== id);
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
});
