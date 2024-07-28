import React, { useState, useEffect } from "react";
import UserTable from "./components/UserTable";
import AddUserForm from "./components/AddUserForm";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/user");
      console.log("Fetched users:", response.data);
      if (response.data.status === "Success") {
        setUsers(Array.isArray(response.data.users) ? response.data.users : []);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/register",
        user
      );
      console.log("Add user response:", response.data); // Debug logging
      if (response.data.status === "Success" && response.data.user) {
        setUsers([...users, response.data.user]);
      } else if (response.data.status === "Failed") {
        toast.error(response.data.msg);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("An error occurred while adding the user.");
      }
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/update/${id}`,
        updatedUser
      );
      if (response.data.status === "Success") {
        setUsers(
          users.map((user) => (user._id === id ? response.data.update : user))
        );
        toast.success("User updated successfully.");
        setEditingUser(null); // Clear the editing state
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("An error occurred while updating the user.");
      }
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/delete/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting the user.");
    }
  };

  const handleDeleteUser = (id) => {
    setDeleteUserId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteUserId(null);
  };

  const handleConfirmDelete = () => {
    if (deleteUserId) {
      deleteUser(deleteUserId);
    }
    handleCloseModal();
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <AddUserForm
        addUser={addUser}
        editingUser={editingUser}
        updateUser={updateUser}
      />
      <UserTable
        users={users}
        setEditingUser={setEditingUser}
        deleteUser={handleDeleteUser}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default App;
