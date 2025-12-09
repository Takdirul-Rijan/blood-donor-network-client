import React from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["singleUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  return { userData, isLoading };
};

export default useUser;
