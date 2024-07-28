import React from "react";

const UserTable = ({ users, setEditingUser, deleteUser }) => {
  return (
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Job</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Phone</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr
            key={user._id}
            className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
          >
            <td className="border px-4 py-2">{user.name}</td>
            <td className="border px-4 py-2">{user.job}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">{user.phone}</td>
            <td className="border px-4 py-2 text-center">
              <button
                onClick={() => setEditingUser(user)}
                className="mr-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
