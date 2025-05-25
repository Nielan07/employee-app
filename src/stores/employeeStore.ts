import { defineStore } from 'pinia';
import type { Employee } from 'src/types/Employee';

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    selectedEmployee: null as Employee | null,
  }),
  actions: {
    selectEmployee(employee: Employee) {
      this.selectedEmployee = employee;
    },
  },
});
