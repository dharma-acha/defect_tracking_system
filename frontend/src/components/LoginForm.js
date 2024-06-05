import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import config from "../config.json";

function LoginForm() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      dispatch({ type: "SETSPINNER", data: { display: true } });
      axios
        .post(`${config.BE_SERVER_URL}users/login`, inputs)
        .then((res) => {
          if (res.data.success) {
            let user = res.data.loggedindata;
            setErrors({});
            dispatch({
              type: "SETAUTHTOKEN",
              data: {
                email: user.email,
                username: user.username,
                role: user.role,
                _id: user._id,
                project: user.project,
              },
            });
            dispatch({ type: "SETSPINNER", data: { display: false } });
          } else {
            setErrors(res.data.errors);
            dispatch({ type: "SETSPINNER", data: { display: false } });
          }
        })
        .catch((err) => {
          dispatch({ type: "SETSPINNER", data: { display: false } });
          toast.warning(err.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
          });
        });
    }
  };
  const validateEmail = () => {
    let error = "";
    if (!inputs["email"].length) {
      error = "Please enter your email address.";
    } else {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(inputs["email"])) {
        error = "Please enter valid email address.";
      }
    }
    setErrors((val) => ({ ...val, email: error }));
  };

  const validatePassword = () => {
    let error = "";
    if (!inputs["password"].length) {
      error = "Please enter your password";
    } else {
      if (inputs["password"].length < 6) {
        error = "Password should be atleast 6 characters";
      }
    }
    setErrors((val) => ({ ...val, password: error }));
  };

  const validate = () => {
    let isValid = true;
    let error = {};

    if (!inputs["email"].length) {
      isValid = false;
      error["email"] = "Please enter your email address";
    } else {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(inputs["email"])) {
        isValid = false;
        error["email"] = "Please enter valid email address";
      }
    }

    if (!inputs["password"]) {
      isValid = false;
      error["password"] = "Please enter your password";
    } else {
      if (inputs["password"].length < 6) {
        isValid = false;
        error["password"] = "Password should be atleast 6 characters";
      }
    }

    setErrors(error);

    return isValid;
  };

  return (
    <>
      <div>
        <form className="form formlogin card" onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <h3 className="d-flex justify-content-center">LOGIN</h3>
          </div>

          <div className="form-group">
            <label for="email">
              <b>Email Address</b> <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="email"
              value={inputs.email}
              onBlur={validateEmail}
              onChange={handleChange}
              class="form-control"
              placeholder="Enter email"
              id="email"
            />

            <div className="text-danger">{errors.email}</div>
          </div>

          <div class="form-group">
            <label for="password">
              <b>Password </b>
              <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onBlur={validatePassword}
              onChange={handleChange}
              class="form-control"
              placeholder="Enter password"
              id="password"
            />

            <div className="text-danger">{errors.password}</div>
          </div>

          <div class="form-group d-flex justify-content-between align-items-center">
            <input class="btn logbutton" type="submit" value="Login" />

            <Link
              style={{ color: "blue" }}
              className="forgot"
              to="/forgotpassword"
            >
              <h6 style={{ margin: "0px" }}>
                <small>Forgot Password ?</small>
              </h6>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
