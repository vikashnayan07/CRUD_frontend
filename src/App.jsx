import React, { useState, useEffect } from "react";
import UserTable from "./components/UserTable";
import AddUserForm from "./components/AddUserForm";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://crud-backend-x1ji.onrender.com/api/user"
      );
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
      // Make API request to add user
      await axios.post(
        "https://crud-backend-x1ji.onrender.com/api/register",
        user
      );

      // Fetch updated user list after adding a new user
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(
        `https://crud-backend-x1ji.onrender.com/api/update/${id}`,
        updatedUser
      );
      setUsers(
        users.map((user) => (user._id === id ? response.data.update : user))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `https://crud-backend-x1ji.onrender.com/api/delete/${id}`
      );
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <AddUserForm
        addUser={addUser}
        editingUser={editingUser}
        updateUser={updateUser}
      />
      <UserTable
        users={users}
        setEditingUser={setEditingUser}
        deleteUser={deleteUser}
      />
    </div>
  );
}

export default App;
