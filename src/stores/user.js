import { firebaseAuth } from 'boot/firebase';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  // State (refs)
  const userDetails = ref(firebaseAuth.currentUser);

  // return store members
  return { userDetails };
});
