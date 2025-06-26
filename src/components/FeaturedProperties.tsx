import React from 'react'
import { ArrowRight, TrendingUp } from 'lucide-react'
import PropertyCard from './PropertyCard'

interface FeaturedPropertiesProps {
  properties: any[]
  favorites: string[]
  onFavorite: (propertyId: string) => void
  onPropertyClick: (property: any) => void
  onViewAll: () => void
  loading: boolean
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  favorites,
  onFavorite,
  onPropertyClick,
  onViewAll,
  loading
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
                Popular Now
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover our most popular student-friendly rentals across India, 
              carefully selected for their quality, location, and verified landlords.
            </p>
          </div>
          <button
            onClick={onViewAll}
            className="mt-6 md:mt-0 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group"
          >
            <span>View All Properties</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-96"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {properties.map((property, index) => (
              <div key={property.id} style={{ animationDelay: `${index * 100}ms` }}>
                <PropertyCard
                  property={property}
                  onFavorite={onFavorite}
                  isFavorited={favorites.includes(property.id)}
                  onClick={onPropertyClick}
                />
              </div>
            ))}
          </div>
        )}

        {/* View All Button (Mobile) */}
        <div className="flex justify-center mt-10 md:hidden">
          <button
            onClick={onViewAll}
            className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center"
          >
            <span>View All Properties</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProperties