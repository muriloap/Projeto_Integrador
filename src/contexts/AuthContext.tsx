"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "@/service/api";

type JwtPayload = {
  sub: string;
  name: string;
  email: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  groups: string[];
};

type AuthContextType = {
  user: User | null;
  login(email: string, password: string): Promise<void>;
  logout(): void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

type Props = {
  children: ReactNode;
};

export function AuthProvider(props: Props) {
  const [user, setUser] = useState<User | null>(null);

  function login(email: string, password: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.post("/users/login", {
          email,
          senha: password,
        });

        const token = res.data.token;
        localStorage.setItem("token", token);

        const me = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(me.data);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }


  function logout(): void {
    localStorage.removeItem("token");
    setUser(null);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api
      .get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
