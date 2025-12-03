
// Database types per Supabase
// Generati automaticamente dallo schema SQL

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: 'pilot' | 'coach';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      morning_checks: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          sleep_quality: number;
          muscle_soreness: number;
          mood: number;
          energy: number;
          motivation: number;
          hrv: number | null;
          resting_heart_rate: number | null;
          weight: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['morning_checks']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['morning_checks']['Insert']>;
      };
      routines: {
        Row: {
          id: string;
          user_id: string;
          type: 'pre_workout' | 'post_workout';
          title: string;
          items: RoutineItem[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['routines']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['routines']['Insert']>;
      };
      routine_completions: {
        Row: {
          id: string;
          routine_id: string;
          user_id: string;
          date: string;
          completed_items: string[];
          duration_seconds: number;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['routine_completions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['routine_completions']['Insert']>;
      };
      nutrition_plans: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          target_calories: number;
          target_protein: number;
          target_carbs: number;
          target_fats: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['nutrition_plans']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['nutrition_plans']['Insert']>;
      };
      daily_nutrition: {
        Row: {
          id: string;
          user_id: string;
          plan_id: string | null;
          date: string;
          calories: number;
          protein: number;
          carbs: number;
          fats: number;
          meals: Meal[];
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['daily_nutrition']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['daily_nutrition']['Insert']>;
      };
      bike_setups: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          track: string;
          date: string;
          settings: BikeSettings;
          lap_time: number | null;
          notes: string | null;
          photo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bike_setups']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['bike_setups']['Insert']>;
      };
      reaction_tests: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          reaction_times: number[];
          average_time: number;
          best_time: number;
          worst_time: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reaction_tests']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['reaction_tests']['Insert']>;
      };
      workouts: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          type: 'training' | 'race' | 'test';
          title: string;
          duration_minutes: number;
          intensity: number;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['workouts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['workouts']['Insert']>;
      };
    };
  };
}

// Tipi helper per le strutture JSON
export interface RoutineItem {
  id: string;
  title: string;
  description?: string;
  duration_seconds?: number;
  order: number;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface BikeSettings {
  suspension: {
    front_compression: number;
    front_rebound: number;
    rear_compression: number;
    rear_rebound: number;
    front_preload: number;
    rear_preload: number;
  };
  geometry: {
    ride_height_front: number;
    ride_height_rear: number;
  };
  tires: {
    front_pressure: number;
    rear_pressure: number;
    front_compound: string;
    rear_compound: string;
  };
  gearing: {
    front_sprocket: number;
    rear_sprocket: number;
  };
}
