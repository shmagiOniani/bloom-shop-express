import type { Database } from '@/integrations/supabase/types';

// Existing generated types
export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];

// Custom types that extend the generated types
export type StoreWithProducts = Tables['stores']['Row'] & {
  products: Tables['products']['Row'][];
};

export type ProfileWithStores = Tables['profiles']['Row'] & {
  stores: Tables['stores']['Row'][];
};

// Any other custom types can be added here
