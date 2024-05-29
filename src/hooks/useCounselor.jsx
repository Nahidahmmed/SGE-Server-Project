import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosSecure from "./useAxiosSecure";


const useCounselor = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const {data: isCounselor} = useQuery({
        queryKey: [user?.email, 'isCounselor'],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/counselor/${user.email}`);
            console.log(res.data)
            return res.data.counselor;
        }
    })
    return [isCounselor]
};

export default useCounselor;