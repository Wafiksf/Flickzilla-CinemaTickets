import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../../components/sidebar/sideBar";
import "./dashboard.css";
import Icons from "../../components/icons/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await axios.get("http://localhost:5000/users", {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function handleDeleteUser(userId) {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`, {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  async function handleToggleAdmin(userId, isAdmin) {
    try {
      await axios.put(
        `http://localhost:5000/users/${userId}`,
        { isAdmin: !isAdmin },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchUsers();
      if (!isAdmin) {
        toast.success("Promoted To Admin!", {
          theme: "colored",
        });
      } else {
        toast.success("Demoted To User!", {
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  return (
    <div className="dash-body">
      <div>
        <SideBar />
      </div>
      <div className="content">
        <ToastContainer />
        <div className="title-info">
          <p>All Users</p>
          <i></i>
        </div>
        <div className="search-input">
          <input
         type="text"
         placeholder="Search by email or name"
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
         className="input-field bg-wblack px-8 py-4 xl:w-96 rounded-lg"
          />
        </div>
        <table className="dash-table" id="users-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(
                (user) =>
                  user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((user, index) => (
                <tr key={index}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      {user.email}
                      {user.googleId && (
                        <span className="google-id mx-2">
                          <Icons.Google />
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <button
                      className={
                        user.isAdmin
                          ? "bg-red-600 rounded-lg p-2 m-2"
                          : "bg-green-600 rounded-lg p-2 m-2"
                      }
                      onClick={() => handleToggleAdmin(user._id, user.isAdmin)}
                    >
                      {user.isAdmin ? "Remove Admin" : "Make Admin"}
                    </button>
                    <button
                      className="bg-red-600 rounded-lg p-2 m-2"
                      onClick={() => handleDeleteUser(user._id)}
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
}

export default UsersPage;
