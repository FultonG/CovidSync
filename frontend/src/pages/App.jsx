import React from 'react';
import Test from './Stats';
import TestingCenters from './TestingCenters';
import Signup from './Signup';
import Login from './Login';
import JobList from './Jobs/JobList';
import FAQ from './FAQ';
import Home from './Home';
import { Nav } from '../components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateJobs from './Jobs/CreateJob';
import translate from '../utils/translate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        isLoggedIn: false,
      },
      currentLang: {"code":"en","name":"English","nativeName":"English"}
    }
  }

  async componentDidMount() {
    let user = localStorage.getItem('user')
    if(user){
      this.setState(previous => ({...previous, user: JSON.parse(user)}));
    }
  }

  setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    this.setState(previous => ({...previous, user}))
  }

  signOut = () => {
    localStorage.removeItem('user');
    this.setState(previous => ({...previous, user: {isLoggedIn: false}}))
  }

  handleLanguageChange = (value) => {
    translate.setTarget(value.code)
    this.setState(prev => ({...prev, currentLang: value}))
  }

  render() {
    return (
      <Router>
        <Nav user={this.state.user} signOut={this.signOut} lang={this.state.currentLang} changeLanguage={this.handleLanguageChange}/>
        <Switch>
          <Route path="/stats">
            <Test />
          </Route>
          <Route path="/testingcenters">
            <TestingCenters />
          </Route>
          <Route path="/login">
            <Login setUser={this.setUser}/>
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route exact path="/jobs">
            <JobList lang={this.state.currentLang}/>
          </Route>
          <Route exact path="/jobs/create">
            <CreateJobs user={this.state.user}/>
            </Route>
          <Route path="/faq">
            <FAQ type="faq"/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <svg id='vector' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="rgba(77,213,254,1)" fill-opacity="1" d="M0,128L40,122.7C80,117,160,107,240,122.7C320,139,400,181,480,208C560,235,640,245,720,245.3C800,245,880,235,960,224C1040,213,1120,203,1200,181.3C1280,160,1360,128,1400,112L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
      </Router>
    );
  }
}

export default App;
