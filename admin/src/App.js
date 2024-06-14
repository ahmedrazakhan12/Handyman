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

function App() {
  
  return (
    <div className="App">
        
          <Routes>
            <Route path="/"  element={<Protected Component={Dashboard} />} />
            <Route path="/profile"  element={<Protected Component={Profile} />}  />
            <Route path="/profile/edit"  element={<Protected Component={Editprofile} />}  />
            <Route path="/profile/setting"  element={<Protected Component={SettingProfile} />}  />
            <Route path="/add-member"  element={<Protected Component={AddMember} />}  />
            <Route path="/team-management"  element={<Protected Component={Team} />}  />
            <Route path="/edit-member/:id"  element={<Protected Component={EditAdmins} />}  />

            <Route path="/sign-in" element={<Signin />} />
          </Routes>
      
    </div>
  );
}

export default App;
