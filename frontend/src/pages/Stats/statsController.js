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

async function getAllRequiredData() {
  const {
    data: {
      confirmed,
      deaths,
      recovered,
    }
  } = await baseRequest.get('/api/covid/total');

  const dailyData = await baseRequest.get('/api/covid/usa-daily');
  const stateData = await baseRequest.get('/api/covid/usa-states');

  const requiredStateData = stateData.map(({
    state,
    positive,
    death,
  }) => {
    console.log(recovered);
    return {
      state: stateCodeToNameMap[state],
      total: positive.toLocaleString(),
      death: death.toLocaleString(),
    };
  });

  return {
    summary: {
      confirmed: confirmed.toLocaleString(),
      deaths: deaths.toLocaleString(),
      recovered: recovered.toLocaleString(),
    },
    stateData: requiredStateData,
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