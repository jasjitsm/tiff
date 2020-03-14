import React from 'react';
import './App.scss';
import axios from './../../api/tmdb';
import Card from './../card/Card';
import Header from '../header/Header';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      genreList: {},
      page: 1,
      noResults: false
    }
  }

  componentDidMount() {
    this.getMovieList();
  }

  /**
   * Fetches movies from the TMDB Discover API. Movies are released in the current year and
   * sorted by release date.
   */
  getMovieList = async() => {
    const date = new Date();
    const year = date.getFullYear();

    const data = await axios.get('/discover/movie', {
      params: {
        primary_release_year: year,
        sort_by: 'primary_release_date.asc',
        page: this.state.page
      }
    });

    let movieList = [...this.state.movieList, ...this.filterPopularity(data.data.results, 10) ];
    if(movieList.length === this.state.movieList.length) {
      this.setState({noResults: true});
    } else {
      this.setState({noResults: false, movieList});
    }
  }

  /**
   * Filters out movies with a popularity level lower than the threshold.
   */
  filterPopularity = (moviesArr, threshold) => {
    return moviesArr.filter((movie) => {
      return (movie['popularity'] > threshold);
    });
  }

  /**
   * Increments the page index and calls a function to fetch update the movie list.
   */
  getMoreMovies = async() => {
    this.setState({page: this.state.page+1}, () => {
      this.getMovieList();
    });
  }

  render() {
    const date = new Date();
    const year = date.getFullYear();

    return (
      <div className="app">
        <Header />
        <div className="movies">
          <h2 className="header__title">Upcoming Films In {year}</h2>
          {this.state.movieList.map((movie, index) => (
            <Card movieId={movie.id} key={index}/>
          ))}
        </div>
        { 
          this.state.noResults &&
          <p>The next 20 releases didn't meet our popularity threshold. Please try again!</p>
        }
        <button className="button" onClick={this.getMoreMovies}>Load More</button>
      </div>
    );
  }
}

export default App;
