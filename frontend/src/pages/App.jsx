import React from 'react';
import Test from './Stats';
import Test2 from './Test2';
import AuthForm from './AuthForm';
import JobList from './Jobs/JobList';
import FAQ from './FAQ';
import { Nav, Footer } from '../components'
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
  }

  setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    this.setState(previous => ({...previous, user}))
  }

  render() {
    return (
      <Router>
        <Nav user={this.state.user}/>
        <Switch>
          <Route path="/stats">
            <Test />
          </Route>
          <Route path="/test2">
            <Test2 />
          </Route>
          <Route path="/login">
            <AuthForm type="login" setUser={this.setUser}/>
          </Route>
          <Route path="/signup">
            <AuthForm type="signup"/>
          </Route>
          <Route exact path="/jobs">
            <JobList/>
          </Route>
          <Route exact path="/jobs/create">
            <CreateJobs/>
            </Route>
          <Route path="/faq">
            <FAQ type="faq"/>
          </Route>
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
