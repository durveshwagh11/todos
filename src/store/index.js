// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      authenticated: false,
      user: null
    };
  },
  mutations: {
    SET_AUTH(state, auth) {
      state.authenticated = auth;
    },
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(credentials)
        });
        if (response.ok) {
          const user = await response.json();
          commit('SET_AUTH', true);
          commit('SET_USER', user);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Login failed:', error);
        return false;
      }
    },
    async register(_, userData) {
      try {
        const response = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        if (response.ok) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Registration failed:', error);
        return false;
      }
    },
    async logout({ commit }) {
      try {
        await fetch('http://localhost:8000/api/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        commit('SET_AUTH', false);
        commit('SET_USER', null);
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  }
});
