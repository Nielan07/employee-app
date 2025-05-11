import axios from 'axios';
import type { Employee } from 'src/types/Employee';

const API_URL = 'http://127.0.0.1:8000/api/accounting-billing/employees/';

export const getEmployees = () =>
  axios.get<{ data: Employee[] }>(API_URL).then((res) => res.data.data);

export const createEmployee = (employee: Partial<Employee>) =>
  axios.post<Employee>(API_URL, employee).then((res) => res.data);

export const updateEmployee = (id: number, employee: Partial<Employee>) =>
  axios.put<Employee>(`${API_URL}${id}`, employee).then((res) => res.data);

export const deleteEmployee = (id: number) => axios.delete(`${API_URL}${id}`);
