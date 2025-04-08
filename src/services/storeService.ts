
import { supabase } from "@/integrations/supabase/client";
import type { StoreWithProducts } from "@/types/customTypes";
import { Store as MockStore } from "@/pages/StoresPage";

// Function to get mock store data
const getMockStoreData = async (): Promise<MockStore[]> => {
  return await import("@/pages/StoresPage").then(module => module.storeData);
};

// Temporary function that returns mock data until the database is set up
export const getStores = async (): Promise<MockStore[]> => {
  try {
    console.log("Fetching stores using mock data");
    // Return mock data
    return await getMockStoreData();
  } catch (error) {
    console.error("Error in getStores function:", error);
    // Fall back to mock data
    return await getMockStoreData();
  }
};

// Temporary function that returns mock data until the database is set up
export const getStoreWithProducts = async (storeId: number): Promise<StoreWithProducts | null> => {
  try {
    console.log(`Fetching store with ID ${storeId} using mock data`);
    // Fall back to mock data
    const mockStores = await getMockStoreData();
    const mockStore = mockStores.find((store: MockStore) => store.id === storeId);
    
    if (!mockStore) return null;
    
    // Create a mock StoreWithProducts object
    return {
      ...mockStore,
      products: [] // No mock products for now
    } as unknown as StoreWithProducts;
    
  } catch (error) {
    console.error("Error in getStoreWithProducts function:", error);
    // Fall back to mock data
    const mockStores = await getMockStoreData();
    const mockStore = mockStores.find((store: MockStore) => store.id === storeId);
    
    if (!mockStore) return null;
    
    // Create a mock StoreWithProducts object
    return {
      ...mockStore,
      products: [] // No mock products for now
    } as unknown as StoreWithProducts;
  }
};
