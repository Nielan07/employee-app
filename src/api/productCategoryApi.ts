import axios from 'axios';
import type { ProductCategory } from 'src/types/ProductCategory';

const API_URL = 'http://127.0.0.1:8000/api/marketing/product-categories/';

export const getProductCategories = () =>
  axios.get<{ data: ProductCategory[] }>(API_URL).then((res) => res.data.data);

export const createProductCategory = (productCategory: Partial<ProductCategory>) =>
  axios.post<ProductCategory>(API_URL, productCategory).then((res) => res.data);

export const updateProductCategory = (id: number, productCategory: Partial<ProductCategory>) =>
  axios.put<ProductCategory>(`${API_URL}${id}`, productCategory).then((res) => res.data);

export const deleteProductCategory = (id: number) => axios.delete(`${API_URL}${id}`);
