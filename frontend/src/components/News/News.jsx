
import React from 'react'
import './News.css'
import { baseRequest } from '../../utils';

class News extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      articles : [
        ['What Accounts For High Coronavirus Positivity Rates Among Florida Kids?', 'https://www.npr.org/sections/coronavirus-live-updates/2020/07/17/892427161/what-accounts-for-high-coronavirus-positivity-rates-among-florida-kids'],
        ['Almost 12,500 COVID-19 cases added in Florida. The state’s death toll is over 5,000', 'https://www.miamiherald.com/news/coronavirus/article244334297.html'],
        ['South Florida curfews in effect as officials hope to stem the spread of COVID-19', 'https://www.local10.com/news/local/2020/07/19/coronavirus-south-florida-curfews-in-effect-as-officials-hope-to-stem-the-spread-of-covid-19/?outputType=amp']
      ]
    }
  }

  genNewsRep() {
    const newsCards = this.state.articles.map((articles) =>
      <div class="card mb-5">
        <div class="card-body d-flex justify-content-between">
          <p class='inner-text' class="card-title">{articles[0]}</p>
          <div>
            <a href={articles[1]} class="btn btn-primary">Go</a>
          </div>
        </div>
      </div>
    );
    return newsCards;
  }

  componentDidMount(){
  }

  render() {

    const cardHTML = this.genNewsRep();

    return (
      <div id='news-root' style={{marginTop: '40px'}}>
        <h5 id='news-title'>News</h5>
        {this.genNewsRep()}
      </div>
    );
  }

}

export default News;
