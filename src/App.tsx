import React, { useState, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import SearchSection from './components/SearchSection'
import FeaturedProperties from './components/FeaturedProperties'
import PropertyModal from './components/PropertyModal'
import Footer from './components/Footer'
import PropertyCard from './components/PropertyCard'
import AuthForm from './components/AuthForm'
import PropertyForm from './components/PropertyForm'
import { useAuth } from './hooks/useAuth'
import { useProperties, SearchFilters } from './hooks/useProperties'
import { useFavorites } from './hooks/useFavorites'

function App() {
  const { user, profile, loading: authLoading } = useAuth()
  const { properties, loading: propertiesLoading, fetchProperties } = useProperties()
  const { favorites, toggleFavorite, getFavoriteProperties } = useFavorites()
  
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'favorites' | 'auth' | 'add-property'>('home')
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    city: '',
    minPrice: 0,
    maxPrice: 100000,
    bedrooms: [],
    propertyType: [],
    amenities: [],
    maxDistance: 60,
  })

  // Filter properties based on search criteria
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // City filter
      if (searchFilters.city && !property.city.toLowerCase().includes(searchFilters.city.toLowerCase())) {
        return false
      }

      // Price filter
      if (property.price < searchFilters.minPrice || property.price > searchFilters.maxPrice) {
        return false
      }

      // Bedrooms filter
      if (searchFilters.bedrooms && searchFilters.bedrooms.length > 0) {
        if (!searchFilters.bedrooms.includes(property.bedrooms)) {
          return false
        }
      }

      // Property type filter
      if (searchFilters.propertyType && searchFilters.propertyType.length > 0) {
        if (!searchFilters.propertyType.includes(property.property_type)) {
          return false
        }
      }

      // Amenities filter
      if (searchFilters.amenities && searchFilters.amenities.length > 0) {
        const hasAllAmenities = searchFilters.amenities.every(amenity =>
          property.amenities.includes(amenity)
        )
        if (!hasAllAmenities) {
          return false
        }
      }

      // Distance filter
      if (property.walking_time > searchFilters.maxDistance) {
        return false
      }

      // Additional filters
      if (searchFilters.furnished !== undefined && property.furnished !== searchFilters.furnished) {
        return false
      }

      if (searchFilters.parking !== undefined && property.parking !== searchFilters.parking) {
        return false
      }

      if (searchFilters.verified !== undefined && property.verified !== searchFilters.verified) {
        return false
      }

      return true
    })
  }, [properties, searchFilters])

  const handleSearch = (searchTerm: string, city: string) => {
    setSearchFilters(prev => ({ ...prev, city }))
    setCurrentView('search')
  }

  const handleAdvancedSearch = (filters: SearchFilters) => {
    setSearchFilters(filters)
    fetchProperties(filters)
    setCurrentView('search')
  }

  const handlePropertyClick = (property: any) => {
    setSelectedProperty(property)
  }

  const handleViewAllProperties = () => {
    setCurrentView('search')
  }

  const handleFavoritesClick = () => {
    if (!user) {
      setCurrentView('auth')
      return
    }
    setCurrentView('favorites')
  }

  const handleSearchClick = () => {
    setCurrentView('search')
  }

  const handleAuthSuccess = () => {
    setCurrentView('home')
  }

  const handleAddPropertySuccess = () => {
    setCurrentView('home')
    fetchProperties() // Refresh properties
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onSearchClick={handleSearchClick}
        onFavoritesClick={handleFavoritesClick}
        onAddPropertyClick={() => setCurrentView('add-property')}
        onAuthClick={() => setCurrentView('auth')}
        user={user}
        profile={profile}
      />

      {currentView === 'home' && (
        <>
          <HeroSection onSearch={handleSearch} />
          <FeaturedProperties
            properties={properties.slice(0, 6)}
            favorites={favorites}
            onFavorite={toggleFavorite}
            onPropertyClick={handlePropertyClick}
            onViewAll={handleViewAllProperties}
            loading={propertiesLoading}
          />
        </>
      )}

      {currentView === 'search' && (
        <>
          <SearchSection 
            onSearch={handleAdvancedSearch}
            currentFilters={searchFilters}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {searchFilters.city ? `Properties in ${searchFilters.city}` : 'All Properties'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
                </p>
              </div>
              <button 
                onClick={() => setCurrentView('home')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                ← Back to Home
              </button>
            </div>
            
            {propertiesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-96"></div>
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 3h10M9 5h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search filters to see more results.</p>
                <button 
                  onClick={() => setSearchFilters({
                    city: '',
                    minPrice: 0,
                    maxPrice: 100000,
                    bedrooms: [],
                    propertyType: [],
                    amenities: [],
                    maxDistance: 60,
                  })}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProperties.map((property, index) => (
                  <div key={property.id} style={{ animationDelay: `${index * 50}ms` }}>
                    <PropertyCard
                      property={property}
                      onFavorite={toggleFavorite}
                      isFavorited={favorites.includes(property.id)}
                      onClick={handlePropertyClick}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {currentView === 'favorites' && user && (
        <FavoritesView
          onBack={() => setCurrentView('home')}
          onPropertyClick={handlePropertyClick}
          toggleFavorite={toggleFavorite}
          getFavoriteProperties={getFavoriteProperties}
        />
      )}

      {currentView === 'auth' && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <AuthForm
            mode={authMode}
            onToggleMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            onSuccess={handleAuthSuccess}
          />
        </div>
      )}

      {currentView === 'add-property' && user && (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <PropertyForm
            onSuccess={handleAddPropertySuccess}
            onCancel={() => setCurrentView('home')}
          />
        </div>
      )}

      <Footer />

      <PropertyModal
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onFavorite={toggleFavorite}
        isFavorited={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        user={user}
      />
    </div>
  )
}

// Favorites View Component
function FavoritesView({ onBack, onPropertyClick, toggleFavorite, getFavoriteProperties }: any) {
  const [favoriteProperties, setFavoriteProperties] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const loadFavorites = async () => {
      const favorites = await getFavoriteProperties()
      setFavoriteProperties(favorites)
      setLoading(false)
    }
    loadFavorites()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Favorites</h1>
          <p className="text-gray-600 mt-1">
            {favoriteProperties.length} saved {favoriteProperties.length === 1 ? 'property' : 'properties'}
          </p>
        </div>
        <button 
          onClick={onBack}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Home
        </button>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-96"></div>
          ))}
        </div>
      ) : favoriteProperties.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-600 mb-4">Start exploring properties and save your favorites to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {favoriteProperties.map((property: any, index: number) => (
            <div key={property.id} style={{ animationDelay: `${index * 50}ms` }}>
              <PropertyCard
                property={property}
                onFavorite={toggleFavorite}
                isFavorited={true}
                onClick={onPropertyClick}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App