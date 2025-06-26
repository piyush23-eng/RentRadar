import React, { useState } from 'react'
import { Search, User, Heart, Bell, Menu, X, Home, Plus, LogOut, Building2 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface HeaderProps {
  onSearchClick: () => void
  onFavoritesClick: () => void
  onAddPropertyClick: () => void
  onAuthClick: () => void
  user: any
  profile: any
}

const Header: React.FC<HeaderProps> = ({ 
  onSearchClick, 
  onFavoritesClick, 
  onAddPropertyClick,
  onAuthClick,
  user,
  profile
}) => {
  const { signOut } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setShowUserMenu(false)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 p-2.5 rounded-xl shadow-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                RentRadar
              </span>
              <span className="text-xs text-gray-500 -mt-1 hidden sm:inline">Student Housing</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={onSearchClick}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Browse Properties
            </button>
            {user && (
              <button 
                onClick={onAddPropertyClick}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                List Property
              </button>
            )}
            <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              About
            </button>
            <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Contact
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onSearchClick}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {user ? (
              <>
                <button 
                  onClick={onFavoritesClick}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
                  title="Favorites"
                >
                  <Heart className="h-5 w-5" />
                </button>
                
                <button 
                  onClick={onAddPropertyClick}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Add Property"
                >
                  <Plus className="h-5 w-5" />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {profile?.profile_image ? (
                      <img
                        src={profile.profile_image}
                        alt={profile.full_name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {profile?.full_name?.split(' ')[0] || 'User'}
                    </span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{profile?.full_name}</p>
                        <p className="text-xs text-gray-500">{profile?.email}</p>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button 
                onClick={onAuthClick}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={onSearchClick}
                className="text-left text-gray-600 hover:text-gray-900 font-medium py-2"
              >
                Browse Properties
              </button>
              {user && (
                <button 
                  onClick={onAddPropertyClick}
                  className="text-left text-gray-600 hover:text-gray-900 font-medium py-2"
                >
                  List Property
                </button>
              )}
              <button className="text-left text-gray-600 hover:text-gray-900 font-medium py-2">
                About
              </button>
              <button className="text-left text-gray-600 hover:text-gray-900 font-medium py-2">
                Contact
              </button>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <button onClick={onSearchClick} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Search className="h-5 w-5" />
                  </button>
                  {user && (
                    <>
                      <button onClick={onFavoritesClick} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Heart className="h-5 w-5" />
                      </button>
                      <button onClick={onAddPropertyClick} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Plus className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
                {user ? (
                  <button 
                    onClick={handleSignOut}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button 
                    onClick={onAuthClick}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header