import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function MovieDescription() {

    const history = useHistory();

    const returnHome = () => {
        history.push('/');
    }

    const description = useSelector(store => store.description)
    const genres = useSelector(store => store.genres)

    // console.log('description:',description);

    return(
        <>
        {description.map( movie => {
            console.log('title:',movie.title);
            return (
            <div key={movie.id}>
                <div>
                    <h1>Description Page</h1>
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