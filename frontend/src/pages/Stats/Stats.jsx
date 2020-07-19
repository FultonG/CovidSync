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
      summary: {
        confirmed: '',
        deaths: '',
        recovered: '',
      },
      stateData: [],
      filteredStateData: [],
      filtering: false,
      positiveVsDeaths: {},
      dailyIncrease: {},
    };
  }

  async componentDidMount() {
    const { summary, stateData, positiveVsDeaths, dailyIncrease } = await statsController.getAllRequiredData();
    console.log(summary, stateData, positiveVsDeaths, dailyIncrease);
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
      positiveVsDeaths,
      dailyIncrease,
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
    const filterStatesByInput = stateData.filter(({ state }) => _.startsWith(state.toLowerCase(), (inputText)));
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
      positiveVsDeaths,
      dailyIncrease,
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
        <h1 className='stats-title'>Statistics</h1>
        <div className='row'>
          <div className='card col-6'>
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
          <div className='state-stats card col-6'>
            <input onChange={ this.filterStates } placeholder='Filter by State'></input>
            <div className='table-responsive'>
              <table className='table table-fixed'>
                <thead>
                  <tr>
                    <th scope="col">State</th>
                    <th scope="col">Total Cases</th>
                    <th scope="col">Total Deaths</th>
                  </tr>
                </thead>
                <tbody>
                  { stateSelector.map(({ state, total, death, recovered }) => {
                    return (
                      <tr className='state-field' key={state}>
                        <td>{ state }</td>
                        <td>{ total }</td>
                        <td>{ death }</td>
                      </tr>
                    );
                    }) }
                </tbody>
              </table>
            </div>
          </div>
          <div className='charts card col-6'>
            <LineChart chartData={ positiveVsDeaths }/>
          </div>
          <div className='charts card col-6'>
            <BarChart chartData={ dailyIncrease }/>
          </div>
        </div>
      </div>
    );
  }
}
