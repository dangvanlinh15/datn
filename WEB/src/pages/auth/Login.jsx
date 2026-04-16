import { memo, useCallback, useEffect, useState } from "react";
import { IMG_APP } from "../../images";
import { loginMessage } from "../../utils/messages/authMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slice/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { validateEnum } from "../../utils/enum";
import { showToastSuccess } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = memo(() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [account, setAccount] = useState({
        phoneNumber: "",
        password: "",
    });

    const [error, setError] = useState({
        phoneNumber: {
            isValidate: validateEnum.init,
            message: "",
        },
        password: {
            isValidate: validateEnum.init,
            message: "",
        },
    });
    const loading = useSelector((state) => state.auth.loading);
    // const code = useSelector((state) => state.auth.code);
    const [code, setCode] = useState(0);

    const handleSetError = useCallback(
        (keyName, valIsError, valMessage) => {
            setError((prev) => {
                return {
                    ...prev,
                    [keyName]: {
                        isError: valIsError,
                        message: valMessage,
                    },
                };
            });
        },
        [account, error]
    );

    const changeInputAccount = useCallback(
        (keyName) => {
            return (event) => {
                setAccount((prev) => {
                    return {
                        ...prev,
                        [keyName]: event.target.value,
                    };
                });
            };
        },
        [account, error]
    );

    const submit = useCallback(() => {
        // const validate = Object.keys(error).every((key) => {
        //     return error[key].isError === validateEnum.valid;
        // });
        const validate = true;
        if (validate) {
            dispatch(login(account))
                .then((res) => {
                    if (res.payload === '') {
                        // showToastSuccess("login fail !");
                        setCode(404)
                    } else {
                        showToastSuccess("login success !");
                        console.log(res)
                        setTimeout(() => {
                            navigate("/home");
                        }, 3000);
                    }


                });
        } else {
            Object.keys(error).forEach((key) => {
                if (error[key].isValidate === validateEnum.init) {
                    handleSetError(
                        key,
                        validateEnum.invalid,
                        loginMessage.required
                    );
                }
            });
        }
    }, [account, error]);

    const blurInputAccount = (keyName) => {
        return () => {
            if (!account[keyName]) {
                handleSetError(
                    keyName,
                    validateEnum.invalid,
                    loginMessage.required
                );
                return;
            }
            if (keyName == "phoneNumber") {
                const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
                const invalid = regex.test(account["phoneNumber"]);
                if (!invalid) {
                    handleSetError(
                        keyName,
                        validateEnum.invalid,
                        loginMessage.invalid
                    );
                    return;
                }
            }
            // if (keyName == "password") {
            //     const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            //     const invalid = regex.test(account["password"]);
            //     if (!invalid) {
            //         handleSetError(
            //             keyName,
            //             validateEnum.invalid,
            //             loginMessage.invalidPassword
            //         );
            //         return;
            //     }
            // }
            handleSetError(keyName, validateEnum.valid, "");
        };
    };

    return (
        <div className="auth">
            <div className="form-auth">
                <img src={IMG_APP} className="img-logo" />
                {code === 404 && (
                    <div className="error-auth text-center">
                        phonenumber or password incorrect
                    </div>
                )}
                <div className="error-auth"></div>
                <div className="form-group">
                    <label htmlFor="ip-pn">Phonenumber</label>
                    <input
                        type="text"
                        className={`form-control my-2 ${error.phoneNumber.isError == validateEnum.valid
                            ? "is-valid"
                            : error.phoneNumber.isError ==
                                validateEnum.invalid
                                ? "is-invalid"
                                : ""
                            }`}
                        id="ip-pn"
                        placeholder="phonenumber"
                        onChange={changeInputAccount("phoneNumber")}
                        value={account.phoneNumber}
                        onBlur={blurInputAccount("phoneNumber")}
                    />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">
                        {error.phoneNumber.message}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="ip-pw">Password</label>
                    <input
                        type="password"
                        className={`form-control my-2 ${error.password.isError == validateEnum.valid
                            ? "is-valid"
                            : error.password.isError == validateEnum.invalid
                                ? "is-invalid"
                                : ""
                            }`}
                        id="ip-pw"
                        placeholder="Password"
                        onChange={changeInputAccount("password")}
                        value={account.password}
                        onBlur={blurInputAccount("password")}
                    />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">
                        {error.password.message}
                    </div>
                </div>
                <a href="/auth/register">Haven't you an account ?</a>
                <button
                    className="btn btn-primary form-control my-2"
                    onClick={submit}
                >
                    {loading && (
                        <span
                            className="spinner-border spinner-border-sm "
                            role="status"
                        ></span>
                    )}
                    <span className="sr-only" style={{ marginLeft: "10px" }}>
                        Login
                    </span>
                </button>
            </div>
            <ToastContainer />
        </div>
    );
});
