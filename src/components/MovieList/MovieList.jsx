import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {

    const history = useHistory();
    const dispatch = useDispatch();
    // we get info of the movies from the store
    const movies = useSelector(store => store.movies);
    // we call the fetch movies function to get the movie info on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);
    // we call the movie description page and get the info we need when an image card is clicked and send the user to that page.
    const movieDescriptionPage = (id) => {

        dispatch({
            type: 'GET_DESCRIPTION',
            payload: id
        })

        dispatch({
            type: 'GET_GENRES',
            payload: id
        })

        console.log('clicked movie', id);
        history.push(`/api/description/${id}`);
    }

    return (
        <main className='movie-container'>
            {/* We map through the movies to display the movie poster and title on each card */}
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div className='movie-card' onClick={() => movieDescriptionPage(movie.id)} key={movie.id} >
                            <img className='movie-img' src={movie.poster} alt={movie.title}/>
                            <p className='movie-title'>{movie.title}</p>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;