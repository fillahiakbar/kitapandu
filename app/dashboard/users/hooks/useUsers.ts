"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { User, UserForm, UsersResponse } from "../utils/userUtils";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = (await apiFetch("/users")) as UsersResponse;
      setUsers(res.data);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (form: UserForm) => {
    await apiFetch("/users", {
      method: "POST",
      body: JSON.stringify(form),
    });
    fetchUsers();
  };

  const updateUser = async (id: string, form: UserForm) => {
    await apiFetch(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Hapus user ini?")) return;
    await apiFetch(`/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    addUser,
    updateUser,
    deleteUser,
  };
};
