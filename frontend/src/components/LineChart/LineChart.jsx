
import React from 'react';
import { Line } from 'react-chartjs-2';

class LineChart extends React.Component {
  render() {
    const { chartData } = this.props;
    return (
      <div>
        <Line
          options={{
            responsive: true
          }}
          data = {chartData.data}
        />
      </div>
    );
  }
}

export default LineChart;
