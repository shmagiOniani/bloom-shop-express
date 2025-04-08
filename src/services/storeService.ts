
import { supabase } from "@/integrations/supabase/client";
import type { Tables, StoreWithProducts } from "@/types/customTypes";
import { Store as MockStore } from "@/pages/StoresPage";

// Temporary function that returns mock data until the database is set up
export const getStores = async (): Promise<Tables['stores']['Row'][]> => {
  try {
    // Try to fetch from Supabase first
    const { data, error } = await supabase
      .from('stores')
      .select('*');
    
    if (error) {
      console.error("Error fetching stores from Supabase:", error);
      // Fall back to mock data
      const mockData = await import("@/pages/StoresPage").then(module => module.storeData);
      return mockData as unknown as Tables['stores']['Row'][];
    }
    
    return data || [];
  } catch (error) {
    console.error("Error in getStores function:", error);
    // Fall back to mock data
    const mockData = await import("@/pages/StoresPage").then(module => module.storeData);
    return mockData as unknown as Tables['stores']['Row'][];
  }
};

// Temporary function that returns mock data until the database is set up
export const getStoreWithProducts = async (storeId: number): Promise<StoreWithProducts | null> => {
  try {
    // Try to fetch from Supabase first
    const { data, error } = await supabase
      .from('stores')
      .select(`
        *,
        products(*)
      `)
      .eq('id', storeId)
      .single();
    
    if (error) {
      console.error("Error fetching store with products from Supabase:", error);
      // Fall back to mock data
      const mockStores = await import("@/pages/StoresPage").then(module => module.storeData);
      const mockStore = mockStores.find((store: MockStore) => store.id === storeId);
      
      if (!mockStore) return null;
      
      // Create a mock StoreWithProducts object
      return {
        ...mockStore,
        products: [] // No mock products for now
      } as unknown as StoreWithProducts;
    }
    
    return data;
  } catch (error) {
    console.error("Error in getStoreWithProducts function:", error);
    // Fall back to mock data
    const mockStores = await import("@/pages/StoresPage").then(module => module.storeData);
    const mockStore = mockStores.find((store: MockStore) => store.id === storeId);
    
    if (!mockStore) return null;
    
    // Create a mock StoreWithProducts object
    return {
      ...mockStore,
      products: [] // No mock products for now
    } as unknown as StoreWithProducts;
  }
};
