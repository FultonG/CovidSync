import React from 'react';
import * as _ from 'lodash';
import { LineChart, BarChart, PieChart, Spinner } from '../../components'
import './Stats.css'
import statsController from './statsController';

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      filtering: false,
      summary: {
        confirmed: '',
        deaths: '',
        recovered: '',
      },
      dailyData: {},
      stateData: [],
      filteredStateData: [],
    };
  }

  async componentDidMount() {
    const { summary, stateData } = await statsController.getAllRequiredData();
    if(_.isUndefined(summary)) {
      this.setState({
        loading: false,
        error: true,
      });
      return;
    }
    this.setState({
      summary,
      stateData,
      loading: false,
      error: false,
    });
  }

  filterStates = (event) => {
    const inputText = event.target.value.toLowerCase();
    if(_.isEmpty(inputText)) {
      this.setState({
        filtering: false,
      });
    }
    const { stateData } = this.state;
    const filterStatesByInput = stateData.filter(({ state }) => state.toLowerCase().includes(inputText));
    this.setState({
      filteredStateData: filterStatesByInput,
      filtering: true,
    });
  }

  render() {
    const {
      summary: {
        confirmed,
        deaths,
        recovered,
      },
      filtering,
      filteredStateData,
      stateData,
      loading,
      error,
    } = this.state;

    if(loading) return <Spinner />;
    if(error) return 'Looks like we hit a snag loading statistics! Please try again.';
    const stateSelector = filtering ? filteredStateData : stateData;

    const {
      usCases,
      usDeaths,
    } = statsController.getUSData(stateData);

    return (
      <div id='statsContainer'>
        <h1>Statistics</h1>
        <div className='row'>
          <div className='card col'>
            <div className='summary-stats card'>
              <h1>World Wide</h1>
              <h1>Total Confirmed Cases: { confirmed }</h1>
              <h1>Total Deaths: { deaths }</h1>
              <h1>Total Recoveries: { recovered }</h1>
            </div>
            <div className='us-summary-stats card'>
              <h1>United States</h1>
              <h1>Total Confirmed Cases: { usCases }</h1>
              <h1>Total Deaths: { usDeaths }</h1>
            </div>
          </div>
          <div className='state-stats card col'>
            <input onChange={ this.filterStates } placeholder='Filter by State'></input>
            { stateSelector.map(({ state, total, death, recovered }) => {
                return (
                  <div key={state}>
                    <p>{ state }</p>
                    <p>Total Cases: { total } </p>
                    <p>Total Deaths: { death } </p>
                  </div>
                );
              }) }
          </div>
        </div>
      </div>
    );
  }
}
