import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);
    const { signup, loading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = firstName + ' ' + lastName;
        await signup(name, userid, password, rePassword);
    };

    const handleToggleVisibility = (val) => {
        if (val) {
            setIsPasswordVisible(!isPasswordVisible);
        } else {
            setIsRePasswordVisible(!isRePasswordVisible);
        }
    };
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        {loading && (
                            <div className="loading-screen">
                                <h2>Signing up...</h2>
                            </div>
                        )}
                        {!loading && (
                            <form className="signup" onSubmit={handleSubmit}>
                                <h1>
                                    <span>Hi, </span>Buddy
                                </h1>
                                <p>Are you new here?</p>
                                <input
                                    type="text"
                                    placeholder="First name"
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                />

                                <input
                                    type="userid"
                                    placeholder="Email id"
                                    onChange={(e) => {
                                        setUserid(e.target.value);
                                    }}
                                />
                                <div className="password-field position-relative">
                                    <input
                                        type={isPasswordVisible ? "text" : "password"}
                                        placeholder="Password"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                    <p className="eye-toggle" onClick={() => { handleToggleVisibility('first') }}>
                                        <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                                    </p>
                                </div>

                                <div className="password-field position-relative">
                                    <input
                                        type={isRePasswordVisible ? "text" : "password"}
                                        placeholder="Re-enter password"
                                        onChange={(e) => {
                                            setRePassword(e.target.value);
                                        }}
                                    />
                                    <p className="eye-toggle" onClick={() => { handleToggleVisibility(null) }}>
                                        <FontAwesomeIcon icon={isRePasswordVisible ? faEyeSlash : faEye} />
                                    </p>
                                </div>
                                <div className="signup-btn text-center">
                                    <button disabled={loading}>Signup</button>

                                </div>
                                {error && <div className="error">{error}</div>}
                                <div className="to-login text-center">
                                    <p>Already have account?</p>
                                    <div className="login-link text-center">
                                        <Link to="/login">
                                            <button>Login</button>
                                        </Link>

                                    </div>
                                </div>
                            </form>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;