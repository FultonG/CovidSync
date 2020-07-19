import React, { useState, useEffect } from "react";
import './Home.css';
import { useHistory } from "react-router-dom";
import { News } from '../../components';

const Home = () => {

  function mapRedirect(linkLocation) {
    history.push(linkLocation);
  }

  let history = useHistory();

    return (
      <div id='home-page-container'>
        <div class="row row-cols-1 row-cols-md-2 text-center">
          <div class="col mb-5">
            <div class="home-card card shadow" style={{ marginRight: '5px', width: '35rem' }} onClick = {() => {
            mapRedirect('/jobs');
          } }>
              <i class="home-icon fas fa-money-bill-wave fa-gradient"></i>
              <div class="card-body">
                <h5 class="card-title">Gigs</h5>
                <p class="card-text">Check out some local gigs near you, whether you are looking for work or looking to make some extra cash check out some listings.</p>
              </div>
            </div>
          </div>
          <div class="col mb-5">
            <div class="home-card card shadow right-card" style={{ marginLeft: '5px', width: '35rem' }} onClick = {() => {
            mapRedirect('/stats');
          } }>
              <i class="home-icon fas fa-chart-pie fa-gradient"></i>
              <div class="card-body">
                <h5 class="card-title">COVID-19 Statistics</h5>
                <p class="card-text">Get a better understanding of COVID-19 by checking out some data on the statistics page that allows you to filter by location so you can have a better understanding of the numbers.</p>
              </div>
            </div>
          </div>
          <div class="col mb-5">
            <div class="home-card card shadow" style={{ marginRight: '5px', width: '35rem' }} onClick = {() => {
            mapRedirect('/testingcenters');
          } }>
              <i class="home-icon fas fa-thermometer-quarter fa-gradient"></i>
              <div class="card-body">
                <h5 class="card-title">Testing Centers</h5>
                <p class="card-text">If you believe you are at risk of infection or perhaps are showing some symptoms, check out testing centers near you.</p>
              </div>
            </div>
          </div>
          <div class="col mb-5">
            <div class="home-card card shadow" style={{ marginLeft: '5px', width: '35rem' }} onClick = {() => {
            mapRedirect('/faq');
          } }>
              <i class="home-icon fas fa-book-medical fa-gradient"></i>
              <div class="card-body">
                <h5 class="card-title">COVID-19 Awareness</h5>
                <p class="card-text">Read more about COVID-19 and some frequently thought of questions answered by health institutions.</p>
              </div>
            </div>
          </div>
        </div>
        <News />
      </div>
    );
}

export default Home;
