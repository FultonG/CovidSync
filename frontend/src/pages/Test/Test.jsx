import React from 'react';
import * as _ from 'lodash';
import { LineChart, BarChart, PieChart } from '../../components'
import { baseRequest } from '../../utils';
import * as testController from './testController';
import './Test.css'

export default class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      barData : [],
      lineData : []
    };
  }

  getLastNDays(nLastDays) {

    const date = new Date();

    let correspondingDates = [];
    for (let i = 0; i < nLastDays; i++){
      correspondingDates.push(date.getMonth() + '/' + date.getDate());
      date.setDate(date.getDate() - 1);
    }

    return correspondingDates;
  }

  async getBarData () {
    const getBarData = await baseRequest.get('/api/covid/usa-daily');
    console.log('status', getBarData);

    const range = 7;

    // index 0 represents current day
    let dailyNewCases = [];
    for (let i = 0; i < range; i++){
      dailyNewCases.push(getBarData[i].positiveIncrease);
    }

    this.setState({
      barData:
        {
          data: {
            labels: this.getLastNDays(range),
            datasets: [
              {
                label: 'New Daily Cases',
                backgroundColor: '#a6dcef',
                data: dailyNewCases
              }
            ]
          }
        }
    });
  }

  async getLineData() {

    const getLineData = await baseRequest.get('/api/covid/usa-daily');
    const range = 14;

    let currentAdmitted = []
    let currentRecoveries = []
    for (let i = 0; i < range; i++){
      currentAdmitted.push(getLineData[i].hospitalized);
      currentRecoveries.push(getLineData[i].recovered);
    }

    currentAdmitted.reverse();
    currentRecoveries.reverse();

    this.setState({
      lineData:
        {
          data: {
            labels: this.getLastNDays(7),
            datasets: [
              {
                label: 'Total admitted into care',
                backgroundColor: '#f2aaaa',
                data: currentAdmitted,
              },
              {
                label: 'Total Recovered',
                backgroundColor: '#a6dcef',
                data: currentRecoveries
              }
            ]
          }
        }
    });

  }

  async componentDidMount() {
    const users = await testController.getUsers();
    const filteredUsers = testController.filterUsers(users);

    this.getBarData();
    this.getLineData();

    this.setState({
      users: filteredUsers,
    });
  }

  render() {
    const { users } = this.state;
    const { barData } = this.state;

    const pieChartData = {
      data : {
        labels: [
        		'Red',
        		'Blue',
        		'Yellow'
        	],
        	datasets: [{
        		data: [300, 50, 100],
        		backgroundColor: [
        		'#a6dcef',
        		'#f2aaaa',
        		'#e36387'
        		],
        		hoverBackgroundColor: [
            '#a6dcef',
          	'#f2aaaa',
        		'#e36387'
        		]
        	}]
      }
    }

    return (
      <div id='statsContainer'>
        <span id='stats-title' class="badge badge-pill badge-primary mb-5">General Stats</span>
        <div className='row'>
          <div className='col-sm-12 shadow'>
            <BarChart chartData={this.state.barData} />
          </div>
          <div className='col-sm-6 shadow col-md-offset-2'>
            <LineChart chartData={this.state.lineData} />
          </div>
          <div className='col-sm-6 shadow col-md-offset-2'>
            <PieChart pieChartData={pieChartData} />
          </div>
        </div>
      </div>
    );

  }
}
