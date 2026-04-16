import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDC_710ATJott9P0sZH65IPTyZ7R-l6VBY",
  authDomain: "datn-dc5f7.firebaseapp.com",
  projectId: "datn-dc5f7",
  storageBucket: "datn-dc5f7.firebasestorage.app",
  messagingSenderId: "96571097193",
  appId: "1:96571097193:web:593cd3c2ee8e0269f5e2f8",
  measurementId: "G-V0B7BZFD92"
};
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
