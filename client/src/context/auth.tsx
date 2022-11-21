import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/axios";

interface User {
  user: string;
  balance: number;
  countCredited: number;
  countDebited: number;
}

interface AuthContextData {
  user: User | null;
  signOut: () => void;
  signIn: any;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProvider {
  children: ReactNode;
}

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  async function signIn(token: string) {
    localStorage.setItem("token", token);
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    api.get<User>("/user").then((res) => {
      setUser(res.data);
    });
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      api.get<User>("/user").then((res) => {
        setUser(res.data);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signOut, signIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}
