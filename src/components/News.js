
import React, { Component } from 'react';
import NewsItem from './NewsItem';


export default class News extends Component {

  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1

    }
  }
  async componentDidMount() {

    let url = "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=4f94d4fa22bf43aba58b48ec62ce0b09"
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles });

  }
  handlePrevClick = async () => {
    
    let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=4f94d4fa22bf43aba58b48ec62ce0b09&page=${this.state.page - 1}`
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);


    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })

  }

  handleNextClick = async () => {



    let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=4f94d4fa22bf43aba58b48ec62ce0b09&page=${this.state.page + 1}`
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);


    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
    })
  }


  render() {

    return (
      <div className='container my-3'>
        <h1><b>NewsMonkey -Top Headlines</b></h1>
        <p>Created By Homen</p>

        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>

          })}

        </div>
        <div className="container">
          <div className="d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Prev</button>
            <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
          </div>

        </div>



      </div>
    );
  }
}

