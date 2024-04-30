<!-- Login.vue -->
<template>
    <form @submit.prevent="loginUser">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
  
      <input v-model="email" type="email" class="form-control" placeholder="Email" required>
  
      <input v-model="password" type="password" class="form-control" placeholder="Password" required>
  
      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  const store = useStore();
  const router = useRouter();
  
  const email = ref('');
  const password = ref('');
  
  const loginUser = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({ email: email.value, password: password.value })
      });
  
      if (response.ok) {
        store.commit('SET_AUTH', true);
        router.push('/');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  </script>
  