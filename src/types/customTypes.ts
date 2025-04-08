
import type { Database } from '@/integrations/supabase/types';

// Define mock types for tables that don't exist yet in the database
interface MockTables {
  stores: {
    Row: {
      id: number;
      name: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      phone: string;
      hours: string;
      specialty: string;
      created_at?: string;
      updated_at?: string;
    };
    Insert: Omit<MockTables['stores']['Row'], 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<MockTables['stores']['Insert']>;
  };
  products: {
    Row: {
      id: number;
      name: string;
      description: string;
      price: number;
      image_url: string;
      category: string;
      store_id: number;
      created_at?: string;
      updated_at?: string;
    };
    Insert: Omit<MockTables['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<MockTables['products']['Insert']>;
  };
  profiles: {
    Row: {
      id: string;
      username: string;
      full_name?: string;
      avatar_url?: string;
      created_at?: string;
      updated_at?: string;
    };
    Insert: Omit<MockTables['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<MockTables['profiles']['Insert']>;
  };
}

// Merge the mock tables with any existing tables in the database
type MergedTables = Database['public']['Tables'] & MockTables;

// Export the merged tables type
export type Tables = MergedTables;
export type Enums = Database['public']['Enums'];

// Custom types that extend the merged types
export type StoreWithProducts = Tables['stores']['Row'] & {
  products: Tables['products']['Row'][];
};

export type ProfileWithStores = Tables['profiles']['Row'] & {
  stores: Tables['stores']['Row'][];
};

// Any other custom types can be added here
