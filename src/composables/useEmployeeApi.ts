import axios from 'axios';
import type { Employee } from 'src/types/Employee';

const API_URL = 'http://127.0.0.1:8000/api/accounting-billing/employees/';

export function useEmployeeApi() {
  const getEmployees = async (): Promise<Employee[]> => {
    const { data } = await axios.get<Employee[]>(`${API_URL}?_limit=5`);
    return data;
  };

  const createEmployee = async (employee: Partial<Employee>): Promise<Employee> => {
    const { data } = await axios.post<Employee>(API_URL, employee);
    return data;
  };

  const updateEmployee = async (employee: Employee): Promise<Employee> => {
    const { data } = await axios.put<Employee>(`${API_URL}/${employee.id}`, employee);
    return data;
  };

  const deleteEmployee = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  };

  return { getEmployees, createEmployee, updateEmployee, deleteEmployee };
}
