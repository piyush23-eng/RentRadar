import React, { useState } from 'react'
import { Search, Filter, MapPin, DollarSign, X } from 'lucide-react'
import { SearchFilters } from '../hooks/useProperties'
import { indianCities } from '../data/indianData'

interface SearchSectionProps {
  onSearch: (filters: SearchFilters) => void
  currentFilters: SearchFilters
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, currentFilters }) => {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>(currentFilters)

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
  }

  const handleBedroomToggle = (bedrooms: number) => {
    const current = filters.bedrooms || []
    const newBedrooms = current.includes(bedrooms)
      ? current.filter(b => b !== bedrooms)
      : [...current, bedrooms]
    handleFilterChange('bedrooms', newBedrooms)
  }

  const handlePropertyTypeToggle = (type: string) => {
    const current = filters.propertyType || []
    const newTypes = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type]
    handleFilterChange('propertyType', newTypes)
  }

  const handleAmenityToggle = (amenity: string) => {
    const current = filters.amenities || []
    const newAmenities = current.includes(amenity)
      ? current.filter(a => a !== amenity)
      : [...current, amenity]
    handleFilterChange('amenities', newAmenities)
  }

  const handleSearch = () => {
    onSearch(filters)
    setShowFilters(false)
  }

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      city: '',
      minPrice: 0,
      maxPrice: 100000,
      bedrooms: [],
      propertyType: [],
      amenities: [],
      maxDistance: 60,
    }
    setFilters(clearedFilters)
    onSearch(clearedFilters)
  }

  const activeFilterCount = [
    filters.bedrooms?.length || 0,
    filters.propertyType?.length || 0,
    filters.amenities?.length || 0,
    filters.furnished ? 1 : 0,
    filters.parking ? 1 : 0,
    filters.verified ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Main Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Location */}
          <div className="flex-1 md:max-w-xs">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Cities</option>
                {indianCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="flex-1 md:max-w-xs">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || 0)}
                  placeholder="Min price (₹)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <span className="text-gray-500">to</span>
              <div className="relative flex-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || 100000)}
                  placeholder="Max price (₹)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`relative px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center ${
                showFilters ? 'bg-gray-50' : ''
              }`}
            >
              <Filter className="h-5 w-5 mr-2" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <button
              onClick={handleSearch}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearFilters}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Bedrooms</label>
                <div className="flex flex-wrap gap-2">
                  {[0, 1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleBedroomToggle(num)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filters.bedrooms?.includes(num)
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {num === 0 ? 'Studio' : `${num}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
                <div className="space-y-2">
                  {['studio', 'apartment', 'house', 'shared-room'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.propertyType?.includes(type) || false}
                        onChange={() => handlePropertyTypeToggle(type)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {type === 'shared-room' ? 'PG/Shared Room' : type.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
                <div className="space-y-2">
                  {['WiFi', 'AC', 'Furnished', 'Parking', 'Security', 'Power Backup'].map((amenity) => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.amenities?.includes(amenity) || false}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Distance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Max Distance (walking minutes)
                </label>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={filters.maxDistance}
                  onChange={(e) => handleFilterChange('maxDistance', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>5 min</span>
                  <span>{filters.maxDistance} min</span>
                  <span>60 min</span>
                </div>
              </div>

              {/* Additional Options */}
              <div className="m d:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">Additional Preferences</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.furnished || false}
                      onChange={(e) => handleFilterChange('furnished', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Furnished</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.parking || false}
                      onChange={(e) => handleFilterChange('parking', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Parking Available</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.verified || false}
                      onChange={(e) => handleFilterChange('verified', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Verified Only</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchSection