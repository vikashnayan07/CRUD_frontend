import React, { useState, useEffect } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import UserForm from "./UserForm";

function AddUserForm({ addUser, editingUser, updateUser }) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setIsFormVisible(true);
    }
  }, [editingUser]);

  const handleAddUser = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const handleSaveUser = (user) => {
    if (editingUser) {
      updateUser(user._id, user);
    } else {
      addUser(user);
    }
    handleCloseForm();
  };

  return (
    <div>
      <div className="flex justify-between mb-4 p-4 bg-gradient-to-r to-sky-400 from-blue-500 text-white items-center rounded-lg">
        <h1 className="text-2xl font-semibold">Employee Management</h1>
        <div
          className="flex items-center pl-2 pr-2 py-1 bg-green-800 rounded-lg cursor-pointer"
          onClick={handleAddUser}
        >
          <IoMdAddCircleOutline className="text-2xl mr-2" />
          <button className="text-xl font-semibold">Add Employee</button>
        </div>
      </div>
      <UserForm
        visible={isFormVisible}
        onClose={handleCloseForm}
        onSave={handleSaveUser}
        editingUser={editingUser}
      />
    </div>
  );
}

export default AddUserForm;
