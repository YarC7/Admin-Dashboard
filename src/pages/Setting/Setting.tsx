import React, { useState } from "react";
import Header from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { backendURL } from "../../lib/action/authAction";
import { setIsAuthenticated, setUser } from "../../lib/authSlice";
import { useCookies } from "react-cookie";

type UserSetting = {
  label: string;
  value: any | boolean;
  type: "text" | "upload";
};

const Settings = () => {
  const username = useSelector((state) => state.auth.user.username);
  const email = useSelector((state) => state.auth.user.email);
  const password = useSelector((state) => state.auth.user.password);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['token']); 

  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = (evt) => {
      const image = evt.target.result
        .replace(/^data:image\/[a-z]+;base64,/, "")
        .trim();
      setImage(`data:image/jpeg;base64,${image}`);
    };
  };
  const mockSettings: UserSetting[] = [
    { label: "Username", value: username, type: "text" },
    { label: "Email", value: email, type: "text" },
    { label: "Password", value: password, type: "text" },
    { label: "Image", value: image, type: "upload" },
  ];
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);

  const handleLogout = async () => {
    try {
      // Dispatch actions to clear user state
      dispatch(setIsAuthenticated(false));
      dispatch(setUser(null));
      // Clear cookies and session storage
      removeCookie("token"); // Assuming `removeCookie` requires the cookie key
      sessionStorage.removeItem("token");
  
      // Optionally, clear other user-related data if necessary
      sessionStorage.clear(); // Clears all session storage (if needed)
  
      // Redirect user to login page or homepage
      window.location.href = "/login"; // Or use `useNavigate` from `react-router-dom`
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  const handleSave = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = {
        username: userSettings[0].value,
        email: userSettings[1].value,
        password: userSettings[2].value,
        image: image,
      };
      const response = await axios.put(`${backendURL}/api/admin/update`, data, config);

      if (response.data.message === "success") {
        alert("Successfully updated information");
      } else {
        alert("Update failed: " + response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert("Error: " + error.response.data.message);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full">
      <div className="justify-between flex">

      <Header name="User Settings" />
      <Button color="primary" onClick={handleLogout}>Logout</Button>
      </div>
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm ">
                Setting
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm ">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="py-2 px-4">{setting.label}</td>
                <td className="py-2 px-4">
                  {setting.type === "upload" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        className="block w-full text-xs text-gray-900 border-2 border-gray-500 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        name="image"
                        onChange={handleFileChange}
                        type="file"
                        accept="image/*"
                      />
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 float-right flex">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default Settings;
