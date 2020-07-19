import React from 'react';
import * as _ from 'lodash';
import { Spinner, ExpandingCard } from '../../components';
import { baseRequest } from '../../utils';
import './FAQ.css';

export default class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      questionsAndAnswers: [],
    };
  }

  async componentDidMount() {
    const { data: faq } = await baseRequest.get('/api/faq');
    this.setState({
      loading: false,
      error: _.isEmpty(faq),
      questionsAndAnswers: faq,
    });
  }

  render() {
    const { loading, error, questionsAndAnswers } = this.state;
    const questionCards = questionsAndAnswers.map(
      ({ question, answer }) => <ExpandingCard key={ question } text={ question } subtext={ answer } />
    );
    return (
      <div className='faq-body'>
        <h1 className='faq-title'>Frequently Asked Questions</h1>
        { error && 'Looks like we had some trouble loading the FAQ! Please try again.' }
        { loading ? <Spinner /> : questionCards }
      </div>
    );
  }
}
