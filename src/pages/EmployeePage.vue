<template>
  <q-page class="q-pa-md">
    <q-list separator bordered>
      <q-item v-for="p in post" :key="p.id" clickable v-ripple>
        <q-item-section side middle>
          <q-btn flat round dense color="primary" icon="edit" size="12px" />
        </q-item-section>
        <q-item-section>
          <div class="column">
            <q-item-label caption>{{ p.id }}</q-item-label>
            <q-item-label>{{ p.name }}</q-item-label>
          </div>
        </q-item-section>
        <q-item-section side middle>
          <q-btn @click="promptDelete" flat round dense color="red" icon="delete" size="12px" />
        </q-item-section>
      </q-item>
    </q-list>
    <div class="abolute-bottom text-center q-mb-lg">
      <q-btn @click="addEmployee" round color="primary" icon="add" size="16px" />
    </div>
  </q-page>
</template>

//script setup //composable // slots
<script setup lang="ts">
//
interface Post {
  //[key: string]: string | number | undefined; //key signature
  id: number;
  name: string;
}
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

const post = ref<Post[]>([]);
const $q = useQuasar();

const getPosts = async () => {
  await fetch('http://127.0.0.1:8000/api/accounting-billing/employees/')
    .then((response) => response.json())
    .then((data) => (post.value = data.data));
  console.log(post.value);
};

onMounted(async () => {
  await getPosts();
});

function promptDelete() {
  $q.dialog({
    title: 'Delete',
    message: 'Delete Employee record?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    const getDelete = async () => {
      await fetch('http://127.0.0.1:8000/api/accounting-billing/employees/1?_method=delete').then(
        (response) => response.json(),
      );
    };
    onMounted(async () => {
      await getDelete();
    });
  });
  // .onCancel(() => {
  //   alert('Cancel');
  // })
  // .onDismiss(() => {
  //   // console.log('I am triggered on both OK and Cancel')
  // });
}

function addEmployee() {
  alert('Add Employee');
}
</script>
