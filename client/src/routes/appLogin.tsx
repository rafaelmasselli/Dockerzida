import { Route, Routes } from "react-router-dom";

import { LogIn } from "../pages/logIn";
import { UndefinedPage } from "../pages/undefinedPage";
import { UserRegistro } from "../pages/userRegistration";

export function AppLogin() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/register" element={<UserRegistro />} />
      <Route path="*" element={<UndefinedPage />} />
    </Routes>
  );
}
