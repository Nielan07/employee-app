<template>
  <q-table :rows="productCategories" :columns="columns" row-key="id" flat bordered>
    <template v-slot:body-cell-actions="props">
      <q-td>
        <q-btn flat icon="edit" @click="$emit('edit', props.row)" />
        <q-btn flat icon="delete" color="negative" @click="$emit('delete', props.row.id)" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
defineProps<{ productCategories: unknown[] }>();
defineEmits(['edit', 'delete']);

const columns = [
  { name: 'name', label: 'Name', field: 'name' },
  { name: 'actions', label: 'Actions', field: 'actions' },
];
</script>
