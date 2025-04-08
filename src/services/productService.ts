import { db, storage } from '../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Product } from '../data/products';

export const productService = {
  // Get all products
  async getProducts(): Promise<Product[]> {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: parseInt(doc.id), // Convert string ID to number to match Product type
        storeId: data.storeId,
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        image: data.image,
        featured: data.featured,
        bestSeller: data.bestSeller,
        colors: data.colors,
        occasion: data.occasion,
        city: data.city
      } as Product;
    });
  },

  // Add new product
  async addProduct(product: Omit<Product, 'id'>, imageFile?: File): Promise<string> {
    let imageUrl = product.image;

    // Upload image if provided
    if (imageFile) {
      const storageRef = ref(storage, `products/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      image: imageUrl
    });
    
    return docRef.id;
  },

  // Update product
  async updateProduct(id: string, product: Partial<Product>, imageFile?: File): Promise<void> {
    let updateData = { ...product };

    if (imageFile) {
      const storageRef = ref(storage, `products/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      updateData.image = await getDownloadURL(storageRef);
    }

    await updateDoc(doc(db, 'products', id), updateData);
  },

  // Delete product
  async deleteProduct(id: string): Promise<void> {
    await deleteDoc(doc(db, 'products', id));
  }
}; 