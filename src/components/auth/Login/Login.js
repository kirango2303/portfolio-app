import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faKey} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [verified, setVerified] = useState(false)
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      try {
        setError("");
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value).then(
          (data) => {
            const name = data.user.displayName;
            const loggedInUser = {
              name,
              uid: data.user.uid,
              email: data.user.email,
            };
            emailRef.current.value = "";
            passwordRef.current.value = "";
            localStorage.setItem("user", JSON.stringify(loggedInUser));
          }
        );

        history.push("/analysis");
      } catch {
        setError(
          "Failed to login. Please check your password or username and try again"
        );
      }
      setLoading(false);
      console.log(currentUser);
    } catch {
      setError(
        "Failed to login. Please check your password or username and try again"
      );
    }
    setLoading(false);
  }

  return (
    <div className="wrap">
      {/* <div className="row">
        <div className="col-lg-3 col-md-2" />
        <div className="col-lg-6 col-md-8 login-box">
          <div className="col-lg-12 login-key">
          <div className="icon"><FontAwesomeIcon style ={{fontSize: 35}} icon={faKey} /></div>
          </div>
          <div className="col-lg-12 login-title">
            ADMIN PANEL
          </div>
          <div className="col-lg-12 login-form">
            <div className="col-lg-12 login-form">
              <Form className="form" onSubmit={handleSubmit}>
                <Form.Group className="form-group">
                  <Form.Label className="form-control-label" >EMAIL ADDRESS</Form.Label>
                  <Form.Control type="email" className="form-control" ref={emailRef} required/>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label className="form-control-label">PASSWORD</Form.Label>
                  <Form.Control className="form-control-label" type="password"  ref={passwordRef} required/>
                </Form.Group>
                <div className="col-lg-12 loginbttm">
                <div >
                    {error && <div className="col-lg-6 login-btm login-text">{error}</div>}
                  </div>
                  <div className="col-lg-6 login-btm login-button">
                <Button className="btn btn-outline-primary" disabled={loading} type="submit">
                  LOG IN
                </Button>
                </div>
                </div>
              </Form>
            </div>
          </div>
          <div className="col-lg-3 col-md-2" />
        </div>
      </div> */}
      <div className="content">
        <div className="content__container">
          <p className="content__container__text">Hello</p>
          <ul className="content__container__list">
            <li className="content__container__list__item"> learners !</li>
            <li className="content__container__list__item"> analysts !</li>
            <li className="content__container__list__item">investors !</li>
            <li className="content__container__list__item">everybody !</li>
          </ul>
        </div>
      </div>
      <div className="title">
        <h2>Sign in</h2>
      </div>

      <div className="login">
        {error && <div className="error">{error}</div>}

        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Control
              className="input"
              type="email"
              placeholder="Email Address"
              ref={emailRef}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group id="password">
            <Form.Control
              className="input"
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            ></Form.Control>
          </Form.Group>

          <Button className="button" disabled={loading} type="submit">
            Let me in.
          </Button>
        </Form>
        <div className="linktosignup">
          New to this website? <Link to="/signup">SIGN UP.</Link>
        </div>
      </div> 

    </div>
  );
};

export default Login;
