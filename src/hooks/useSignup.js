import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import axios from 'axios';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (name, userid, password, repassword) => {
        if (password !== repassword) {
            setError("Passwords do not match");
        } else {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.post('http://localhost:4000/api/user/signup/', {
                    name,
                    email: userid,
                    password
                });

                const json = response.data;

                if (response.status === 200) {
                    localStorage.setItem("user", JSON.stringify(json));
                    dispatch({ type: "LOGIN", payload: json });
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                if (error.response && error.response.data) {
                    setError(error.response.data.error);
                } else {
                    setError("An error occurred. Please try again.");
                }
            }
        }
    };

    return { signup, loading, error };
};
