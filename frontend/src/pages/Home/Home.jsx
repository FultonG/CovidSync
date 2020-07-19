
import React from 'react';
import './Home.css';

class Home extends React.Component{

  constructor(props){
    super(props);
  }

  render() {
    return(
        <div id='home-page-container'>
          <div class="row row-cols-1 row-cols-md-2 text-center">
            <div class="col mb-5">
              <div class="card shadow" style={{marginRight: '5px', width:'35rem'}}>
                <i class="fas fa-money-bill-wave fa-gradient"></i>
                <div class="card-body">
                  <h5 class="card-title">Gigs</h5>
                  <p class="card-text">Check out some local gigs near you, whether you are looking for work or looking to make some extra cash check out some listings.</p>
                </div>
              </div>
            </div>
            <div class="col mb-5">
              <div class="card shadow right-card" style={{marginLeft: '5px', width:'35rem'}}>
                <i class="fas fa-chart-pie fa-gradient"></i>
                <div class="card-body">
                  <h5 class="card-title">COVID-19 Statistics</h5>
                  <p class="card-text">Get a better understanding of COVID-19 by checking out some data on the statistics page that allows you to filter by location so you can have a better understanding of the numbers.</p>
                </div>
              </div>
            </div>
            <div class="col mb-5">
              <div class="card shadow" style={{marginRight: '5px', width:'35rem'}}>
                <i class="fas fa-thermometer-quarter fa-gradient"></i>
                <div class="card-body">
                  <h5 class="card-title">Testing Centers</h5>
                  <p class="card-text">If you believe you are at risk of infection or perhaps are showing some symptoms, check out testing centers near you.</p>
                </div>
              </div>
            </div>
            <div class="col mb-5">
              <div class="card shadow" style={{marginLeft: '5px', width:'35rem'}}>
                <i class="fas fa-book-medical fa-gradient"></i>
                <div class="card-body">
                  <h5 class="card-title">COVID-19 Awareness</h5>
                  <p class="card-text">Read more about COVID-19 and some frequently thought of questions answered by health institutions.</p>
                </div>
              </div>
            </div>
          </div>
          <svg id='vector' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="rgba(77,213,254,1)" fill-opacity="1" d="M0,128L40,122.7C80,117,160,107,240,122.7C320,139,400,181,480,208C560,235,640,245,720,245.3C800,245,880,235,960,224C1040,213,1120,203,1200,181.3C1280,160,1360,128,1400,112L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
          </svg>
        </div>
    );
  }

}

export default Home;
