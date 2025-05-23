import { defineStore } from 'pinia';
import type { Employee } from 'src/types/Employee';
import { useEmployeeApi } from 'src/composables/useEmployeeApi';

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [] as Employee[],
    loading: false,
  }),

  actions: {
    async fetchEmployees() {
      this.loading = true;
      const { getEmployees } = useEmployeeApi();
      this.employees = await getEmployees();
      this.loading = false;
    },
    async createEmployee(employee: Partial<Employee>) {
      const { createEmployee } = useEmployeeApi();
      const newEmployee = await createEmployee(employee);
      this.employees.push(newEmployee);
    },
    async updateEmployee(employee: Employee) {
      const { updateEmployee } = useEmployeeApi();
      const updatedEmployee = await updateEmployee(employee);
      const index = this.employees.findIndex((emp) => emp.id === employee.id);
      if (index !== -1) {
        this.employees[index] = updatedEmployee;
      }
    },
    async deleteEmployee(id: number) {
      const { deleteEmployee } = useEmployeeApi();
      await deleteEmployee(id);
      this.employees = this.employees.filter((emp) => emp.id !== id);
    },
  },
});
