import { createContext, ReactNode, useState } from "react";
import { useRouter } from "next/dist/client/router";
import nookies from "nookies";

import { api } from "../services/api";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SessionsResponse = User & {
  token: string;
  refreshToken: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextType = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  const router = useRouter();

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { data } = await api.post<SessionsResponse>("sessions", {
        email,
        password,
      });

      nookies.set(undefined, "@auth.token", data.token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      nookies.set(undefined, "@auth.refreshToken", data.refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser(data);
      router.push("dashboard");
    } catch (err) {
      console.log("deu ruim", { err });
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
