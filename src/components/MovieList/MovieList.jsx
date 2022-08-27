import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {

    const history = useHistory();

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);
    
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
        <main>
            {/* <h1>MovieList</h1> */}
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