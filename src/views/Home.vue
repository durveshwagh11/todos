<template>
  <div>
    <h1 v-if="auth">Welcome, {{ user.name }}</h1>
    <h1 v-else>Please login or register</h1>
    <div v-if="auth">
      <section class="create-todo">
        <h3>CREATE A TODO</h3>
        <form id="new-todo-form" @submit.prevent="addTodo">
          <h4>What's on your todo list?</h4>
          <input type="text" name="content" id="content" placeholder="e.g. make a video" v-model="input_content" />
          <h4>Pick a category</h4>
          <div class="options">
            <label>
              <input type="radio" name="category" id="category1" value="business" v-model="input_category" />
              <span class="bubble business"></span>
              <div>Business</div>
            </label>
            <label>
              <input type="radio" name="category" id="category2" value="personal" v-model="input_category" />
              <span class="bubble personal"></span>
              <div>Personal</div>
            </label>
          </div>
          <input type="submit" value="Add todo" />
        </form>
      </section>
      <section class="todo-list">
        <h3>TODO LIST</h3>
        <div class="list" id="todo-list">
          <div v-for="todo in todos_asc" :key="todo.id" :class="`todo-item ${todo.done && 'done'}`">
            <label>
              <input type="checkbox" v-model="todo.done" />
              <span :class="`bubble ${todo.category == 'business' ? 'business' : 'personal'}`"></span>
            </label>
            <div class="todo-content">
              <input type="text" v-model="todo.content" />
            </div>
            <div class="actions">
              <button class="delete" @click="removeTodo(todo)">Delete</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const auth = computed(() => store.state.authenticated);
const user = computed(() => store.state.user);

const todos = ref([]);
const input_content = ref('');
const input_category = ref(null);

const inputName = ref('');
const inputEmail = ref('');
const inputPassword = ref('');

const todos_asc = computed(() => todos.value.sort((a, b) => a.createdAt - b.createdAt));

const addTodo = () => {
  if (input_content.value.trim() === '' || input_category.value === null) {
    return;
  }
  todos.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    editable: false,
    createdAt: new Date().getTime()
  });
};

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};

watch(auth, (newVal) => {
  if (newVal) {
    fetchTodos();
  } else {
    todos.value = [];
  }
});

const fetchTodos = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/todos', {
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    });
    const content = await response.json();
    todos.value = content;
  } catch (error) {
    console.error('Error fetching todo data:', error);
  }
};

onMounted(() => {
  if (auth.value) {
    fetchTodos();
  }
});
</script>
