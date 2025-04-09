// src/modules/AssetManagement/UserManagement.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    axios.get("/api/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleAddUser = () => {
    axios.post("/api/users", newUser).then(() => {
      setUsers([...users, newUser]);
      setNewUser({ name: "", email: "", role: "" });
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Management</h2>
      <div className="mb-4">
        <h3 className="text-xl">Add New User</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            className="border p-2"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            className="border p-2"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <select
            className="border p-2"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add User
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl">User List</h3>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  <button
                    className="bg-yellow-500 text-white p-1 rounded"
                    onClick={() => console.log("Edit User", user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-1 rounded ml-2"
                    onClick={() => console.log("Delete User", user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
