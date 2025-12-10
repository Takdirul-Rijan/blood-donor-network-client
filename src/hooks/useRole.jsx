import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setRole(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_API_URL}/users/role/${user.email}`)
      .then((res) => {
        setRole(res.data?.role || "donor");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching role:", err);
        setRole(null);
        setLoading(false);
      });
  }, [user?.email]);

  return { role, loading };
};

export default useRole;
