import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp({
    apiKey: "AIzaSyDTwUmxMErgzQ_9EdSEt1-ne7u2tAs21qY",
    authDomain: "soho-85bac.firebaseapp.com",
    projectId: "soho-85bac",
    storageBucket: "soho-85bac.appspot.com",
    messagingSenderId: "1022682295488",
    appId: "1:1022682295488:web:fac2ccb483738bc2af1125",
    measurementId: "G-VK3PRKE4C6"
});

export const auth = getAuth(app)
export default app