import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextType = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function signIn(credentials: SignInCredentials) {
    try {
      const response = await api.post("sessions", credentials);
      console.log(">[signIn] Data:", response.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.log("deu ruim", { err });
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
