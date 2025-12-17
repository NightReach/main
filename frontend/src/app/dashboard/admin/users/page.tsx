"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";

type User = {
  id: string;
  email: string;
  role: string;
  emailVerified: boolean;
  isDisabled: boolean;
  createdAt: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = async () => {
    const res = await api.get("/api/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleUser = async (id: string) => {
    await api.post(`/api/admin/users/${id}/toggle`);
    loadUsers();
  };

  return (
    <ProtectedRoute role="ADMIN">
      <div>
        <h1 className="text-2xl font-bold mb-6">Users</h1>

        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th>Email</th>
              <th>Role</th>
              <th>Verified</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.emailVerified ? "Yes" : "No"}</td>
                <td>{u.isDisabled ? "Disabled" : "Active"}</td>
                <td>
                  <button
                    onClick={() => toggleUser(u.id)}
                    className="text-blue-600 underline"
                  >
                    {u.isDisabled ? "Enable" : "Disable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
}
