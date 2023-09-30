import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassUser = ({ user }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleUpdate = async () => {
    try {
      if (!newPassword || !confirmPassword) {
        toast.error("Please fill in all password fields!", {
          theme: "colored",
        });
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error("New password and confirm password do not match!", {
          theme: "colored",
        });
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/users/newpass/${user._id}`,
        {
          password: newPassword,
        },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Password updated:", response.data);
      toast.success("Password Updated Successfully!", {
        theme: "colored",
      });
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message, {
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex flex-col p-8">
      <div className="mb-4">
        <label className="block font-bold mb-1 text-gray-500">New Password <span className="text-pink2">*</span></label>
        <input
          type="password"
          className="input-field bg-gray-100 px-4 py-4 w-full border border-s-pink2"
          onChange={handleNewPasswordChange}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1 text-gray-500">Confirm Password <span className="text-pink2">*</span></label>
        <input
          type="password"
          className="input-field bg-gray-100 px-4 py-4 w-full border border-s-pink2"
          onChange={handleConfirmPasswordChange}
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={handleUpdate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassUser;
