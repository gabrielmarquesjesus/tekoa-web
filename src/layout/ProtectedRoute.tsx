import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerifyAuth } from "../features/auth/services/LoginService";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await VerifyAuth();
      setIsAuthenticated(auth);
      if (!auth) navigate("/login", { replace: true });
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-screen bg-white text-gray-500">
        <div className="w-6 h-6 border-2 border-[#52733F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
