import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
            <div key={movie.id} className='movie-card'>
                <div>
                    {/* <h1>Description Page</h1> */}
                    <img src={movie.poster} />
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                </div>

                {genres.map( (genre) => {
                        return(
                            <div key={genre.id}>
                                <p>{genre.name}</p>
                            </div>
                        )
                    })}
                <div>
                    <button onClick={returnHome}>Home</button>
                </div>
            </div>
            )
        })}
        </>
    )
}

export default MovieDescription;