import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavBar from './components/navBar/NavBar'
import Article from './components/articles/Article'
import './App.css'
import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))
function App() {
  const classes = useStyles()

  return (
    <>
      <Router>
        <Switch>
          <div>
            <NavBar />
            <div className={classes.offset} />
            <Route path='/' exact component={Article} />
          </div>
        </Switch>
      </Router>
    </>
  )
}

export default App
