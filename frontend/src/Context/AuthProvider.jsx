
import api from "../api/axios.js";
import { useState } from "react";
import { useEffect } from "react";
import AuthContext from "./AuthContext.js";
import { useCallback } from "react";

const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await api.get("/user/profile");
      setUser(res.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
      }

      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
