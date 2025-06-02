<template>
  <q-list>
    <q-item v-for="employee in employees" :key="employee.id">
      <q-item-section>
        <q-item-label>{{ employee.name }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn icon="edit" @click="$emit('edit', employee)" color="primary"></q-btn>
        <q-btn icon="delete" @click="$emit('delete', employee.id)" color="negative"></q-btn>
      </q-item-section>
    </q-item>
  </q-list>
  <q-spinner v-if="loading" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEmployeeStore } from 'src/stores/employeeStore';
const strore = useEmployeeStore();
const employees = computed(() => strore.employees);
const loading = computed(() => strore.loading);
</script>
