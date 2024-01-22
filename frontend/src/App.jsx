import DashBoard from "./pages/DashBoard";
import Signin from "./pages/authentication/Signin";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/authentication/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
