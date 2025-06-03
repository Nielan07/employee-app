// src/stores/productCategoryStore.ts
import { defineStore } from 'pinia';
import {
  getProductCategories,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
} from 'src/api/productCategoryApi'; // update path if needed
import type { ProductCategory } from 'src/types/ProductCategory';

export const useProductCategoryStore = defineStore('productCategory', {
  state: () => ({
    productCategories: [] as ProductCategory[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchProductCategories() {
      this.loading = true;
      this.error = null;
      try {
        this.productCategories = await getProductCategories();
      } catch (err) {
        this.error = 'Failed to fetch categories';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async addProductCategory(newCategory: Partial<ProductCategory>) {
      try {
        const created = await createProductCategory(newCategory);
        this.productCategories.push(created);
      } catch (err) {
        this.error = 'Failed to create category';
        console.error(err);
      }
    },

    async updateProductCategory(id: number, updatedCategory: Partial<ProductCategory>) {
      try {
        const updated = await updateProductCategory(id, updatedCategory);
        const index = this.productCategories.findIndex((prodCat) => prodCat.id === id);
        if (index !== -1) {
          this.productCategories[index] = updated;
        }
      } catch (err) {
        this.error = 'Failed to update category';
        console.error(err);
      }
    },

    async removeProductCategory(id: number) {
      try {
        await deleteProductCategory(id);
        this.productCategories = this.productCategories.filter((prodCat) => prodCat.id !== id);
      } catch (err) {
        this.error = 'Failed to delete category';
        console.error(err);
      }
    },
  },
});
