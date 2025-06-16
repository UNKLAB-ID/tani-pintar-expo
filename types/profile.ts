export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Profile {
  id: number;
  user: User;
  full_name: string;
  headline: string;
  farmer_community: string;
  country: string | null;
  city: string | null;
  email: string;
  phone_number: string;
  profile_type: string;
  id_card_file: string;
  id_card_validation_status: string;
  profile_picture_url: string;
  thumbnail_profile_picture_url: string;
  cover_picture_url: string;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
