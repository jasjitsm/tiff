import './Card.scss';
import React from 'react';
import filmIcon from './../../assets/images/icon-film.svg';
import axios from './../../api/tmdb';
import Cast from './../cast/Cast';

class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      movie: {},
      cast: []
    }
  }

  componentDidMount() {
    this.getMovieDetails();
  }

  getMovieDetails = async() => {
    const {movieId} = this.props;
    const data = await axios.get('/movie/'+movieId);
    this.setState({movie: data.data});
  }

  toggleCollapsed = () => {
    this.setState({collapsed: !this.state.collapsed});
  }

  getCast = async(e) => {
    e.stopPropagation();
    const {movieId} = this.props;
    const data = await axios.get('/movie/'+movieId+'/credits');
    this.setState({cast: data.data.cast.slice(0, 5)});
  }

  render() {
    const {cast, movie} = this.state;
    const imagePathPrefix = 'https://image.tmdb.org/t/p/w500';

    return (
      <React.Fragment>
        {!this.state.collapsed ?
          <div className="card" onClick={this.toggleCollapsed}>
            <img
              className="card__image"
              src={imagePathPrefix + movie.poster_path}
              alt={movie.original_title + "Poster"}/>
            <div className="card__content">
              <div className="card__header">
                <img className="card__header-icon" alt="" src={filmIcon}/>
                <p className="card__header-title">{`${movie.original_title}`}</p>
              </div>
              <div className="card__main">
                {movie.tagline &&
                  <span className="card__tagline">Tagline: {movie.tagline}<br/></span>
                }
                {movie.runtime &&
                  <span className="card__tagline">Runtime: {movie.runtime} minutes</span>
                }
                <p className="card__overview">{`${movie.overview}`}</p>
                <div className="genres">
                  {movie.genres.map((genre) => {
                    return <span className="genres__genre" key={genre.id}>{genre.name}</span>
                  })}
                </div>
              </div>
              {!cast.length &&
                <button className="button button--cast" onClick={this.getCast}>
                  Show Cast
                </button>
              }
              {(cast.length>0) &&
                <div className="cast">
                  <span>Cast</span>
                  {cast.map((member => {
                    return <Cast member={member} key={member.cast_id}/>
                  }))}
                </div>
              }
            </div>
          </div>
        :
          <div className="card--collapsed" onClick={this.toggleCollapsed}>
            <p className="card__title">{`${movie.original_title}`}</p>
          </div>
        }
      </React.Fragment>
    );
  }
  
}

export default Card;