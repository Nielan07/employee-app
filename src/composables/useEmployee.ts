import axios from 'axios';
import { ref } from 'vue';
import type { Employee } from 'src/types/Employee';

const API_URL = 'http://127.0.0.1:8000/api/accounting-billing/employees/';

export function useEmployees() {
  const employees = ref<Employee[]>([]);

  const fetchEmployees = async () => {
    const res = await axios.get<Employee[]>(API_URL);
    employees.value = res.data;
  };

  const deleteEmployee = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    employees.value = employees.value.filter((u) => u.id !== id);
  };

  const createEmployee = async (data: Omit<Employee, 'id'>) => {
    const res = await axios.post<Employee>(API_URL, data);
    employees.value.push(res.data);
  };

  const updateEmployee = async (employee: Employee) => {
    const res = await axios.put<Employee>(`${API_URL}/${employee.id}`, employee);
    const index = employees.value.findIndex((u) => u.id === employee.id);
    if (index !== -1) employees.value[index] = res.data;
  };

  return { employees, fetchEmployees, deleteEmployee, createEmployee, updateEmployee };
}
