import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();



    return (
        <header>
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-2">
                        <Link to="/">
                            <span><img src="/logo.png" alt="" /></span>
                        </Link>
                    </div>
                    <div className="col-4 text-end">
                        {user && (
                            <>
                                <span className="nav-logout">
                                    <button onClick={() => { logout() }}>Logout</button>
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;