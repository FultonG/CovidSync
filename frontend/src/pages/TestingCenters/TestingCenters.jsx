import React from 'react';
import * as _ from 'lodash';
import tcController from './testingCentersController';
import { KEY } from '../../utils/MAP_KEYS.json';
import ReactMapGL, { Marker } from 'react-map-gl';
import './TestingCenters.css';

const defaultLat = 25.866123;
const defaultLng = -80.301182;

export default class TestingCenters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: '100%',
        height: 800,
        latitude: defaultLat,
        longitude: defaultLng,
        zoom: 8,
      },
      filtering: false,
      filteredCenters: [],
      geoCoords: [],
    };
  }

  filterLocations = async (event) => {
    const inputText = event.target.value;
    const { viewport: vw } = this.state;
    if(_.isEmpty(inputText)) {
      this.setState({
        filtering: false,
        geoCoords: [],
      });
      return;
    }
    const filteredCenters = tcController.centerData.filter(({ address }) => _.startsWith(address.toLowerCase(), (inputText)));
    const possibleZIPS = filteredCenters.map(({ zip }) => zip);
    const geoCoords = await tcController.getCoordsFromZips(possibleZIPS);
    this.setState({ 
      filteredCenters,
      filtering: true,
      geoCoords,
      viewport: {
        ...vw,
        width: '100%',
        latitude: _.get(geoCoords, ['0', 'lat'], defaultLat),
        longitude: _.get(geoCoords, ['0', 'lng'], defaultLng),
      },
    });
  };

  render() {
    const { filteredCenters, filtering, geoCoords } = this.state;
    return (
      <div className='testing-centers-container row'>
        <div className='search-component col-4'>
          <h1 className='search-title'>Search For Testing Centers</h1>
          <input onChange={this.filterLocations} pattern='[0-9]+' className='testing-center-search' type="text" placeholder='Search by ZIP Code'/>
          <div className='centers'>
            { filtering && filteredCenters.map(({
              name,
              address,
              phone
            }) => {
              return (
              <div key={ name } className='center-data'>
                <div className='center-name'>
                  <h5>Name:</h5>
                  { name }
                </div>
                <div className='center-phone'>
                  <h5>Phone:</h5>
                  { phone }
                </div>
                <div>
                  <h5>Address:</h5>
                  { address }
                </div>
              </div>
              );
            }) }
          </div>
        </div>
        <div className='col-8'>
          <ReactMapGL
            mapboxApiAccessToken={ KEY }
            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({viewport})}>
            {
              geoCoords.map((coords, i) => {
                return (
                  <Marker key={ filteredCenters[i].address } longitude={coords.lng} latitude={coords.lat} offsetTop={-20} offsetLeft={-10}>
                    <i class="fas fa-map-pin"></i>
                  </Marker>
                )
              })
            }
          </ReactMapGL>
        </div>
      </div>
    );
  }
}
