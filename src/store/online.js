import { defineStore } from "pinia";

export const useOnlineStore = defineStore("online", {
  state: () => ({ users: [] }),
  getters: {
    getUsers: (state) => state.users,
  },
  actions: {
    addUser(user) {
      this.users.push(user);
    },
  },
});
