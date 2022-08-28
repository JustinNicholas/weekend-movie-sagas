import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AddMovie.css'

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
        console.log('event!',event);
        // We had to add a new array so that we could map through the changes and not enter them into the newGenre as a duplicate when deleting.
        let newArray = []
        event.map(event => {
            newArray.push(event.value)         
        })
        setNewGenre(newArray);
    }

    const handleSubmit = (event) => {
        event.preventDefault;

        dispatch({
            type: 'ADD_MOVIE',
            payload: {title: newMovie.title, poster: newMovie.poster, description: newMovie.description, genre_id: newGenre}
        })
    }



    return(
        <div className='add-movie-container'>
            <h2 className='form-header'>ADD A MOVIE</h2>

            <form onSubmit={(event) => handleSubmit(event)}>
                <input className='movie-input' onChange={titleChange} type="text" placeholder="Movie Title"/>
                <input className='movie-input' onChange={posterChange} type="text" placeholder="Movie Poster Image Url"/>
                <textarea className='movie-text-area' onChange={descriptionChange} type="text" placeholder="Movie Description"/>

                <Select
                className='movie-input selecter'
                onChange={genresChange}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                />
                <div className='form-button-container'>
                    <button className='cancel-button' onClick={returnHome}>Cancel</button>
                    <button className='save-button' type='submit'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddMovie;