import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

function AddUserForm({ addUser, editingUser, updateUser }) {
  return (
    <div className="flex justify-between mb-4 p-4 bg-gradient-to-r to-sky-400 from-blue-500 text-white items-center rounded-lg">
      <h1 className="text-2xl font-semibold">Employee Management</h1>

      <div className=" flex items-center pl-2 pr-2 py-1 bg-green-800 rounded-lg">
        <IoMdAddCircleOutline className="text-2xl mr-2" />
        <h2 className="text-2xl font-semibold">Add Employee</h2>
      </div>
    </div>
  );
}

export default AddUserForm;
