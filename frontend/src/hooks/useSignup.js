import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const handleInputError = ({ fullName, username, password, confirmPassword, gender }) => {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields!")
        return false
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match.")
        return false
    }

    if (password.length < 4) {
        toast.error("Passwords must be at least 4 characters.")
        return false
    }

    return true
}



const useSignup = () => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser} = useAuthContext();


    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputError({ fullName, username, password, confirmPassword, gender })
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({fullName,username,password,confirmPassword,gender})
            })


            const data = await res.json();
            if (data.error){
                throw new Error(data.error)
            }

            localStorage.setItem("phys-user",JSON.stringify(data))
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    }

    return { loading,signup}

}

export default useSignup
