type MutateUserActionType = "Suspend" | "Approve" | "Un-Suspend" | "Un-Approve";

interface MutateUserParams {
  user_id: string;
  email: string;
  type: MutateUserActionType;
}

interface UserResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  paid: boolean;
  phone: string;
  avatar: string;
  cover_pic: string | null;
  selfie: string;
  bio: string;
  dob: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  zodiac: string;
  faith: string;
  height: string;
  size: string;
  education: string;
  occupation: string;
  role: string;
  social_id: string | null;
  social_type: string;
  status: "banned" | "active" | "pending" | string;
  is_verified: number;
  created_at: string;
  updated_at: string;
  google_id: string | null;
}
