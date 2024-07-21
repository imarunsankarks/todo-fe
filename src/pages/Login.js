import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { login, loading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(userid, password);
    };

    const handleToggleVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        {loading && (
                            <div className="loading-screen">
                                <h2>Logging in...</h2>
                            </div>
                        )}
                        {!loading && (
                            <form className="login" onSubmit={handleSubmit}>
                                <h1>
                                    <span>Hi, </span>Buddy
                                </h1>
                                <p>Enter your credentials</p>
                                <input
                                    type="userid"
                                    placeholder="Email id"
                                    onChange={(e) => {
                                        setUserid(e.target.value);
                                    }}
                                    value={userid}
                                />
                                <div className="password-field position-relative">
                                    <input
                                        type={isPasswordVisible ? "text" : "password"}
                                        placeholder="Password"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        value={password}
                                    />
                                    <p className="eye-toggle" onClick={handleToggleVisibility}>
                                        <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                                    </p>
                                </div>
                                <div className="login-btn text-center">
                                    <button disabled={loading}>Login</button>

                                </div>
                                {error && <div className="error">{error}</div>}
                                <div className="to-signup text-center">
                                    <p>Are you new here?</p>
                                    <div className="signup-link text-center">
                                        <Link to="/signup">
                                            <button>SignUp</button>
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

export default Login;