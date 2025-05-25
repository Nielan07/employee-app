<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <slot name="header">
        <div class="text-h6">{{ employee.name }}</div>
      </slot>
    </q-card-section>
    <q-card-actions>
      <q-btn color="primary" @click="$emit('select', employee)">Select</q-btn>
      <q-btn color="negative" @click="$emit('delete', employee.id)">Delete</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
defineProps<{ employee: { id: number; name: string } }>();
</script>
