import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { Store } from '../pages/StoresPage';

export const storeService = {
  async getStores(): Promise<Store[]> {
    const querySnapshot = await getDocs(collection(db, 'stores'));
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: parseInt(doc.id),
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        phone: data.phone,
        hours: data.hours,
        specialty: data.specialty
      } as Store;
    });
  },

  async addStore(store: Omit<Store, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'stores'), store);
    return docRef.id;
  },

  async updateStore(id: string, store: Partial<Store>): Promise<void> {
    await updateDoc(doc(db, 'stores', id), store);
  },

  async deleteStore(id: string): Promise<void> {
    await deleteDoc(doc(db, 'stores', id));
  }
}; 