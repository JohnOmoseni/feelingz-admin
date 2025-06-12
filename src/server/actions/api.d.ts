interface UserType {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  paid: boolean;
  phone: string | null;
  avatar: string | null;
  cover_pic: string | null;
  selfie: string | null;
  bio: string | null;
  dob: string | null;
  gender: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  zodiac: string | null;
  faith: string | null;
  height: string | null;
  size: string | null;
  education: string | null;
  occupation: string | null;
  role: string;
  social_id: string | null;
  social_type: string | null;
  status: string;
  is_verified: number;
  created_at: string;
  updated_at: string;
  roles: Role[];

  userId: string | null;
  full_name: string | null;
  is_email_verified: boolean;
}
