import { response } from "express";
import { userInfo } from "os";
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
      // Simple POST request with a JSON body using fetch
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state)
      };
      fetch('http://192.168.1.101:5000', requestOptions)
          .then((response) => console.log(response.json()));
    }
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