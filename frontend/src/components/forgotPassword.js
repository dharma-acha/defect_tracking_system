import LoginHeader from "./LoginHeader";
import { Card, Button, Col } from "react-bootstrap";
// import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import config from "../config.json";

export default function ForgotPassword() {
  const [inputs, setInputs] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  // const selectauthToken = (rootstate) => rootstate.authToken
  // const authToken = useSelector(selectauthToken)

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
        .post(`${config.BE_SERVER_URL}users/forgotpassword`, inputs)
        .then((res) => {
          dispatch({ type: "SETSPINNER", data: { display: false } });
          if (res.data.success) {
            setErrors({});
            toast.success(res.data.message, {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 3000,
            });
          } else {
            setErrors(res.data.errors);
            toast.warning(res.data.errors.email, {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 3000,
            });
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
    if (!inputs["email"]) {
      error = "Please enter the email address";
    } else {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(inputs["email"])) {
        error = "Please enter valid email address";
      }
    }
    setErrors((val) => ({ ...val, email: error }));
  };

  const validate = () => {
    let isValid = true;

    let error = {};

    if (!inputs["email"]) {
      error["email"] = "Please enter your email address";
      isValid = false;
    } else {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(inputs["email"])) {
        error["email"] = "Please enter valid email address";
        isValid = false;
      }
    }
    setErrors(error);
    return isValid;
  };
  return (
    <>
      <LoginHeader />
      <div className="d-flex justify-content-center mt-5 row">
        <Col xs={10} sm={8} md={6} lg={4}>
          <Card
            style={{
              border: "1px solid slateblue",
              boxShadow: "3px 6px 6px slateblue",
            }}
          >
            <Card.Body>
              <Card.Title>
                <b className="d-flex justify-content-center">Reset Password</b>
              </Card.Title>
              <Card.Text className="mt-3">
                <form className="form">
                  <div className="form-group">
                    <label for="email">
                      <b>Email Address</b>{" "}
                      <span className="text-danger">*</span>
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
                </form>
              </Card.Text>
              <div class="form-group d-flex justify-content-between align-items-center">
                <Button
                  style={{ backgroundColor: "slateblue", border: "none" }}
                  onClick={handleSubmit}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>

                <Link to="/">
                  <h6 style={{ margin: "0px", color: "slateblue" }}>
                    <i
                      style={{ fontSize: "150%" }}
                      class="bi bi-arrow-left-circle-fill"
                    ></i>
                    Back to login
                  </h6>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  );
}
