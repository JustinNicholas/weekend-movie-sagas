import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import './MovieDescription.css';
// import { useParams } from "react-router-dom";

function MovieDescription() {

    // On page load we call the dispatch to get the description. by calling refresh and using the id from the useParams as the argument.
    let {id} = useParams();
    useEffect( () => {
        refresh(id);
    }, [])
    const dispatch = useDispatch();

    // refresh function calls
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

    const returnHome = () => {
        history.push('/');
    }

    const description = useSelector(store => store.description)
    const genres = useSelector(store => store.genres)

    return(
        <>
        {description.map( movie => {
            console.log('title:',movie.title);
            return (
            <div key={movie.id} className='description-movie-card'>
                <div>
                    {/* <h1>Description Page</h1> */}
                    <img className='description-movie-img' src={movie.poster} />
                    <div className='description-text'>
                        <h3>{movie.title}</h3>
                        <p>{movie.description}</p>
                    </div>
                </div>
                <div className="description-genres">
                <p className="genre-heading">GENRES</p>
                {genres.map( (genre) => {
                        return(
                            <div className="genre-bubble" key={genre.id}>
                                <div>{genre.name}</div>
                            </div>
                        )
                    })}
                </div>
                <div className="return-home-button">
                    <button className="cancel-button" onClick={returnHome}>Home</button>
                </div>
            </div>
            )
        })}
        </>
    )
}

export default MovieDescription;