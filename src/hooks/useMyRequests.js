import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useMyRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: myRequests = [], isLoading } = useQuery({
    queryKey: ["myRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-requests?email=${user.email}`);
      return res.data;
    },
  });

  return { myRequests, isLoading };
};

export default useMyRequests;
