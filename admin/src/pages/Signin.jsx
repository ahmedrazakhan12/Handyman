import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error ,setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if(res.data.status === 200){
          navigate('/')
        }
        // console.log(res.data);
        localStorage.setItem("token", res.data.token);
        
      })
      .catch((err) => {
        console.log("Error Looged In User", err);
        setError(err.response.data.message); 


      });
  };
  return (
    <>
      <main className="main-content  mt-0">
        <section>
          <div className="page-header min-vh-75">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                  <div className="card card-plain mt-8">
                    <div className="card-header pb-0 text-left bg-transparent">
                      <h3 className="font-weight-bolder text-info text-gradient">
                        Welcome back
                      </h3>
                      <p className="mb-0">
                        Enter your email and password to sign in
                      </p>
                    </div>
                    <div className="card-body">
                      <form role="form" onSubmit={handleSubmit}>
                        <label>Email</label>
                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="email-addon"
                            onChange={handleChange}
                            name="email"
                            required
                          />
                        </div>
                        <label>Password</label>
                        <div className="mb-3">
                          <input
                            type="password"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Password"
                            aria-label="Password"
                            name="password"
                            aria-describedby="password-addon"
                            required
                          />
                        </div>
                        <div className="text-center">
                         
                          <label
                            className="form-check-label text-danger"
                            htmlFor="rememberMe"
                          >
                             {error && error}
                          </label>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn bg-gradient-info w-100 mt-2 mb-0"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                    <div
                      className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                      style={{
                        backgroundImage:
                          'url("../assets/img/curved-images/curved6.jpg")',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Signin;
