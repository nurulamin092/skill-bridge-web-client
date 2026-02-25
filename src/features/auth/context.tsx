"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthSession } from "./types/auth.types";
import { getSession } from "./services/session.service";

interface AuthContextType {
  session: AuthSession | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    const data = await getSession();
    setSession(data);
  }

  useEffect(() => {
    let mounted = true;

    async function init() {
      const data = await getSession();
      if (mounted) {
        setSession(data);
        setLoading(false);
      }
    }
    init();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
