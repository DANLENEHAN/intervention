import { response } from "express";
import { UserInfo, userInfo } from "os";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


interface User {
  email: string,
  password: string,
  emailValid?: boolean,
  passwordValid?: boolean,
}


function App() {
  return (
      <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<NameForm email={''} password={''}/>} />
          </Routes>
      </Router>
  );
}


function Home() {
  return (
    <div>
      <h2>This is my Shitty Home page!</h2>
    </div>
  );
}

class NameForm extends React.Component<User, User>
{
  constructor(props: User) {
    super(props);
    this.state = {
      email: this.props.email,
      password: this.props.password,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(event: any) {
    this.setState({
      email: event.target.value,
    });
  }

  checkFormValidityAndSubmit() {
    let emailValid: boolean = false;
    let passwordValid: boolean = false;

    if (this.state.email.indexOf("@") === -1) {
      emailValid = false;
    } else {
      emailValid = true;
    }

    if (this.state.password.length < 15) {
      passwordValid = false;
    } else {
      passwordValid = true;
    }
    this.setState(
      {
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
      () => this.postAccountCreation()
    );
  }

  postAccountCreation() {
    if (
      this.state.emailValid &&
      this.state.passwordValid
    ) {
      this.createUserAttempt(this.state);
    }
  }

  createUserAttempt(state: User) {
    const createUserAttempt = {
      "email": state.email,
      "password": state.password,
      "username": "user".concat(state.email.split("@")[0]),
    }

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createUserAttempt)
    };
    fetch('http://127.0.0.1:5000/create_account', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  handlePasswordChange(event: any) {
    this.setState(
      {password: event.target.value
    });
  }

  render() {
    let errorMessages = [];
    if (this.state.emailValid === false) {
      errorMessages.push(<div className="margin-bottom" key={0}>EMAIL ERROR</div>);
    }
    if (this.state.passwordValid === false) {
      errorMessages.push(<div className="margin-bottom" key={1}>PASSWORD ERROR</div>);
    }

    return (
      <div className="flex-parent main-container">
        <div className="login-container">
          <div className="flex-parent flex-column">
            <span className="title margin-bottom">
              Create Account
            </span>
            <input 
              className="input margin-bottom"
              type="text"
              value={this.state.email}
              onChange={this.handleEmailChange}
              placeholder="email"
            />
            <input
              className="input margin-bottom"
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              placeholder="password"
            />
            <div
              className="margin-bottom button"
              onClick={() => this.checkFormValidityAndSubmit()}
            >
              Sign Up
            </div>
            {errorMessages}
          </div>
        </div>
      </div>
    );
  }
}

export default App