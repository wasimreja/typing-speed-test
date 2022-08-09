import Nav from "./Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
