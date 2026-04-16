import { memo, useCallback, useEffect, useMemo } from "react";
import { IMG_APP, IMG_BANNER } from "../images";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { storage1 } from "../service/storage";

export const Header = memo(() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lastName = useSelector((state) => state.auth.user.lastName);
    const isAuthenticate = !!storage1.getItem("token");
    console.log("isAuthenticate" + isAuthenticate)
    const handleLogout = useCallback(() => {
        logout();
        window.location.reload();
    }, []);

    const redirect = (path) => {
        return () => navigate(path);
    };
    return (
        <div className="header">
            <img src={IMG_BANNER} alt="notfound" className="img-banner" />
            <div className="options">
                <a href="/index">
                    <img src={IMG_APP} alt="notfound" className="img-logo" />
                </a>
                <div className="d-flex align-items-center d-flex justify-content-between flex-grow-1 px-3">
                    <div className="options-left d-flex">
                        <button
                            className="btn btn-outline-secondary mx-2"
                            onClick={redirect("/index")}
                        >
                            Home
                        </button>
                        
                        {/* <button
                            className="btn btn-outline-secondary mx-2"
                            onClick={redirect("/post")}
                        >
                            Post
                        </button> */}
                        {isAuthenticate ? (
                            <button
                            className="btn btn-outline-secondary mx-2"
                            onClick={redirect("/post")}
                        >
                            Post
                        </button>
                        ):(
                            <div></div>
                        )}
                        {/* <button
                            className="btn btn-outline-secondary mx-2"
                            onClick={redirect("/chatbot")}
                        >
                            Chatbot
                        </button> */}
                        {/* <button
                            className="btn btn-outline-secondary mx-2"
                            onClick={redirect("/message")}
                        >
                            Message
                        </button> */}
                    </div>
                    {isAuthenticate ? (
                        <div className="options-right d-flex ">
                            (
                            <div className="avatar d-flex justify-content-center align-content-center">
                                <p>{lastName[0]}</p>
                            </div>
                            <button
                                className="btn btn-outline-secondary mx-2"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                            )
                        </div>
                    ) : (
                        <div className="options-right d-flex ">
                            (
                            <button
                                className="btn btn-outline-secondary mx-2"
                                onClick={redirect("/auth/login")}
                            >
                                Login
                            </button>
                            <button
                                className="btn btn-outline-secondary mx-2"
                                onClick={redirect("/auth/register")}
                            >
                                Register
                            </button>
                            )
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});
