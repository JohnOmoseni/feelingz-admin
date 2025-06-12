import { AxiosResponse } from "axios";
import { handleApiError } from "@/lib";
import api from "@/server/axios";

// STAFF ENDPOINT
const getAllRoles = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`/admin/all-roles`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getAllStaff = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`/admin/staffs`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getStaffById = async ({ staff_id }: { staff_id: string }): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`/admin/staff/${staff_id}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// POSTS REQUESTS
const createAdmin = async (data: CreateAdminParams): Promise<AxiosResponse["data"]> => {
  const payload = {
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation,
    full_name: data.full_name,
    access_level: data.access_level,
  };
  try {
    const response = await api.post(`/admin/create`, payload);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const activateStaff = async (selectedIds: string[]): Promise<AxiosResponse["data"]> => {
  const payload = {
    ids: selectedIds,
  };
  try {
    const response = await api.put(`/admin/activate-staff`, payload);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const deactivateStaff = async (selectedIds: string[]): Promise<AxiosResponse["data"]> => {
  const payload = {
    ids: selectedIds,
  };
  try {
    const response = await api.put(`/admin/deactivate-staff`, payload);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// DELETE STAFF
const deleteStaff = async (selectedIds: string[]): Promise<AxiosResponse["data"]> => {
  const payload = {
    ids: selectedIds,
  };
  try {
    const response = await api.delete(`/admin/delete-staff`, {
      data: payload,
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// UPDATE ROLE
const updateRole = async (data: UpdateRoleParams): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.put(`/admin/update-role`, data);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const staffApi = {
  getAllRoles,
  getAllStaff,
  getStaffById,

  createAdmin,
  activateStaff,
  deactivateStaff,

  updateRole,
  deleteStaff,
};
