// src/hooks/useStudentData.js
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';


const useStudentData = (id) => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['student', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/students/${id}`);
      return res.data;
    },
    enabled: !!id, // Ensures the query is not executed until the id is available
  });

  return { data, isLoading, error, refetch };
};

export default useStudentData;
