import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    role: null,
    isAuthenticated: false,
  }),
  actions: {
    setRole(role) {
      this.role = role;
    },
    authenticate() {
      this.isAuthenticated = true;
    },
  },
});
