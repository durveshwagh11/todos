<!-- Register.vue -->
<template>
    <form @submit.prevent="registerUser">
      <h1 class="h3 mb-3 fw-normal">Please register</h1>
  
      <input v-model="name" class="form-control" placeholder="Name" required>
  
      <input v-model="email" type="email" class="form-control" placeholder="Email" required>
  
      <input v-model="password" type="password" class="form-control" placeholder="Password" required>
  
      <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  const store = useStore();
  const router = useRouter();
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  
  const registerUser = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name: name.value, email: email.value, password: password.value })
      });
  
      if (response.ok) {
        store.commit('SET_AUTH', true);
        router.push('/');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  </script>
  