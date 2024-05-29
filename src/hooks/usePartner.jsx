import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";


const usePartner = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const {data: isPartner} = useQuery({
        queryKey: [user?.email, 'isPartner'],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/partner/${user.email}`);
            console.log(res.data)
            return res.data.partner;
        }
    })
    return [isPartner]
};

export default usePartner;