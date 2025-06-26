import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Database } from '../lib/supabase'

type Property = Database['public']['Tables']['properties']['Row'] & {
  landlord: {
    full_name: string
    phone: string
    profile_image: string | null
    verified: boolean
  }
}

export interface SearchFilters {
  city: string
  minPrice: number
  maxPrice: number
  bedrooms: number[]
  propertyType: string[]
  amenities: string[]
  maxDistance: number
  furnished?: boolean
  parking?: boolean
  verified?: boolean
}

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProperties = async (filters?: SearchFilters) => {
    try {
      setLoading(true)
      let query = supabase
        .from('properties')
        .select(`
          *,
          landlord:profiles(
            full_name,
            phone,
            profile_image,
            verified
          )
        `)
        .eq('available', true)

      // Apply filters
      if (filters) {
        if (filters.city) {
          query = query.ilike('city', `%${filters.city}%`)
        }
        if (filters.minPrice > 0) {
          query = query.gte('price', filters.minPrice)
        }
        if (filters.maxPrice < 100000) {
          query = query.lte('price', filters.maxPrice)
        }
        if (filters.bedrooms && filters.bedrooms.length > 0) {
          query = query.in('bedrooms', filters.bedrooms)
        }
        if (filters.propertyType && filters.propertyType.length > 0) {
          query = query.in('property_type', filters.propertyType)
        }
        if (filters.maxDistance < 60) {
          query = query.lte('walking_time', filters.maxDistance)
        }
        if (filters.furnished !== undefined) {
          query = query.eq('furnished', filters.furnished)
        }
        if (filters.parking !== undefined) {
          query = query.eq('parking', filters.parking)
        }
        if (filters.verified !== undefined) {
          query = query.eq('verified', filters.verified)
        }
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error

      setProperties(data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setProperties([])
    } finally {
      setLoading(false)
    }
  }

  const getProperty = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          landlord:profiles(
            full_name,
            phone,
            profile_image,
            verified
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (err) {
      console.error('Error fetching property:', err)
      return null
    }
  }

  const addProperty = async (propertyData: Database['public']['Tables']['properties']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert(propertyData)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  return {
    properties,
    loading,
    error,
    fetchProperties,
    getProperty,
    addProperty,
  }
}