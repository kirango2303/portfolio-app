import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "../../../services/firebase";
import "../Login/Login.css";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      let result = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      await result.user.updateProfile({
        displayName: firstNameRef.current.value,
      });
      const verified = await result.user.sendEmailVerification();
      console.log(verified);
      await db.collection("users").add({
        email: emailRef.current.value,
        name: firstNameRef.current.value,
        uid: result.user.uid,
        buying_power: 100000,
        cash: 100000,
        total_value: 100000,
        long_stock: 0,
        num_stocks: 0,
        stocks: [],
        bookmarked: [],
      });
      const loggedInUser = {
        name: firstNameRef.current.value,
        uid: result.user.uid,
        email: result.user.email,
      };
      await localStorage.setItem("user", JSON.stringify(loggedInUser));
      // console.log("log in successfully")
      history.push("/");
    } catch {
      setError(
        "Failed to create an account. Password must be at least 6 characters or username already existed"
      );
    }
    console.log(currentUser);
    setLoading(false);
  }
  return (
    <div className="wrap">
      <div className="content">
        <div className="content__container">
          <p className="content__container__text">Hello</p>

          <ul className="content__container__list">
            <li className="content__container__list__item">newbies !</li>
            <li className="content__container__list__item">investors !</li>
            <li className="content__container__list__item">analysts !</li>
            <li className="content__container__list__item">everybody !</li>
          </ul>
        </div>
      </div>
      {/* <div className="title">
        <h2>Sign up</h2>
      </div> */}
      <div className="login">
        {error && <div className="error">{error}</div>}

        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group id="first-name">
            <Form.Control
              type="first-name"
              className="input"
              placeholder="Username"
              ref={firstNameRef}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="email">
            <Form.Control
              type="email"
              className="input"
              placeholder="Email Address"
              ref={emailRef}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group id="password">
            <Form.Control
              type="password"
              className="input"
              placeholder="Password"
              ref={passwordRef}
              required
            ></Form.Control>
          </Form.Group>

          <Button disabled={loading} className="button-login" type="submit">
            Sign Up
          </Button>
        </Form>
        <div className="linktosignup">
          Already an user?{" "}
          <Link className="link" to="/login">
            LOG IN.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
