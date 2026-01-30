export type UserRole = "admin" | "operator";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserForm {
  email: string;
  name: string;
  role: UserRole;
  password?: string;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  data: User[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const getRoleLabel = (role: UserRole) => {
  switch (role) {
    case "admin":
      return "Admin";
    case "operator":
      return "Operator";
  }
};
