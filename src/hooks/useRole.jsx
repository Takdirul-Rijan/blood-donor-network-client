import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("donor");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/users/role/${encodeURIComponent(user.email)}`,
      )
      .then((res) => {
        if (res.data?.role) setRole(res.data.role);
      })
      .catch((err) => {
        console.warn("Failed to fetch role, keeping previous role", err);
      })
      .finally(() => setLoading(false));
  }, [user?.email]);

  return { role, loading };
};

export default useRole;
