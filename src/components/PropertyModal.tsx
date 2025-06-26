import React, { useState } from 'react'
import { 
  X, Heart, Share2, MapPin, Bath, Bed, Square, Car, CheckCircle, 
  Star, Clock, Phone, Mail, Calendar, Users, ChevronLeft, ChevronRight
} from 'lucide-react'
import { supabase } from '../lib/supabase'

interface PropertyModalProps {
  property: any
  isOpen: boolean
  onClose: () => void
  onFavorite: (propertyId: string) => void
  isFavorited: boolean
  user: any
}

const PropertyModal: React.FC<PropertyModalProps> = ({ 
  property, 
  isOpen, 
  onClose, 
  onFavorite, 
  isFavorited,
  user
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [inquiryForm, setInquiryForm] = useState({
    message: '',
    phone: '',
    email: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [inquirySuccess, setInquirySuccess] = useState(false)

  if (!isOpen || !property) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSubmitting(true)
    try {
      const { error } = await supabase
        .from('inquiries')
        .insert({
          property_id: property.id,
          user_id: user.id,
          landlord_id: property.landlord_id,
          message: inquiryForm.message,
          phone: inquiryForm.phone,
          email: inquiryForm.email,
          status: 'pending'
        })

      if (error) throw error

      setInquirySuccess(true)
      setInquiryForm({ message: '', phone: '', email: '' })
    } catch (error) {
      console.error('Error sending inquiry:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{property.title}</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onFavorite(property.id)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorited 
                    ? 'bg-accent-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button 
                onClick={onClose}
                className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Image Gallery */}
            <div className="lg:w-2/3">
              <div className="relative h-64 md:h-96 lg:h-full min-h-96">
                <img
                  src={property.images[currentImageIndex]}
                  alt={`${property.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  {property.verified && (
                    <span className="bg-success-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verified
                    </span>
                  )}
                  {property.student_friendly && (
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Student Friendly
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="lg:w-1/3 p-6 space-y-6">
              {/* Price and Basic Info */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-gray-900">₹{property.price.toLocaleString('en-IN')}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.address}, {property.city}, {property.state}</span>
                </div>
                <div className="flex items-center space-x-1 mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-gray-500">({property.review_count} reviews)</span>
                </div>
              </div>

              {/* Property Specs */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-sm">
                    {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} bed`}
                  </span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-sm">{property.bathrooms} bath</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-sm">{property.square_feet} sqft</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-sm">{property.walking_time} min walk</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {property.amenities.map((amenity: string) => (
                    <div key={amenity} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-success-500" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Available Date:</span>
                  <span className="font-medium">{formatDate(property.available_date)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Furnished:</span>
                  <span className="font-medium">{property.furnished ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Parking:</span>
                  <span className="font-medium">{property.parking ? 'Available' : 'Not Available'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Pet Policy:</span>
                  <span className="font-medium text-right">{property.pet_policy}</span>
                </div>
              </div>

              {/* Contact Form */}
              {user ? (
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Contact Landlord</h4>
                  
                  {inquirySuccess ? (
                    <div className="text-center py-4">
                      <CheckCircle className="h-8 w-8 text-success-500 mx-auto mb-2" />
                      <p className="text-success-600 font-medium">Inquiry sent successfully!</p>
                      <p className="text-sm text-gray-600">The landlord will contact you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-3">
                      <textarea
                        value={inquiryForm.message}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Hi, I'm interested in this property..."
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <input
                        type="tel"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Your phone number"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <input
                        type="email"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Your email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium disabled:opacity-50"
                      >
                        {submitting ? 'Sending...' : 'Send Inquiry'}
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="p-4 border border-gray-200 rounded-lg text-center">
                  <p className="text-gray-600 mb-3">Sign in to contact the landlord</p>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyModal