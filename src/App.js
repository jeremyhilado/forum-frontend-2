import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useGlobalLoginState } from "./api";
import { Login } from "./views/Login";
import { About } from "./views/About";
const { ViewThread } = require("./views/ViewThread");
const { ThreadList } = require("./views/ThreadList");

function App() {
  const [{ username, loggedIn }, usernameActions] = useGlobalLoginState();

  let headerItems = [];
  headerItems.push(<Link to="/threads">All threads</Link>);
  headerItems.push(<Link to="/about">About</Link>);
  if (loggedIn) {
    headerItems.push(
      <>
        Welcome, {username}(
        <button
          className="likeLink"
          onClick={e => {
            e.preventDefault();
            usernameActions.logout();
          }}
        >
          Log out
        </button>
        )
      </>
    );
  } else {
    headerItems.push(<Link to="/login">Log in</Link>);
  }

  return (
    <div className="App">
      <Router>
        <div className="App-header">
          {headerItems.map((item, index) => (
            <span className="App-header-item" key={index}>
              {item}
            </span>
          ))}
        </div>
        <Route path="/thread/:threadId" component={ViewThread} />
        <Route path="/about" component={About} />
        <Route path="/threads" component={ThreadList} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={ThreadList}/>
      </Router>
    </div>
  );
}

export default App;
