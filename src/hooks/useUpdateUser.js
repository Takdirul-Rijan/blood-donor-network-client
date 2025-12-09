import React from "react";

import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUpdateUser = () => {
  const axiosSecure = useAxiosSecure();

  const mutation = useMutation({
    mutationFn: async (updatedInfo) => {
      const res = await axiosSecure.patch("/update-user", updatedInfo);
      return res.data;
    },
  });

  return mutation;
};

export default useUpdateUser;
