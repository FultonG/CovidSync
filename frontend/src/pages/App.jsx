import React from 'react';
import Test from './Test';
import Test2 from './Test2';
import Signup from './Signup';
import Login from './Login';
import JobList from './Jobs/JobList';
import FAQ from './FAQ';
import Home from './Home';
import { Nav } from '../components'
import { baseRequest } from '../utils';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateJobs from './Jobs/CreateJob';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        isLoggedIn: false
      }
    }
  }

  async componentDidMount() {
    let user = localStorage.getItem('user')
    if(user){
      this.setState(previous => ({...previous, user: JSON.parse(user)}));
    }
    const response = await baseRequest.get('/api/covid/total');
    const { data } = response;
  }

  setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    this.setState(previous => ({...previous, user}))
  }

  signOut = () => {
    console.log('click')
    localStorage.removeItem('user');
    this.setState(previous => ({...previous, user: {isLoggedIn: false}}))
  }

  render() {
    return (
      <Router>
        <Nav user={this.state.user} signOut={this.signOut}/>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/test">
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
            <JobList/>
          </Route>
          <Route exact path="/jobs/create">
            <CreateJobs user={this.state.user}/>
            </Route>
          <Route path="/faq">
            <FAQ type="faq"/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
