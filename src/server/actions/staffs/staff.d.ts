interface CreateAdminParams {
  email: string;
  password: string;
  password_confirmation: string;
  full_name: string;
  access_level: "Read Only" | "All Access" | "Read and Review"; //All Access, Read and Review
}

interface UpdateRoleParams {
  email: string;
  newRoleName: "staff-user" | "admin-user";
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
