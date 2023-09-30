import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import TicketBooking from "./components/TicketBooking";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
  <Switch>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/movies">
      <Movies/>
    </Route>
    
  </Switch>
  </Router>
  )
}

export default App;
