import { FaUser } from "react-icons/fa";

export default function ApplicationInfo() {
  return (
    <div>
         <h2 className="text-2xl font-bold ml-5">Dashboard</h2>
         <div className="w-full flex">
            <div>
                <p><FaUser/> New Application</p>
                <p>54</p>
                <p>2.7% increase</p>
            </div>
            
            
         </div>
    </div>
  )
}
