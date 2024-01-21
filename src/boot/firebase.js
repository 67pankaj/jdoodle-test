// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { Loading } from 'quasar';
import { boot } from 'quasar/wrappers';
import { useUserStore } from 'stores/user';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDxoLfQQGEW8SxMFJg5jM5oLuHnIg7xSgU',
  authDomain: 'jdoodle-test-dev.firebaseapp.com',
  projectId: 'jdoodle-test-dev',
  storageBucket: 'jdoodle-test-dev.appspot.com',
  messagingSenderId: '727030888826',
  appId: '1:727030888826:web:0f572b67bdead8f4823ec3'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseFunctions = getFunctions(firebaseApp);
const db = getFirestore(firebaseApp);

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  Loading.show();
  const userStore = useUserStore();
  await new Promise((resolve) => {
    onIdTokenChanged(firebaseAuth, (user) => {
      // Update user store based on user's signed in state
      userStore.$patch({
        userDetails: user
      });
      resolve();
    });
  });
  Loading.hide();
});

export { db, firebaseApp, firebaseAuth, firebaseFunctions };
