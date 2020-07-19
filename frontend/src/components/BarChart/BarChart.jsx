
import React from 'react';
import { Bar } from 'react-chartjs-2';

class BarChart extends React.Component {
  render() {
    return (
      <div>
        <Bar
          options={{
            responsive: true
          }}
          data = {this.props.chartData.data}
        />
      </div>
    );
  }
}

export default BarChart;
