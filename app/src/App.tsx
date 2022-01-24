import { userInfo } from "os";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


interface User {
  email?: string;
  password?: string;
}


function App() {
  return (
      <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<NameForm/>} />
          </Routes>
      </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>This is my Shitty Home page!</h2>
    </div>
  );
}

class NameForm extends React.Component<
  User,
  User
> {
  constructor(props: User) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(event: any) {
    this.setState({
      email: event.target.value,
      password: event.target.password,
    });
  }

  handlePasswordChange(event: any) {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div className="flex-parent main-container">
        <div className="login-container">
          <div className="flex-parent flex-column">
            <span className="title margin-bottom">
              Login
            </span>
            <input 
              className="margin-bottom"
              type="text"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <input
              className="margin-bottom"
              type="text"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />

          <span className="title margin-bottom">
            Input data
          </span>
          <div className="Flex-parent">
            <div>Email: {this.state.email}</div>
            <div>Password: {this.state.password}</div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App