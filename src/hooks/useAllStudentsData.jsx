import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllStudentsData = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: allStudents = [], isLoading } = useQuery({
    queryKey: ['allStudents'],
    queryFn: async () => {
      const res = await axiosSecure.get('/Allstudents');
      return res.data;
    },
  });

  // Exporting a named refetch function
  const allStudentRefetch = refetch;

  return { allStudents, allStudentRefetch, isLoading };
};

export default useAllStudentsData;
