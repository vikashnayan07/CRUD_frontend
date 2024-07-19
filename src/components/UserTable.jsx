import React from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";

function UserTable({ users, setEditingUser, deleteUser }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-center text-xl font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-center text-xl font-medium text-gray-500 uppercase tracking-wider">
            Job
          </th>
          <th className="px-6 py-3 text-center text-xl font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-center text-xl font-medium text-gray-500 uppercase tracking-wider">
            Phone
          </th>
          <th className="px-6 py-3 text-center text-xl font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((user) => (
          <tr key={user._id}>
            <td className="px-6 py-4 whitespace-nowrap">{user.name} </td>
            <td className="px-6 py-4 whitespace-nowrap">{user.job}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => setEditingUser(user)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                <FaEdit />
                Edit
              </button>
              <button
                onClick={() => deleteUser(user._id)}
                className="text-red-600 hover:text-red-900 ml-2"
              >
                <RiDeleteBin7Fill />
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
