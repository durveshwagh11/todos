<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">Home</router-link>
    
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item" v-if="!auth">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="!auth">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
  
  