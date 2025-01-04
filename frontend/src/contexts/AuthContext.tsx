"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get("/auth/profile");
      
      if (response.data.user) {
        setUser(response.data.user);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        checkAuth();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/auth/login", { email, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        // Login response'dan gelen user bilgisini kullan
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          // Eğer login response'unda user bilgisi yoksa profile endpoint'inden al
          const profileResponse = await axios.get("/auth/profile");
          if (profileResponse.data.user) {
            setUser(profileResponse.data.user);
          }
        }
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(
        error.response?.data?.error || "An error occurred while logging in"
      );
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        // Register response'dan gelen user bilgisini kullan
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          // Eğer register response'unda user bilgisi yoksa profile endpoint'inden al
          const profileResponse = await axios.get("/auth/profile");
          if (profileResponse.data.user) {
            setUser(profileResponse.data.user);
          }
        }
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Register error:", error);
      throw new Error(
        error.response?.data?.error || "An error occurred while registering"
      );
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      setUser(null);
      router.push("/auth/signin");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
