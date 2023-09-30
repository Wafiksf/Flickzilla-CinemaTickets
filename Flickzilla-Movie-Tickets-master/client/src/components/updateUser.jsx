import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateUser = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleProfilePicChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setProfilePic(e.target.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = {
        firstName: firstName,
        lastName: lastName,
        profilePic: profilePic,
      };

      const response = await axios.put(
        `http://localhost:5000/users/${user._id}`,
        updatedUser,
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("User updated:", response.data);
      toast.success("User Updated Successfully!", {
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user!", {
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex flex-col p-8">
      <div className="mb-4 flex justify-center items-center">
        <div className="rounded-full flex justify-center items-center border-lin">
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePicChange}
          />
          <label
            htmlFor="photo-upload"
            className="cursor-pointer block w-28 h-28"
          >
            <img
              src={
                profilePic || "https://img.freepik.com/free-icon/man_318-677829.jpg"
              }
              alt="Upload"
              className="w-28 h-28 rounded-full object-cover"
            />
          </label>
        </div>
      </div>
      <div>
        <label className="block font-bold mb-1 text-gray-500">First Name <span className="text-pink2">*</span></label>
        <input
          type="text"
          className="input-field bg-gray-100 px-4 py-4 w-full border border-s-pink2"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1 text-gray-500">Last Name <span className="text-pink2">*</span></label>
        <input
          type="text"
          className="input-field bg-gray-100 px-4 py-4 w-full border border-s-pink2"
          value={lastName}
          onChange={handleLastNameChange}
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

export default UpdateUser;
