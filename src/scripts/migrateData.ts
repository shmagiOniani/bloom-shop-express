import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { products } from '../data/products';
import { storeData } from '../pages/StoresPage';

async function migrateData() {
  // Migrate products
  for (const product of products) {
    await addDoc(collection(db, 'products'), product);
  }

  // Migrate stores
  for (const store of storeData) {
    await addDoc(collection(db, 'stores'), store);
  }

  console.log('Migration completed');
}

migrateData().catch(console.error); 