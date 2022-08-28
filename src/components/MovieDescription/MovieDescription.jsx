import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import './MovieDescription.css';

function MovieDescription() {

    // On page load we call the dispatch to get the description. by calling refresh and using the id from the useParams as the argument.
    let {id} = useParams();
    useEffect( () => {
        refresh(id);
    }, [])
    const dispatch = useDispatch();

    // refresh function calls get desctiption and genres of the id from the url so info is kept on refresh.
    const refresh = (id) => {

        dispatch({
            type: 'GET_DESCRIPTION',
            payload: id
        })

        dispatch({
            type: 'GET_GENRES',
            payload: id
        })
    }

    const history = useHistory();
    // HOME button sends user back to the home page
    const returnHome = () => {
        history.push('/');
    }
    // we pull info from the store of the movie description and movie genres reducers
    const description = useSelector(store => store.description)
    const genres = useSelector(store => store.genres)

    return(
        <>
        {/* We map through the movie array we get to display the image, title, and description */}
        {description.map( movie => {
            console.log('title:',movie.title);
            return (
            <div key={movie.id} className='description-movie-card'>
                <div>
                    <img className='description-movie-img' src={movie.poster} />
                    <div className='description-text'>
                        <h3>{movie.title}</h3>
                        <p>{movie.description}</p>
                    </div>
                </div>
                <div className="description-genres">
                <p className="genre-heading">GENRES</p>
                {/* We map through the genres array to display all of the genres for the movie we selected. */}
                {genres.map( (genre) => {
                        return(
                            <div className="genre-bubble" key={genre.id}>
                                <div>{genre.name}</div>
                            </div>
                        )
                    })}
                </div>
                {/* we have a home button on the bottom of the description section */}
                <div className="return-home-button">
                    <button className="cancel-button" onClick={returnHome}>HOME</button>
                </div>
            </div>
            )
        })}
        </>
    )
}

export default MovieDescription;