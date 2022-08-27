import { useSelector } from "react-redux";

function MovieDescription() {

    const description = useSelector(store => store.description)
    console.log('description:',description);
    return(
        <>
        {description.map( movie => {
            console.log('title:',movie.title);
            return (
            <div key={movie.id}>
                <h1>Description Page</h1>
                <img src={movie.poster} />
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
            </div>
            )
        })}
        </>
    )
}

export default MovieDescription;