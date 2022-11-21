import { NavBar } from "./components/shared/navbar";
import useAuth from "./hooks/useAuth";

import { AppLogin } from "./routes/appLogin";

import { AppRoutes } from "./routes/appRoutes";

function App() {
  const { user } = useAuth();

  return (
    <>
      <NavBar />
      {user ? <AppRoutes /> : <AppLogin />}
    </>
  );
}

export default App;
