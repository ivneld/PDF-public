import React, { useState, useEffect } from "react";

// @mui material 컴포넌트 (아직 적용 하지 않았음)
//import { ThemeProvider } from "@mui/material/styles"; 추후 다크모드 추가시 사용할 예정입니다
//import CssBaseLine from "@mui/material/CssBaseline";

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import SignIn from "src/layouts/authentication/sign-in";
import MainPage from "src/layouts/dashboard/main-page";
import ProfilePage from "src/layouts/profile";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="*"
              element={<Navigate to="/authentication/sign-in" />}
            />
            <Route
              path={"/authentication/sign-in"}
              element={<SignIn />}
            ></Route>
            <Route
              path="/dashboard"
              element={<Navigate to="/dashboard/main-page" />}
            />
            <Route path={"/dashboard/main-page"} element={<MainPage />}></Route>
            <Route path={"/profile"} element={<ProfilePage />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
