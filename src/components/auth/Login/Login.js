import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom";
import './Login.css'

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  // const [verified, setVerified] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
          .then((data) => {
            const name = data.user.displayName;
            const loggedInUser = {
              name,
              uid: data.user.uid,
              email: data.user.email
            }
            emailRef.current.value = "";
            passwordRef.current.value = "";
            localStorage.setItem('user', JSON.stringify(loggedInUser));
          })


        history.push("/analysis")
      }
      catch {
        setError("Failed to login. Please check your password or username and try again")
      }
      setLoading(false)
      console.log(currentUser)
    }
    catch {
      setError("Failed to login. Please check your password or username and try again")
    }
    setLoading(false)
  }

  return (
    <div className="wrap">
      {/* <div className="bgImg">
        <img
          className="bg"
          src={require('./background.png')} />
      </div> */}
      <div className="content">
        <div className="content__container">
          <p className="content__container__text">
           Hello 
      </p>
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
            <Form.Control className="input" type="email" placeholder="Email Address" ref={emailRef} required></Form.Control>
          </Form.Group>

          <Form.Group id="password">
            <Form.Control className="input" type="password" placeholder="Password" ref={passwordRef} required></Form.Control>
          </Form.Group>

          <Button className="button" disabled={loading} type="submit">
            Let me in.
          </Button>
        </Form>
      </div>
        <div className="linktosignup">
          No account <Link to="/signup">Sign Up</Link>
        </div>
    </div>
  );
}

export default Login;