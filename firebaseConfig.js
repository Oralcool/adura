// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration for Adura app
const firebaseConfig = {
  apiKey: "AIzaSyBnEdntrXHDbHP94ckw-pvIy0zsYaNxK98",
  authDomain: "prayo-11d5a.firebaseapp.com",
  projectId: "prayo-11d5a",
  storageBucket: "prayo-11d5a.firebasestorage.app",
  messagingSenderId: "835494912018",
  appId: "1:835494912018:web:d542a158a20c0149b7f8cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
