import React from 'react';
import './ExpandingCard.css';

class ExpandingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  expand = () => {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  };

  render() {
    const { text, subtext } = this.props;
    const { expanded } = this.state;
    const iconClass = `fas fa-arrow-circle-${ expanded ? 'up' : 'down' }`;
    return (
      <div className='card expanding-card shadow-sm' onClick={ this.expand }>
        <div>
          <div className='text'>{ text }</div>
          <i className={ iconClass }></i>
        </div>
        <div>
          { expanded && subtext.map((text) => <p className='subtext'>{ text }</p>) }
        </div>
      </div>
    );
  }
}

export default ExpandingCard;
