import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";


const useFetchData = () => {
  
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {refetch,data: students = [],isLoading} = useQuery({
      queryKey: ['students'],
      queryFn: async () =>{
        const res = await axiosSecure.get(`/students?email=${user?.email}`)
        return res.data;
      }
  })
  return [students,refetch,isLoading]

};

export default useFetchData;
