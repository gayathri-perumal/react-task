import React, { Component } from "react";
import { FaUser, FaEnvelope, FaLock, FaTimes } from "react-icons/fa";
import firebase from "../../config/Fire";
import "./Signup.scss";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
  }

  signup(e) {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  userDetails() {}

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  confirmPwd() {}

  signupclose() {
    var close = document.getElementById("signupform");
    close.style.display = "none";
  }

  render() {
    return (
      <div className="signup-container">
        <form onSubmit={this.signup}>
          <div className="close">
            <FaTimes onClick={this.signupclose} />
          </div>
          <div className="input">
            <FaUser />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input">
            <FaLock />
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Passsword"
              onChange={this.confirmPwd}
              required
            />
          </div>
          <button onClick={this.userDetails} type="submit">
            Register
          </button>
        </form>
      </div>
    );
  }
}
export default Signup;