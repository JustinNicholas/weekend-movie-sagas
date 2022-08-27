import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AddMovie() {

    const options = [
        {value: 1, label: 'Adventure'},
        {value: 2, label: 'Animated'},
        {value: 3, label: 'Biographical'},
        {value: 4, label: 'Comedy'},
        {value: 5, label: 'Disaster'},
        {value: 6, label: 'Drama'},
        {value: 7, label: 'Epic'},
        {value: 8, label: 'Fantasy'},
        {value: 9, label: 'Musical'},
        {value: 10, label: 'Romantic'},
        {value: 11, label: 'Science Fiction'},
        {value: 12, label: 'Space-Opera'},
        {value: 13, label: 'Superhero'}
    ];

    const dispatch = useDispatch();
    const history = useHistory();

    const returnHome = () => {
        history.push('/');
    }

    const animatedComponents = makeAnimated();

    const [newMovie, setNewMovie]= useState({title: '', poster: '', description: ''});
    const [newGenre, setNewGenre] = useState([])

    const titleChange = (event) => {
        console.log(event.target.value);
        setNewMovie({...newMovie, title: event.target.value})
    }

    const posterChange = (event) => {
        console.log(event.target.value);
        setNewMovie({...newMovie, poster: event.target.value})
    }

    const descriptionChange = (event) => {
        console.log(event.target.value);
        setNewMovie({...newMovie, description: event.target.value})
    }

    const genresChange = (event) => {
        event.map(event => {
            setNewGenre([...newGenre, event.value]);
        })
        // console.log(newGenre);
        // console.log(event.formTarget.value);
        // setNewMovie({...newMovie, genres:[ ...genres, event.target.value]})
    }


    const handleSubmit = (event) => {
        event.preventDefault;

        dispatch({
            type: 'ADD_MOVIE',
            payload: {title: newMovie.title, poster: newMovie.poster, description: newMovie.description, genre_id: newGenre}
        })
    }



    return(
        <>
            <h1>Add Movie Form</h1>

            <form onSubmit={(event) => handleSubmit(event)}>
                <input onChange={titleChange} type="text" placeholder="Movie Title"/>
                <input onChange={posterChange} type="text" placeholder="Movie Poster Image Url"/>
                <input onChange={descriptionChange} type="text" placeholder="Movie Description"/>

                <Select
                onChange={genresChange}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                />
                <button type='submit'>Save</button>
                <button onClick={returnHome}>Cancel</button>
            </form>
        </>
    )
}

export default AddMovie;