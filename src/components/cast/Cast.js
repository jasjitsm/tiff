import React from 'react';
import './Cast.scss';
import axios from './../../api/tmdb';

class Cast extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      castMovies: []
    }
  }

  /**
   * Gets the list of movies the cast member appeared in.
   */
  getCastMemberMovies = async(e) => {
    e.stopPropagation();
    let data = await axios.get('/person/' + this.props.member.id + '/movie_credits');
    let castMovies = [];
    for(let i = 0; i<6; i++) {
      if(data.data.cast[i]) {
        castMovies.push(data.data.cast[i].title);
      }
    }
    this.setState({castMovies});
  }

  render() {
    const {castMovies} = this.state;
    const {member} = this.props;
    return (
      <React.Fragment>
      <div className="cast__member">
        <span>-- {member.name}</span>
        {!castMovies.length &&
          <button className="button button--show-movies" onClick={this.getCastMemberMovies}>Show Movie List</button>
        }
      </div>
      {(castMovies.length > 0) &&
        <div className="cast__member-movies">
          {castMovies.map((movie, index) => {
            return <p className="cast__member-movie" key={index+movie}>{movie}</p>
          })}
        </div>
      }
      </React.Fragment>
    );
  }
}

export default Cast;