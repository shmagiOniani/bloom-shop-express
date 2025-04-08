
import type { Database } from '@/integrations/supabase/types';

// Define mock types for tables that don't exist yet in the database
export interface MockTables {
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

// Export merged types
export type Tables = Database['public']['Tables'] & MockTables;

// Export the Supabase enums
export type Enums = Database['public']['Enums'];

// Custom types that extend the merged types
export type StoreWithProducts = MockTables['stores']['Row'] & {
  products: MockTables['products']['Row'][];
};

export type ProfileWithStores = MockTables['profiles']['Row'] & {
  stores: MockTables['stores']['Row'][];
};

