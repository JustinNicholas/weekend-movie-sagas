import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function MovieDescription() {

    const history = useHistory();

    const returnHome = () => {
        history.push('/');
    }

    const description = useSelector(store => store.description)
    console.log('description:',description);

    return(
        <>
        {description.map( movie => {
            console.log('title:',movie.title);
            return (
            <div>
                <div key={movie.id}>
                    <h1>Description Page</h1>
                    <img src={movie.poster} />
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                </div>
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