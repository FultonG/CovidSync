

import React from 'react';
import { Pie } from 'react-chartjs-2';

class PieChart extends React.Component {
  render() {
    const { pieChartData } = this.props;
    return (
      <div>
        <Pie
          options={{
            responsive: true
          }}
          data = { pieChartData.data }
        />
      </div>
    );

  }
}

export default PieChart;
