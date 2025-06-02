import { defineStore } from 'pinia';
import axios from 'axios';
import type { Employee } from 'src/types/Employee';

const API_URL = 'http://127.0.0.1:8000/api/accounting-billing/employees/';
interface MyState {
  employees: Employee[];
  loading: boolean;
}

export const useEmployeeStore = defineStore('employeeStore', {
  state: (): MyState => ({
    employees: [],
    loading: false,
  }),
  actions: {
    async fetchEmployees() {
      this.loading = true;
      try {
        const response = await axios.get(API_URL);
        this.employees = response.data;
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        this.loading = false;
      }
    },
    async addEmployee(employee: Omit<Employee, 'id'>) {
      try {
        const response = await axios.post(API_URL, employee);
        this.employees.push(response.data);
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    },
    async updateEmployee(employee: Employee) {
      try {
        await axios.put(`${API_URL}/${employee.id}`, employee);
        const index = this.employees.findIndex((i) => i.id === employee.id);
        if (index !== -1) {
          this.employees[index] = employee;
        }
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    },
    async deleteEmployee(id: number) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.employees = this.employees.filter((employee) => employee.id !== id);
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    },
  },
});
