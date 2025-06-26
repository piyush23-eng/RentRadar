import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          phone: string
          university: string
          graduation_year: number
          profile_image: string | null
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          phone: string
          university: string
          graduation_year: number
          profile_image?: string | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          phone?: string
          university?: string
          graduation_year?: number
          profile_image?: string | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          description: string
          address: string
          city: string
          state: string
          pincode: string
          price: number
          bedrooms: number
          bathrooms: number
          square_feet: number
          property_type: string
          images: string[]
          amenities: string[]
          available: boolean
          available_date: string
          utilities: string[]
          pet_policy: string
          parking: boolean
          furnished: boolean
          student_friendly: boolean
          verified: boolean
          rating: number
          review_count: number
          university: string
          walking_time: number
          driving_time: number
          latitude: number
          longitude: number
          landlord_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          address: string
          city: string
          state: string
          pincode: string
          price: number
          bedrooms: number
          bathrooms: number
          square_feet: number
          property_type: string
          images: string[]
          amenities: string[]
          available?: boolean
          available_date: string
          utilities: string[]
          pet_policy: string
          parking: boolean
          furnished: boolean
          student_friendly: boolean
          verified?: boolean
          rating?: number
          review_count?: number
          university: string
          walking_time: number
          driving_time: number
          latitude: number
          longitude: number
          landlord_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          address?: string
          city?: string
          state?: string
          pincode?: string
          price?: number
          bedrooms?: number
          bathrooms?: number
          square_feet?: number
          property_type?: string
          images?: string[]
          amenities?: string[]
          available?: boolean
          available_date?: string
          utilities?: string[]
          pet_policy?: string
          parking?: boolean
          furnished?: boolean
          student_friendly?: boolean
          verified?: boolean
          rating?: number
          review_count?: number
          university?: string
          walking_time?: number
          driving_time?: number
          latitude?: number
          longitude?: number
          landlord_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          property_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          property_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: string
          created_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          property_id: string
          user_id: string
          landlord_id: string
          message: string
          phone: string
          email: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          user_id: string
          landlord_id: string
          message: string
          phone: string
          email: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          user_id?: string
          landlord_id?: string
          message?: string
          phone?: string
          email?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}