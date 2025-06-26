import { Database } from '../lib/supabase'

export const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
  'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara',
  'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut',
  'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi', 'Srinagar',
  'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad'
]

export const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
]

export const indianUniversities = [
  'Indian Institute of Technology (IIT) Delhi',
  'Indian Institute of Technology (IIT) Bombay',
  'Indian Institute of Technology (IIT) Bangalore',
  'Indian Institute of Science (IISc) Bangalore',
  'Jawaharlal Nehru University (JNU)',
  'University of Delhi',
  'Banaras Hindu University (BHU)',
  'Aligarh Muslim University (AMU)',
  'Jamia Millia Islamia',
  'Jadavpur University',
  'Anna University',
  'Osmania University',
  'University of Mumbai',
  'Pune University',
  'Calcutta University',
  'Madras University',
  'Hyderabad University',
  'Manipal Academy of Higher Education',
  'Vellore Institute of Technology (VIT)',
  'SRM Institute of Science and Technology'
]

export const sampleProperties: Database['public']['Tables']['properties']['Insert'][] = [
  {
    title: '2BHK Furnished Apartment near IIT Delhi',
    description: 'Spacious 2BHK apartment perfect for students. Fully furnished with modern amenities, high-speed internet, and 24/7 security. Walking distance to IIT Delhi campus.',
    address: 'Sector 15, Rohini',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110085',
    price: 25000,
    bedrooms: 2,
    bathrooms: 2,
    square_feet: 900,
    property_type: 'apartment',
    images: [
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'AC', 'Furnished', 'Security', 'Parking', 'Water Supply'],
    available_date: '2024-07-01',
    utilities: ['Electricity', 'Water', 'Internet'],
    pet_policy: 'No pets allowed',
    parking: true,
    furnished: true,
    student_friendly: true,
    university: 'Indian Institute of Technology (IIT) Delhi',
    walking_time: 10,
    driving_time: 3,
    latitude: 28.7041,
    longitude: 77.1025,
    landlord_id: '' // Will be set when creating
  },
  {
    title: 'Single Room PG for Girls near Mumbai University',
    description: 'Safe and secure PG accommodation for female students. Includes meals, laundry, and housekeeping services. Located in a prime area with easy access to Mumbai University.',
    address: 'Andheri West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400058',
    price: 15000,
    bedrooms: 1,
    bathrooms: 1,
    square_feet: 150,
    property_type: 'shared-room',
    images: [
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Meals Included', 'Laundry', 'Housekeeping', 'Security', 'AC'],
    available_date: '2024-06-15',
    utilities: ['All Inclusive'],
    pet_policy: 'No pets allowed',
    parking: false,
    furnished: true,
    student_friendly: true,
    university: 'University of Mumbai',
    walking_time: 15,
    driving_time: 5,
    latitude: 19.0760,
    longitude: 72.8777,
    landlord_id: ''
  },
  {
    title: '3BHK Independent House near IISc Bangalore',
    description: 'Spacious independent house perfect for group of students. Located in a quiet residential area near IISc Bangalore. Includes garden, parking, and modern amenities.',
    address: 'Malleswaram',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560003',
    price: 35000,
    bedrooms: 3,
    bathrooms: 2,
    square_feet: 1200,
    property_type: 'house',
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Garden', 'Parking', 'Kitchen', 'Balcony', 'Security'],
    available_date: '2024-08-01',
    utilities: ['Electricity', 'Water'],
    pet_policy: 'Pets allowed with deposit',
    parking: true,
    furnished: false,
    student_friendly: true,
    university: 'Indian Institute of Science (IISc) Bangalore',
    walking_time: 20,
    driving_time: 8,
    latitude: 12.9716,
    longitude: 77.5946,
    landlord_id: ''
  }
]

export const sampleLandlords = [
  {
    full_name: 'Rajesh Kumar Sharma',
    email: 'rajesh.sharma@example.com',
    phone: '+91-9876543210',
    university: 'Delhi University',
    graduation_year: 1995,
    profile_image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true
  },
  {
    full_name: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '+91-9123456789',
    university: 'Mumbai University',
    graduation_year: 2000,
    profile_image: 'https://images.pexels.com/photos/2748730/pexels-photo-2748730.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true
  },
  {
    full_name: 'Arjun Reddy',
    email: 'arjun.reddy@example.com',
    phone: '+91-9988776655',
    university: 'IISc Bangalore',
    graduation_year: 1998,
    profile_image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true
  }
]