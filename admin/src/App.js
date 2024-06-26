import  { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Protected from "./components/Protected";
import Editprofile from "./edit/Editprofile";
import AddMember from "./pages/AddMember";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SettingProfile from "./edit/SettingProfile";
import Team from "./pages/Team";
import EditAdmins from "./edit/EditAdmins";
import AdminData from "./pages/AdminData";
import Users from "./pages/Users";
import AddCustomer from "./pages/AddCustomer";
import UserData from "./pages/UserData";
import EditCustomer from "./edit/EditCustomer";
import ProviderList from "./pages/ProviderList";
import AddProvider from "./pages/AddProvider";
import ProviderView from "./pages/ProviderView";
import EditProvider from "./edit/EditProvider";
function App() {
  const [adminData, setAdminData] = useState({});
  const [loginId, setLoginId] = useState(''); // Initialize with null or an appropriate initial value

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/admin/decodedToken", {
        headers: { Authorization: token }
      })
      .then((res) => {
        setLoginId(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 
  useEffect(() => {
    if (loginId) {
      axios
        .get("http://localhost:5000/admin/adminInfo", {
          headers: { Authorization: ` ${loginId}` } // Corrected usage of loginId
        })
        .then((res) => {
          setAdminData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loginId]);
  
  return (
    <div className="App">
        
          <Routes>
            <Route path="/"  element={<Protected Component={Dashboard} />} />
            <Route path="/profile"  element={<Protected Component={Profile} />}  />
            <Route path="/profile/edit"  element={<Protected Component={Editprofile} />}  />
            <Route path="/profile/setting"  element={<Protected Component={SettingProfile} />}  />
            {adminData.role === "super-admin" && (
            <>
            <Route path="/add-member"  element={<Protected Component={AddMember} />}  />
            <Route path="/team-management"  element={<Protected Component={Team} />}  />
            <Route path="/edit-member/:id"  element={<Protected Component={EditAdmins} />}  />
            <Route path="/admin-data/:id"  element={<Protected Component={AdminData} />}  />
            </>
            )}
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/customers" element={<Users />} />
            <Route path="/add-customer" element={<AddCustomer />} />
            <Route path="/user-data/:id" element={<UserData />} />
            <Route path="/edit-customer/:id" element={<EditCustomer />} />
            <Route path="/providerList" element={<ProviderList />} />
            <Route path="/add-provider" element={<AddProvider />} />
            <Route path="/provider/:id" element={<ProviderView />} />
            <Route path="/edit-provider/:id" element={<EditProvider/>} />
          </Routes>
      
    </div>
  );
}

export default App;
