import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Regsiter from "./pages/Regsiter";
import Notfound from "./pages/Notfound";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="pad">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Regsiter />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
