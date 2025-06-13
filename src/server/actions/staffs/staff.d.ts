type AccessLevelsType = "Read Only" | "All Access" | "Read and Review";

interface CreateAdminParams {
  email: string;
  password: string;
  password_confirmation: string;
  full_name: string;
  access_level: AccessLevelsType; //All Access, Read and Review
}

interface UpdateAccessParams {
  email: string;
  access_level: AccessLevelsType;
}

type SELECTEDTYPE = string[];

interface GetAllStaffType {
  name: string;
  email: string;
  roleName: string;
  dateAdded: string;
  status: Status;
  userId: string;
}
