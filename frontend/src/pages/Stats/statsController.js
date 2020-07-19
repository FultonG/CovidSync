import * as _ from 'lodash';
import { baseRequest } from '../../utils';

const stateCodeToNameMap = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AS': 'American Samoa',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'DC': 'District of Columbia',
  'FL': 'Florida',
  'GA': 'Georgia',
  'GU': 'Guam',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'MP': 'Northern Mariana Islands',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PA': 'Pennsylvania',
  'PR': 'Puerto Rico',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VI': 'Virgin Islands',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming',
};

const dayRange = 60;

function getDateLabels(n) {
  const today = new Date();
  return _.range(n).map((i) => {
    today.setDate(today.getDate() - 1);
    const label = `${today.getMonth()}/${today.getDate()}`;
    return label;
  });
}

async function getChartData() {
  const dailyData = await baseRequest.get('/api/covid/usa-daily');
  const requiredDays = _.slice(dailyData, 0, dayRange);
  const dateLabels = getDateLabels(dayRange).reverse();

  const positive = requiredDays.map((day) => day.positive).reverse();
  const deaths = requiredDays.map((day) => day.death).reverse();
  const newDailyCases = requiredDays.map((day) => day.positiveIncrease).reverse();

  return {
    positiveVsDeaths: {
      data: {
        labels: dateLabels,
        datasets: [
          {
            label: 'Total Confirmed Cases',	
            backgroundColor: '#f2aaaa',	
            data: positive,
          },
          {
            label: 'Total Deaths',	
            backgroundColor: '#000',
            data: deaths,
          },
        ],
      },
    },
    dailyIncrease: {
      data: {
        labels: dateLabels,
        datasets: [
          {
            label: 'New Daily Cases',
            backgroundColor: '#a6dcef',
            data: newDailyCases,
          },
        ],  
      },
    },
  };
}

async function getStateData() {
  const stateData = await baseRequest.get('/api/covid/usa-states'); 
  return stateData.map(({
    state,
    positive,
    death,
  }) => {
    return {
      state: stateCodeToNameMap[state],
      total: positive.toLocaleString(),
      death: death.toLocaleString(),
    };
  });
}

async function getAllRequiredData() {
  const {
    data: {
      confirmed,
      deaths,
      recovered,
    }
  } = await baseRequest.get('/api/covid/total');

  const chartData = await getChartData();
  const stateData = await getStateData();

  return {
    summary: {
      confirmed: confirmed.toLocaleString(),
      deaths: deaths.toLocaleString(),
      recovered: recovered.toLocaleString(),
    },
    stateData,
    ...chartData,
  };
}

// lol ...
function getUSData(stateData) {
  return {
    usCases: _.sumBy(stateData, ({ total }) => _.toNumber(total.replace(',', ''))).toLocaleString(),
    usDeaths: _.sumBy(stateData, ({ death }) => _.toNumber(death.replace(',', ''))).toLocaleString(),
  };
}

export default {
  getAllRequiredData,
  getUSData,
};