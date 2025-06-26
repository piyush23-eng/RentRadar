import React, { useState } from 'react'
import { Search, MapPin, Filter } from 'lucide-react'
import { indianCities } from '../data/indianData'

interface HeroSectionProps {
  onSearch: (searchTerm: string, city: string) => void
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [city, setCity] = useState('Delhi')

  const handleSearch = () => {
    onSearch(searchTerm, city)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='nonzero'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
              Student Rental in India
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Discover verified, student-friendly rentals near your university. 
            Safe, affordable, and designed with Indian students in mind.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* Location */}
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  >
                    {indianCities.map(cityName => (
                      <option key={cityName} value={cityName}>{cityName}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Term */}
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are you looking for?
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="2BHK near IIT, PG for girls, Studio apartment..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Search Actions */}
              <div className="md:col-span-3 flex space-x-2">
                <button className="flex-1 md:flex-none bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Filter className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Filters</span>
                </button>
                <button
                  onClick={handleSearch}
                  className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center"
                >
                  <Search className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Search</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-blue-200 text-sm">Verified Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-blue-200 text-sm">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.8★</div>
              <div className="text-blue-200 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-200 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection