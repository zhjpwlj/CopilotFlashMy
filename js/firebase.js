/* Firebase v10 ESM 加载，替换下方配置 */
import { initializeApp }
  from 'https://cdn.jsdelivr.net/npm/firebase@10.12.2/app/+esm';
import { getFirestore }
  from 'https://cdn.jsdelivr.net/npm/firebase@10.12.2/firestore/+esm';
import { getAuth }
  from 'https://cdn.jsdelivr.net/npm/firebase@10.12.2/auth/+esm';

const firebaseConfig = {
    apiKey: "AIzaSyD_P2KVlV21bQktf0SC3Wk7JWzZLw6MsLk",
    authDomain: "copilot-flashmy.firebaseapp.com",
    projectId: "copilot-flashmy",
    storageBucket: "copilot-flashmy.firebasestorage.app",
    messagingSenderId: "234203302308",
    appId: "1:234203302308:web:8f2ef34b507b84f2f09931",
    measurementId: "G-0XQRJJ5GF2"
  };

export const app  = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);
