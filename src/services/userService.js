import { apiClient } from "./apiClient";

const USERS_ENDPOINT = "/users";

export const userService = {
  getAllUsers: async () => {
    try {
      const response = await apiClient.get(USERS_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users. Please try again.");
    }
  },
  getUserById: async (id) => {
    try {
      const response = await apiClient.get(`${USERS_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw new Error("Failed to fetch user. Please try again.");
    }
  },
  createUser: async (userData) => {
    try {
      const response = await apiClient.post(USERS_ENDPOINT, userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user. Please try again.");
    }
  },
  updateUser: async (id, userData) => {
    try {
      const response = await apiClient.put(`${USERS_ENDPOINT}/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw new Error("Failed to update user. Please try again.");
    }
  },
  deleteUser: async (id) => {
    try {
      await apiClient.delete(`${USERS_ENDPOINT}/${id}`);
      return { success: true, id };
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw new Error("Failed to delete user. Please try again.");
    }
  },
};
