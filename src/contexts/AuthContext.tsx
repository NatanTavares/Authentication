import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/dist/client/router";

import { api } from "../services/apiClient";

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

export function signOut() {
  destroyCookie(undefined, "@auth.token");
  destroyCookie(undefined, "@auth.refreshToken");

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { data } = await api.post<SessionsResponse>("sessions", {
        email,
        password,
      });

      setCookie(undefined, "@auth.token", data.token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setCookie(undefined, "@auth.refreshToken", data.refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser(data);
      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

      Router.push("dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    try {
      const { "@auth.token": token } = parseCookies();
      if (token) {
        api
          .get<User>("me")
          .then((response) => {
            const { email, permissions, roles } = response.data;
            setUser({ email, permissions, roles });
          })
          .catch(() => {
            signOut();
          });
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
