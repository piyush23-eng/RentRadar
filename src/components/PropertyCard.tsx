import React from 'react'
import { Heart, MapPin, Bath, Bed, Square, CheckCircle, Star, Clock, Users } from 'lucide-react'

interface PropertyCardProps {
  property: any
  onFavorite: (propertyId: string) => void
  isFavorited: boolean
  onClick: (property: any) => void
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onFavorite, 
  isFavorited, 
  onClick 
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFavorite(property.id)
  }

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case 'studio': return 'Studio'
      case 'apartment': return 'Apartment'
      case 'house': return 'House'
      case 'shared-room': return 'PG/Shared'
      default: return type
    }
  }

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group animate-fade-in"
      onClick={() => onClick(property)}
    >
      {/* Image Container */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          {property.verified && (
            <span className="bg-success-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </span>
          )}
          {property.student_friendly && (
            <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <Users className="h-3 w-3 mr-1" />
              Student Friendly
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isFavorited 
              ? 'bg-accent-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-accent-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full font-bold">
            ₹{property.price.toLocaleString('en-IN')}/mo
          </span>
        </div>

        {/* Availability Status */}
        {!property.available && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium">
              Not Available
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{property.address}, {property.city}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="font-medium">{property.rating}</span>
            <span className="text-gray-500">({property.review_count})</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
          {property.bedrooms > 0 && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms} bed</span>
            </div>
          )}
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.square_feet} sqft</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {property.amenities.slice(0, 3).map((amenity: string) => (
            <span
              key={amenity}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="text-gray-500 text-xs px-2 py-1">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Distance & Landlord */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            {property.landlord?.profile_image ? (
              <img
                src={property.landlord.profile_image}
                alt={property.landlord.full_name}
                className="h-6 w-6 rounded-full"
              />
            ) : (
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            )}
            <span className="text-sm text-gray-600">{property.landlord?.full_name}</span>
            {property.landlord?.verified && (
              <CheckCircle className="h-4 w-4 text-success-500" />
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{property.walking_time} min walk</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard