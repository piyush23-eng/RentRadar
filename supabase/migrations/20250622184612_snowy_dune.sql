/*
  # Create RentRadar India Database Schema

  1. New Tables
    - `profiles` - User profiles for students and landlords
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `phone` (text)
      - `university` (text)
      - `graduation_year` (integer)
      - `profile_image` (text, nullable)
      - `verified` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `properties` - Rental properties
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `address` (text)
      - `city` (text)
      - `state` (text)
      - `pincode` (text)
      - `price` (integer)
      - `bedrooms` (integer)
      - `bathrooms` (integer)
      - `square_feet` (integer)
      - `property_type` (text)
      - `images` (text array)
      - `amenities` (text array)
      - `available` (boolean, default true)
      - `available_date` (date)
      - `utilities` (text array)
      - `pet_policy` (text)
      - `parking` (boolean)
      - `furnished` (boolean)
      - `student_friendly` (boolean)
      - `verified` (boolean, default false)
      - `rating` (numeric, default 0)
      - `review_count` (integer, default 0)
      - `university` (text)
      - `walking_time` (integer)
      - `driving_time` (integer)
      - `latitude` (numeric)
      - `longitude` (numeric)
      - `landlord_id` (uuid, foreign key to profiles)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `favorites` - User favorite properties
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `property_id` (uuid, foreign key to properties)
      - `created_at` (timestamp)
    
    - `inquiries` - Property inquiries from users to landlords
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `user_id` (uuid, foreign key to profiles)
      - `landlord_id` (uuid, foreign key to profiles)
      - `message` (text)
      - `phone` (text)
      - `email` (text)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access to properties
    - Add policies for landlords to manage their properties
    - Add policies for users to manage their favorites and inquiries

  3. Indexes
    - Add indexes for frequently queried columns
    - Add composite indexes for search functionality
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text NOT NULL,
  university text NOT NULL,
  graduation_year integer NOT NULL,
  profile_image text,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  price integer NOT NULL,
  bedrooms integer NOT NULL DEFAULT 0,
  bathrooms integer NOT NULL DEFAULT 1,
  square_feet integer NOT NULL DEFAULT 0,
  property_type text NOT NULL CHECK (property_type IN ('apartment', 'house', 'studio', 'shared-room')),
  images text[] NOT NULL DEFAULT '{}',
  amenities text[] NOT NULL DEFAULT '{}',
  available boolean DEFAULT true,
  available_date date NOT NULL,
  utilities text[] NOT NULL DEFAULT '{}',
  pet_policy text NOT NULL DEFAULT 'No pets allowed',
  parking boolean DEFAULT false,
  furnished boolean DEFAULT false,
  student_friendly boolean DEFAULT true,
  verified boolean DEFAULT false,
  rating numeric(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count integer DEFAULT 0,
  university text NOT NULL,
  walking_time integer NOT NULL DEFAULT 0,
  driving_time integer NOT NULL DEFAULT 0,
  latitude numeric(10,8) NOT NULL DEFAULT 0,
  longitude numeric(11,8) NOT NULL DEFAULT 0,
  landlord_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  landlord_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'closed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Properties policies
CREATE POLICY "Anyone can read available properties"
  ON properties
  FOR SELECT
  USING (available = true);

CREATE POLICY "Landlords can read own properties"
  ON properties
  FOR SELECT
  TO authenticated
  USING (auth.uid() = landlord_id);

CREATE POLICY "Landlords can insert own properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = landlord_id);

CREATE POLICY "Landlords can update own properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = landlord_id);

CREATE POLICY "Landlords can delete own properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (auth.uid() = landlord_id);

-- Favorites policies
CREATE POLICY "Users can read own favorites"
  ON favorites
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON favorites
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Inquiries policies
CREATE POLICY "Users can read own inquiries"
  ON inquiries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = landlord_id);

CREATE POLICY "Users can insert own inquiries"
  ON inquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Landlords can update inquiries for their properties"
  ON inquiries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = landlord_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_bedrooms ON properties(bedrooms);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_available ON properties(available);
CREATE INDEX IF NOT EXISTS idx_properties_landlord_id ON properties(landlord_id);
CREATE INDEX IF NOT EXISTS idx_properties_university ON properties(university);
CREATE INDEX IF NOT EXISTS idx_properties_walking_time ON properties(walking_time);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at);

CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_property_id ON favorites(property_id);

CREATE INDEX IF NOT EXISTS idx_inquiries_property_id ON inquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_user_id ON inquiries(user_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_landlord_id ON inquiries(landlord_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();