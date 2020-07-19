import React from 'react';
import Test from './Stats';
import Test2 from './Test2';
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
  constructor() {
    super();
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
          <Route path="/test2">
            <Test2 />
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
      </Router>
    );
  }
}

export default App;
