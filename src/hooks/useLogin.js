import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import axios from 'axios';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (userid, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BE_URL}/api/user/login`, {
                email: userid,
                password
            });

            const data = response.data;

            localStorage.setItem("user", JSON.stringify(data));
            dispatch({ type: "LOGIN", payload: data });
            setLoading(false);

        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return { login, loading, error };
};
