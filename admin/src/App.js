import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Protected from "./components/Protected";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editprofile from "./edit/Editprofile";

function App() {
  return (
    <div className="App">
        
          <Routes>
            <Route path="/"  element={<Protected Component={Dashboard} />} />
            <Route path="/profile"  element={<Protected Component={Profile} />}  />
            <Route path="/profile/edit"  element={<Protected Component={Editprofile} />}  />
            <Route path="/sign-in" element={<Signin />} />
          </Routes>
      
    </div>
  );
}

export default App;
