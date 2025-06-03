<template>
  <q-form @submit.prevent="handleSubmit">
    <q-input filled v-model="form.name" label="Name" />
    <div class="q-mt-md">
      <q-btn label="Save" type="submit" color="primary" />
      <q-btn label="Cancel" flat @click="$emit('cancel')" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['submit', 'cancel']);
const { productCategory } = defineProps<{ productCategory?: { name: ''; id: null } }>();

const form = ref({ name: '', id: null });

watch(
  () => productCategory,
  (val) => {
    if (val) form.value = { ...val };
  },
  { immediate: true },
);

const handleSubmit = () => {
  emit('submit', { ...form.value });
};
</script>
