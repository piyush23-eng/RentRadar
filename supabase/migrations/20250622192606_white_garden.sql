/*
  # Add Sample Properties Data

  1. Sample Properties
    - Creates diverse sample properties across major Indian cities
    - Includes various property types: apartments, PGs, hostels, studios
    - Uses placeholder landlord_id that will be updated when real users register
    - Covers major universities and student areas in India

  2. Property Types
    - Apartment: Traditional rental apartments
    - Shared-room: PG accommodations
    - Hostel: Institutional-style housing
    - Studio: Single-room apartments
    - House: Independent houses
    - Paying-guest: Budget PG options

  3. Features
    - Realistic pricing for Indian market
    - University-specific locations
    - Student-friendly amenities
    - Verified and unverified properties for variety
*/

-- Create a placeholder landlord profile function that can be used
-- This will create sample properties without requiring actual user accounts

-- First, let's create some sample properties with a placeholder landlord_id
-- We'll use a UUID that represents "system" properties until real landlords claim them
DO $$
DECLARE
    placeholder_landlord_id uuid := '00000000-0000-0000-0000-000000000000';
BEGIN
    -- Insert sample properties with placeholder landlord
    INSERT INTO properties (
        title, description, address, city, state, pincode, price, bedrooms, bathrooms, 
        square_feet, property_type, images, amenities, available_date, utilities, 
        pet_policy, parking, furnished, student_friendly, verified, rating, review_count,
        university, walking_time, driving_time, latitude, longitude, landlord_id
    ) VALUES
        (
            '2BHK Furnished Apartment near IIT Delhi',
            'Spacious 2BHK apartment perfect for students. Fully furnished with modern amenities, high-speed internet, and 24/7 security. Walking distance to IIT Delhi campus with easy access to metro station.',
            'Sector 15, Rohini',
            'Delhi',
            'Delhi',
            '110085',
            25000,
            2,
            2,
            900,
            'apartment',
            ARRAY['https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=800'],
            ARRAY['WiFi', 'AC', 'Furnished', 'Security', 'Parking', 'Water Supply', 'Power Backup'],
            '2024-07-01',
            ARRAY['Electricity', 'Water', 'Internet'],
            'No pets allowed',
            true,
            true,
            true,
            true,
            4.8,
            12,
            'Indian Institute of Technology (IIT) Delhi',
            10,
            3,
            28.7041,
            77.1025,
            placeholder_landlord_id
        ),
        (
            'Girls PG near Mumbai University - Safe & Secure',
            'Premium PG accommodation for female students. Includes meals, laundry, and housekeeping services. Located in a safe residential area with easy access to Mumbai University and local transport.',
            'Andheri West, Near Lokhandwala',
            'Mumbai',
            'Maharashtra',
            '400058',
            18000,
            1,
            1,
            200,
            'shared-room',
            ARRAY['https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800'],
            ARRAY['WiFi', 'Meals Included', 'Laundry', 'Housekeeping', 'Security', 'AC', 'CCTV', 'Warden'],
            '2024-06-15',
            ARRAY['All Inclusive'],
            'No pets allowed',
            false,
            true,
            true,
            true,
            4.6,
            18,
            'University of Mumbai',
            15,
            5,
            19.0760,
            72.8777,
            placeholder_landlord_id
        ),
        (
            '3BHK Independent House near IISc Bangalore',
            'Spacious independent house perfect for group of students. Located in a quiet residential area near IISc Bangalore. Includes garden, parking, and modern amenities. Ideal for research scholars.',
            'Malleswaram, 8th Cross',
            'Bangalore',
            'Karnataka',
            '560003',
            35000,
            3,
            2,
            1200,
            'house',
            ARRAY['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=800'],
            ARRAY['WiFi', 'Garden', 'Parking', 'Kitchen', 'Balcony', 'Security', 'Study Room'],
            '2024-08-01',
            ARRAY['Electricity', 'Water'],
            'Pets allowed with deposit',
            true,
            false,
            true,
            true,
            4.7,
            9,
            'Indian Institute of Science (IISc) Bangalore',
            20,
            8,
            12.9716,
            77.5946,
            placeholder_landlord_id
        ),
        (
            'Modern Hostel near JNU - Boys & Girls',
            'Modern hostel facility with separate wings for boys and girls. Includes mess, library, recreation room, and 24/7 security. Perfect for JNU students with shuttle service to campus.',
            'Munirka Village, Near JNU',
            'Delhi',
            'Delhi',
            '110067',
            12000,
            1,
            1,
            150,
            'shared-room',
            ARRAY['https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/2631748/pexels-photo-2631748.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'],
            ARRAY['WiFi', 'Mess/Canteen', 'Library', 'Recreation Room', 'Security', 'CCTV', 'Warden', 'Laundry'],
            '2024-07-15',
            ARRAY['All Inclusive'],
            'No pets allowed',
            false,
            true,
            true,
            true,
            4.5,
            25,
            'Jawaharlal Nehru University (JNU)',
            5,
            2,
            28.5355,
            77.1633,
            placeholder_landlord_id
        ),
        (
            'Luxury Studio Apartment near IIT Bombay',
            'Premium studio apartment with modern amenities and smart home features. Located in Powai with easy access to IIT Bombay. Perfect for graduate students and research scholars.',
            'Powai, Hiranandani Gardens',
            'Mumbai',
            'Maharashtra',
            '400076',
            28000,
            0,
            1,
            450,
            'studio',
            ARRAY['https://images.pexels.com/photos/2029719/pexels-photo-2029719.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=800'],
            ARRAY['WiFi', 'AC', 'Furnished', 'Balcony', 'Gym', 'Swimming Pool', 'Security', 'Elevator'],
            '2024-08-15',
            ARRAY['Water', 'Internet', 'Maintenance'],
            'Small pets allowed',
            true,
            true,
            true,
            true,
            4.9,
            6,
            'Indian Institute of Technology (IIT) Bombay',
            12,
            4,
            19.1136,
            72.9083,
            placeholder_landlord_id
        ),
        (
            'Budget PG for Boys near Delhi University',
            'Affordable PG accommodation for male students near Delhi University. Basic amenities with clean rooms, mess facility, and study area. Great for budget-conscious students.',
            'Kamla Nagar, Near North Campus',
            'Delhi',
            'Delhi',
            '110007',
            8000,
            1,
            1,
            120,
            'shared-room',
            ARRAY['https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800'],
            ARRAY['WiFi', 'Mess/Canteen', 'Study Room', 'Laundry', 'Security'],
            '2024-06-01',
            ARRAY['Electricity', 'Water'],
            'No pets allowed',
            false,
            true,
            true,
            false,
            4.2,
            15,
            'University of Delhi',
            8,
            3,
            28.6692,
            77.2265,
            placeholder_landlord_id
        ),
        (
            'Premium Girls Hostel near Anna University',
            'High-quality hostel for female students with modern facilities. Includes AC rooms, mess, gym, and recreation facilities. Located near Anna University with excellent transport connectivity.',
            'Guindy, Near Anna University',
            'Chennai',
            'Tamil Nadu',
            '600025',
            15000,
            1,
            1,
            180,
            'shared-room',
            ARRAY['https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800'],
            ARRAY['WiFi', 'AC', 'Mess/Canteen', 'Gym', 'Recreation Room', 'Security', 'CCTV', 'Warden', 'Library'],
            '2024-07-01',
            ARRAY['All Inclusive'],
            'No pets allowed',
            false,
            true,
            true,
            true,
            4.6,
            22,
            'Anna University',
            10,
            3,
            13.0067,
            80.2206,
            placeholder_landlord_id
        ),
        (
            '1BHK Furnished Flat near Pune University',
            'Cozy 1BHK apartment perfect for single students or couples. Fully furnished with kitchen, WiFi, and parking. Located in a safe area near Pune University with easy access to IT parks.',
            'Aundh, Near Pune University',
            'Pune',
            'Maharashtra',
            '411007',
            20000,
            1,
            1,
            600,
            'apartment',
            ARRAY['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/2029719/pexels-photo-2029719.jpeg?auto=compress&cs=tinysrgb&w=800'],
            ARRAY['WiFi', 'AC', 'Furnished', 'Kitchen', 'Parking', 'Security', 'Balcony'],
            '2024-08-01',
            ARRAY['Water', 'Internet'],
            'Cats allowed',
            true,
            true,
            true,
            true,
            4.4,
            8,
            'Pune University',
            15,
            5,
            18.5679,
            73.7143,
            placeholder_landlord_id
        ),
        (
            'Shared Room in Co-living Space - Hyderabad',
            'Modern co-living space with shared rooms for students and young professionals. Includes all amenities, housekeeping, and community events. Near Hyderabad University and IT corridor.',
            'Gachibowli, Financial District',
            'Hyderabad',
            'Telangana',
            '500032',
            14000,
            1,
            1,
            250,
            'shared-room',
            ARRAY['https://images.pexels.com/photos/2631748/pexels-photo-2631748.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800'],
            ARRAY['WiFi', 'AC', 'Housekeeping', 'Common Area', 'Gym', 'Recreation Room', 'Security', 'Laundry'],
            '2024-07-15',
            ARRAY['All Inclusive'],
            'No pets allowed',
            false,
            true,
            true,
            true,
            4.3,
            11,
            'Hyderabad University',
            25,
            10,
            17.4239,
            78.3957,
            placeholder_landlord_id
        ),
        (
            'Traditional PG near Banaras Hindu University',
            'Traditional paying guest accommodation near BHU with homely atmosphere. Includes vegetarian meals, study room, and cultural activities. Perfect for students who prefer traditional living.',
            'Lanka, Near BHU Gate',
            'Varanasi',
            'Uttar Pradesh',
            '221005',
            10000,
            1,
            1,
            140,
            'shared-room',
            ARRAY['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'],
            ARRAY['WiFi', 'Meals Included', 'Study Room', 'Common Area', 'Security', 'Laundry'],
            '2024-06-15',
            ARRAY['Electricity', 'Water'],
            'No pets allowed',
            false,
            true,
            true,
            true,
            4.1,
            13,
            'Banaras Hindu University (BHU)',
            5,
            2,
            25.2677,
            82.9913,
            placeholder_landlord_id
        )
    ON CONFLICT DO NOTHING;

    -- Add some additional sample properties for variety
    INSERT INTO properties (
        title, description, address, city, state, pincode, price, bedrooms, bathrooms, 
        square_feet, property_type, images, amenities, available_date, utilities, 
        pet_policy, parking, furnished, student_friendly, verified, rating, review_count,
        university, walking_time, driving_time, latitude, longitude, landlord_id
    ) VALUES
        (
            'Executive Studio near IIM Ahmedabad',
            'Premium studio apartment designed for management students. Modern furnishing, high-speed internet, and business center access. Located in the heart of Ahmedabad with easy access to IIM.',
            'Vastrapur, Near IIM',
            'Ahmedabad',
            'Gujarat',
            '380015',
            22000,
            0,
            1,
            400,
            'studio',
            ARRAY['https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=800'],
            ARRAY['WiFi', 'AC', 'Furnished', 'Business Center', 'Security', 'Parking', 'Gym'],
            '2024-08-01',
            ARRAY['All Inclusive'],
            'No pets allowed',
            true,
            true,
            true,
            true,
            4.7,
            5,
            'Indian Institute of Management (IIM) Ahmedabad',
            8,
            3,
            23.0395,
            72.5066,
            placeholder_landlord_id
        ),
        (
            'Affordable Hostel near NIT Trichy',
            'Budget-friendly hostel accommodation for engineering students. Clean rooms, mess facility, and study areas. Located near NIT Trichy with good transport connectivity.',
            'Thuvakudi, Near NIT',
            'Tiruchirappalli',
            'Tamil Nadu',
            '620015',
            9000,
            1,
            1,
            120,
            'shared-room',
            ARRAY['https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800'],
            ARRAY['WiFi', 'Mess/Canteen', 'Study Room', 'Security', 'Laundry', 'Common Area'],
            '2024-07-01',
            ARRAY['Electricity', 'Water'],
            'No pets allowed',
            false,
            true,
            true,
            false,
            4.0,
            20,
            'National Institute of Technology (NIT) Tiruchirappalli',
            12,
            4,
            10.7905,
            78.7047,
            placeholder_landlord_id
        ),
        (
            '2BHK Family Apartment near Jadavpur University',
            'Spacious 2BHK apartment suitable for families or group of students. Located in a residential area near Jadavpur University with easy access to metro and local transport.',
            'Jadavpur, 8B Bus Stand',
            'Kolkata',
            'West Bengal',
            '700032',
            16000,
            2,
            1,
            750,
            'apartment',
            ARRAY['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/2029719/pexels-photo-2029719.jpeg?auto=compress&cs=tinysrgb&w=800'],
            ARRAY['WiFi', 'Kitchen', 'Balcony', 'Security', 'Water Supply'],
            '2024-06-15',
            ARRAY['Electricity', 'Water'],
            'Pets allowed with deposit',
            false,
            false,
            true,
            true,
            4.3,
            7,
            'Jadavpur University',
            10,
            5,
            22.4999,
            88.3712,
            placeholder_landlord_id
        )
    ON CONFLICT DO NOTHING;

END $$;

-- Update property type constraint to include new types
DO $$
BEGIN
    -- Drop existing constraint if it exists
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'properties_property_type_check' 
        AND table_name = 'properties'
    ) THEN
        ALTER TABLE properties DROP CONSTRAINT properties_property_type_check;
    END IF;
    
    -- Add updated constraint with new property types
    ALTER TABLE properties ADD CONSTRAINT properties_property_type_check 
    CHECK (property_type IN ('apartment', 'house', 'studio', 'shared-room', 'hostel', 'paying-guest', 'dormitory'));
END $$;