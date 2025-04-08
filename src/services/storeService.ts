
import { supabase } from "@/integrations/supabase/client";
import type { Tables, StoreWithProducts } from "@/types/customTypes";

export const getStores = async (): Promise<Tables['stores']['Row'][]> => {
  const { data, error } = await supabase
    .from('stores')
    .select('*');
  
  if (error) throw error;
  return data || [];
};

export const getStoreWithProducts = async (storeId: number): Promise<StoreWithProducts | null> => {
  const { data, error } = await supabase
    .from('stores')
    .select(`
      *,
      products(*)
    `)
    .eq('id', storeId)
    .single();
  
  if (error) throw error;
  return data;
};

// Add other store-related service functions here
