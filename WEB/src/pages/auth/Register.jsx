import { memo, useState, useCallback, useMemo } from "react";
import { IMG_APP } from "../../images";
import { registerMessage } from "../../utils/messages/authMessage";
import { useNavigate } from "react-router-dom";
import { validateEnum } from "../../utils/enum";
import { login, register } from "../../store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { ToastContainer } from "react-bootstrap";
import { showToastSuccess } from "../../utils/toast";
import "react-toastify/dist/ReactToastify.css";

export const Register = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [account, setAccount] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    citizenIdentification: "",
    email: "",
    location: "",
    password: "",
    rePassword: "",
  });

  const loading = useSelector((state) => state.auth.loading);
  const code = useSelector((state) => state.auth.code);
  const message = useSelector((state) => state.auth.message);

  const [error, setError] = useState({
    firstName: {
      isValidate: validateEnum.init,
      message: "",
    },
    lastName: {
      isValidate: validateEnum.init,
      message: "",
    },
    phoneNumber: {
      isValidate: validateEnum.init,
      message: "",
    },
    email: {
      isValidate: validateEnum.init,
      message: "",
    },
    citizenIdentification: {
      isValidate: validateEnum.init,
      message: "",
    },
    location: {
      isValidate: validateEnum.init,
      message: "",
    },
    password: {
      isValidate: validateEnum.init,
      message: "",
    },
    rePassword: {
      isValidate: validateEnum.init,
      message: "",
    },
  });

  const handleSetError = useCallback(
    (keyName, isValidate, message) => {
      setError((prev) => {
        return {
          ...prev,
          [keyName]: {
            isValidate: isValidate,
            message: message,
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

  const blurInputAccount = (keyName) => {
    return () => {
      if (!account[keyName]) {
        handleSetError(keyName, validateEnum.invalid, registerMessage.required);
        return;
      }
      if (keyName === "firstName" || keyName === "lastName") {
        const regex = /^[a-z ,.'-]+$/i;
        const invalid = regex.test(account[keyName]);
        if (!invalid) {
          handleSetError(
            keyName,
            validateEnum.invalid,
            registerMessage.invalid
          );
          return;
        }
      }
      if (keyName === "phoneNumber") {
        const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        const invalid = regex.test(account["phoneNumber"]);
        if (!invalid) {
          handleSetError(
            keyName,
            validateEnum.invalid,
            registerMessage.invalid
          );
          return;
        }
      }
      // if (keyName === "password") {
      //     const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      //     const invalid = regex.test(account["password"]);

      //     if (!invalid && account["password"] !== "") {
      //         handleSetError(
      //             keyName,
      //             validateEnum.invalid,
      //             registerMessage.invalidPassword
      //         );
      //         return;
      //     }
      //     if (account["password"] === account["rePassword"]) {
      //         handleSetError("rePassword", validateEnum.valid, "");
      //     }
      // }
      if (keyName === "rePassword") {
        if (account["password"] !== account["rePassword"]) {
          handleSetError(
            keyName,
            validateEnum.invalid,
            registerMessage.notMatch
          );
          return;
        }
      }

      handleSetError(keyName, validateEnum.valid, "");
    };
  };

  const submit = useCallback(() => {
    // const validate = Object.keys(error).every((key) => {
    //   return error[key].isValidate === validateEnum.valid;
    // });

    const validate = true;
    console.log(account);

    if (validate) {
      showToastSuccess("register success !");
      // setTimeout(() => {
      //   navigate("/auth/login");
      // }, 3000);

      dispatch(register(account))
        .then(unwrapResult)
        .then((res) => {
          showToastSuccess("register success !");

          setTimeout(() => {
            navigate("/auth/login");
          }, 3000);
        });

    } else {
      Object.keys(error).forEach((key) => {
        if (error[key].isValidate === validateEnum.init) {
          handleSetError(key, validateEnum.invalid, registerMessage.required);
        }
      });
    }
  }, [account, error]);

  return (
    <div className="auth">
      <div className="form-auth">
        <img src={IMG_APP} className="img-logo" />
        {code !== 200 && (
          <div className="error-auth text-center">{message}</div>
        )}
        <div className="row">
          <div className="form-group col-6">
            <label htmlFor="ip-fn">First name</label>
            <input
              type="text"
              className={`form-control my-2 ${
                error.firstName.isValidate === validateEnum.valid
                  ? "is-valid"
                  : ""
              }`}
              id="ip-fn"
              placeholder="first name"
              value={account.firstName}
              onChange={changeInputAccount("firstName")}
              onBlur={blurInputAccount("firstName")}
              required
            />
            <div className="valid-feedback">OK</div>
            <div className="invalid-feedback">{error.firstName.message}</div>
          </div>
          <div className="form-group col-6">
            <label htmlFor="ip-ln">Last name</label>
            <input
              type="text"
              className={`form-control my-2 ${
                error.lastName.isValidate === validateEnum.valid
                  ? "is-valid"
                  : error.lastName.isValidate === validateEnum.invalid
                  ? ""
                  : ""
              }`}
              id="ip-ln"
              placeholder="last name"
              value={account.lastName}
              onChange={changeInputAccount("lastName")}
              onBlur={blurInputAccount("lastName")}
              required
            />
            <div className="valid-feedback">OK</div>
            <div className="invalid-feedback">{error.lastName.message}</div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="ip-user">Phone number</label>
          <input
            type="text"
            className={`form-control my-2 ${
              error.phoneNumber.isValidate === validateEnum.valid
                ? "is-valid"
                : error.phoneNumber.isValidate === validateEnum.invalid
                ? "is-invalid"
                : ""
            }`}
            id="ip-user"
            placeholder="phone number"
            value={account.phoneNumber}
            onChange={changeInputAccount("phoneNumber")}
            onBlur={blurInputAccount("phoneNumber")}
            required
          />
          <div className="valid-feedback">OK</div>
          <div className="invalid-feedback">{error.phoneNumber.message}</div>
        </div>

        <div className="form-group">
          <label htmlFor="ip-user">Email</label>
          <input
            type="text"
            className={`form-control my-2 ${
              error.email.isValidate === validateEnum.valid
                ? "is-valid"
                : ""
            }`}
            id="ip-user"
            placeholder="Citizen Identification"
            value={account.email}
            onChange={changeInputAccount("email")}
            onBlur={blurInputAccount("email")}
            required
          />
          <div className="valid-feedback">OK</div>
          <div className="invalid-feedback">
            {error.citizenIdentification.message}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ip-user">Citizen Identification</label>
          <input
            type="text"
            className={`form-control my-2 ${
              error.citizenIdentification.isValidate === validateEnum.valid
                ? "is-valid"
                : ""
            }`}
            id="ip-user"
            placeholder="Citizen Identification"
            value={account.citizenIdentification}
            onChange={changeInputAccount("citizenIdentification")}
            onBlur={blurInputAccount("citizenIdentification")}
            required
          />
          <div className="valid-feedback">OK</div>
          <div className="invalid-feedback">
            {error.citizenIdentification.message}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ip-user">Location</label>
          <input
            type="text"
            className={`form-control my-2 ${
              error.location.isValidate === validateEnum.valid ? "is-valid" : ""
            }`}
            id="ip-user"
            placeholder="Location"
            value={account.location}
            onChange={changeInputAccount("location")}
            onBlur={blurInputAccount("location")}
            required
          />
          <div className="valid-feedback">OK</div>
          <div className="invalid-feedback">{error.location.message}</div>
        </div>

        <div className="form-group">
          <label htmlFor="ip-pw">Password</label>
          <input
            type="password"
            className={`form-control my-2 ${
              error.password.isValidate === validateEnum.valid
                ? "is-valid"
                : error.password.isValidate === validateEnum.invalid
                ? "is-invalid"
                : ""
            }`}
            id="ip-pw"
            placeholder="password"
            value={account.password}
            onChange={changeInputAccount("password")}
            onBlur={blurInputAccount("password")}
            required
          />
          <div className="valid-feedback">OK</div>
          <div className="invalid-feedback">{error.password.message}</div>
        </div>
        <div className="form-group">
          <label htmlFor="ip-pw">Re password</label>
          <input
            type="password"
            className={`form-control my-2 ${
              error.rePassword.isValidate == validateEnum.valid
                ? "is-valid"
                : error.rePassword.isValidate == validateEnum.invalid
                ? "is-invalid"
                : ""
            }`}
            id="ip-pw"
            placeholder="re-password"
            value={account.rePassword}
            onChange={changeInputAccount("rePassword")}
            onBlur={blurInputAccount("rePassword")}
            required
          />
          <div className="valid-feedback">OK</div>
          <div className="invalid-feedback">{error.rePassword.message}</div>
        </div>
        <a href="/auth/login">Have you an account ?</a>
        <button className="btn btn-primary form-control my-2" onClick={submit}>
          {loading && (
            <span
              className="spinner-border spinner-border-sm "
              role="status"
            ></span>
          )}
          <span className="sr-only" style={{ marginLeft: "10px" }}>
            Register
          </span>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
});
