import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import NavBar from "./components/navBar/NavBar"
import Article from "./components/articles/Article"
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <div>
            <NavBar />
            <Route path="/" exact component={Article} />
          </div>

        </Switch>
      </Router>
    </>
  );
}

export default App;
