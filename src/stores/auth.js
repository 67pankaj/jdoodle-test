import { firebaseAuth } from 'boot/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { defineStore } from 'pinia';
import { Loading, Notify } from 'quasar';
import { useUserStore } from 'stores/user';
import { computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // Non returned properties - global and other stores
  const userStore = useUserStore();

  // Getters (computed)
  const signedIn = computed(() => {
    return !!userStore.userDetails;
  });

  // Actions (functions)
  /**
   * Sign-up user with provided info
   *
   * @async
   * @function signup
   *
   * @param payload - Payload for the signup
   * @param payload.name - Name to use for signup
   * @param payload.email - Email to use for signup
   * @param payload.password - Password to use for signup
   */
  async function signup({ name, email, password } = {}) {
    Loading.show();

    // Variable to store action result
    let result = false;

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then(async (userCredential) => {
          // Sign-up successful
          // Update result
          result = true;

          // Update user profile to set the display name
          await updateProfile(userCredential.user, {
            displayName: name
          }).catch((error) => {
            // Error updating profile
            console.error(error);
          });
        })
        .catch((error) => {
          const { code } = error;
          console.log({ code });
          if (code === 'auth/email-already-in-use') {
            Notify.create({
              type: 'negative',
              message: 'Signup failed',
              caption: 'The email address is already in use!'
            });
          } else if (code === 'auth/weak-password') {
            Notify.create({
              type: 'negative',
              message: 'Weak password',
              caption: 'Password should be 6 characters or more!'
            });
          }
        });
      return result;
    } finally {
      Loading.hide();
    }
  }

  /**
   * Sign-in user with provided info
   *
   * @async
   * @function signin
   *
   * @param payload - Payload for the signin
   * @param payload.email - Email to use for signin
   * @param payload.password - Password to use for signin
   */
  async function signin({ email, password } = {}) {
    Loading.show();

    // Variable to store action result
    let result = false;

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(() => {
          // Sign-in successful
          // Update result
          result = true;
        })
        .catch((error) => {
          const { code } = error;
          if (
            code === 'auth/invalid-email' ||
            code === 'auth/wrong-password' ||
            code === 'auth/invalid-credential'
          ) {
            Notify.create({
              type: 'negative',
              message: 'Signin failed',
              caption: 'Invalid credentials. Please try again!'
            });
          } else if (code === 'auth/user-not-found') {
            Notify.create({
              type: 'negative',
              message: 'User not found',
              caption: 'Account with this email address does not exist!'
            });
          }
          console.log({ code });
        });
      return result;
    } finally {
      Loading.hide();
    }
  }

  /**
   * Sign-out user and redirects to auth page
   *
   * @async
   * @function signout
   */
  async function signout() {
    Loading.show();

    // Variable to store action result
    let result = false;

    try {
      await signOut(firebaseAuth)
        .then(() => {
          // Sign-out successful
          // Update result
          result = true;
        })
        .catch((error) => {
          // Error signing out
          console.error(error);
        });
      return result;
    } finally {
      Loading.hide();
    }
  }

  // return store members
  return { signedIn, signup, signin, signout };
});
