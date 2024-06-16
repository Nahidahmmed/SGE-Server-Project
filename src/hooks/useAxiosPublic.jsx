import axios from "axios"

const axiosPublic = axios.create({
    baseURL: 'https://sge-project-server.vercel.app'
})

export default function useAxiosPublic() {
  return axiosPublic;
}
