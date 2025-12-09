import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchRole = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${encodeURIComponent(
            user.email.toLowerCase()
          )}/role`
        );
        setRole(res.data.role);
      } catch (err) {
        console.error("Error fetching role:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [user?.email]);

  return { role, loading };
};

export default useRole;
