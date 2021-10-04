import React from "react";
import { Home, ResultPage } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/result" component={ResultPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
