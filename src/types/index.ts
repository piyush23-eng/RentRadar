export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  propertyType: 'apartment' | 'house' | 'studio' | 'shared-room';
  images: string[];
  description: string;
  amenities: string[];
  landlord: Landlord;
  available: boolean;
  availableDate: string;
  utilities: string[];
  petPolicy: string;
  parking: boolean;
  furnished: boolean;
  studentFriendly: boolean;
  verified: boolean;
  rating: number;
  reviewCount: number;
  distance: {
    university: string;
    walkingTime: number;
    drivingTime: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Landlord {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  responseTime: string;
  joinedDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  university: string;
  graduationYear: number;
  verified: boolean;
  favorites: string[];
}

export interface SearchFilters {
  city: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number[];
  propertyType: string[];
  amenities: string[];
  maxDistance: number;
  furnished?: boolean;
  petFriendly?: boolean;
  parking?: boolean;
  verified?: boolean;
}