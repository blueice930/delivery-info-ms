import { initializeApp } from 'firebase/app';
import { getFunctions, connectFunctionsEmulator, httpsCallable } from 'firebase/functions';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAxEJgFDcvwLsVbmg5FegFToqgWxlzaKbQ',
  authDomain: 'delivery-info-ms.firebaseapp.com',
  databaseURL: 'https://delivery-info-ms-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'delivery-info-ms',
  storageBucket: 'delivery-info-ms.appspot.com',
  messagingSenderId: '362409402214',
  appId: '1:362409402214:web:2c61beb3d811f231efb2a7',
};

const app = initializeApp(firebaseConfig);

const functions = getFunctions(app, 'asia-east2');
const auth = getAuth(app);
const db = getDatabase(app);

// local test purpose
if (window.location.hostname === 'localhost') {
  // connectFunctionsEmulator(functions, 'localhost', 5001);
  connectDatabaseEmulator(db, 'localhost', 9000);
  connectAuthEmulator(auth, 'http://localhost:9099');
}

const registerUser = httpsCallable(functions, 'data-getDataByUids');

export {
  registerUser,
  db,
  auth,
};

export default app;
