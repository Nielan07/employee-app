<template>
  <q-page class="q-pa-md">
    <q-btn label="Add Product Category" color="primary" @click="openForm()" />
    <ProductCategoryTable
      :productCategories="productCategories"
      @edit="openForm"
      @delete="deleteProductCategory"
    />

    <q-dialog v-model="formDialog">
      <q-card>
        <q-card-section>
          <ProductCategoryForm
            :productCategories="selectedProductCategory"
            @submit="saveProductCategory"
            @cancel="closeForm"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProductCategoryStore } from 'src/stores/productCategoryStore';
import ProductCategoryTable from 'src/components/ProductCategoryTable.vue';
import ProductCategoryForm from 'src/components/ProductCategoryForm.vue';
import type { ProductCategory } from 'src/types/ProductCategory';

const { productCategories } = useProductCategoryStore();
const store = useProductCategoryStore();
const formDialog = ref(false);
const selectedProductCategory = ref<ProductCategory | null>(null);

onMounted(() => {
  void store.fetchProductCategories();
});

const openForm = (user = null) => {
  selectedProductCategory.value = user;
  formDialog.value = true;
};

const closeForm = () => {
  formDialog.value = false;
  selectedProductCategory.value = null;
};

const saveProductCategory = async (productCategory: { id: number; name: string }) => {
  if (productCategory.id) await store.updateProductCategory(productCategory.id, productCategory);
  else await store.addProductCategory(productCategory);
  closeForm();
};

const deleteProductCategory = async (id: number) => {
  await store.removeProductCategory(id);
};
</script>
