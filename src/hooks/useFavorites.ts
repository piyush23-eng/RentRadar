import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export function useFavorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const fetchFavorites = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('favorites')
        .select('property_id')
        .eq('user_id', user.id)

      if (error) throw error

      setFavorites(data.map(fav => fav.property_id))
    } catch (error) {
      console.error('Error fetching favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = async (propertyId: string) => {
    if (!user) return

    try {
      const isFavorited = favorites.includes(propertyId)

      if (isFavorited) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', propertyId)

        if (error) throw error

        setFavorites(prev => prev.filter(id => id !== propertyId))
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            property_id: propertyId,
          })

        if (error) throw error

        setFavorites(prev => [...prev, propertyId])
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const getFavoriteProperties = async () => {
    if (!user) return []

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          property_id,
          properties!inner(
            *,
            landlord:profiles(
              full_name,
              phone,
              profile_image,
              verified
            )
          )
        `)
        .eq('user_id', user.id)

      if (error) throw error

      return data.map(fav => fav.properties).filter(Boolean)
    } catch (error) {
      console.error('Error fetching favorite properties:', error)
      return []
    }
  }

  useEffect(() => {
    if (user) {
      fetchFavorites()
    } else {
      setFavorites([])
    }
  }, [user])

  return {
    favorites,
    loading,
    toggleFavorite,
    getFavoriteProperties,
    isFavorited: (propertyId: string) => favorites.includes(propertyId),
  }
}