import { writable } from 'svelte/store';
import type { User } from '../types/User';

const createUserStore = () => {
  const { subscribe, set, update } = writable<User | null>(null);

  return {
    subscribe,
    set, // Make sure to return the set method if you need it
    update, // This is the update method you're looking for
    login: (userData: User) => set(userData),
    logout: () => set(null),
    // Add more user-related methods here
  };
};

export const userStore = createUserStore();
