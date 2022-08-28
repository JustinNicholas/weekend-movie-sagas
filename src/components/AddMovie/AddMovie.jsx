import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AddMovie.css'

function AddMovie() {
    // These are the options for the dropdown of the genres.
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

    // We send the user back to the home page when they click the save button to submit the new movie.
    const returnHome = () => {
        history.push('/');
    }
    // we animate the dropdown list to move the genre to the selected box from the list and back when they are removed.
    const animatedComponents = makeAnimated();

    // we track the state of the movie info and the genres
    const [newMovie, setNewMovie]= useState({title: '', poster: '', description: ''});
    const [newGenre, setNewGenre] = useState([])

    // We set the respective values of the event on each key stroke and genre selection.
    const titleChange = (event) => {
        // console.log(event.target.value);
        setNewMovie({...newMovie, title: event.target.value})
    }

    const posterChange = (event) => {
        // console.log(event.target.value);
        setNewMovie({...newMovie, poster: event.target.value})
    }

    const descriptionChange = (event) => {
        // console.log(event.target.value);
        setNewMovie({...newMovie, description: event.target.value})
    }

    const genresChange = (event) => {
        // console.log('event!',event);
        // We had to add a new array so that we could map through the changes and not enter them into the newGenre as a duplicate when deleting.
        let newArray = []
        // we map through the array of events to get the value of each genre that is selected and push them into the newArray.
        event.map(event => {
            newArray.push(event.value)         
        })
        // We set the newGenre to the array of just the values in the selected area
        setNewGenre(newArray);
    }

    const handleSubmit = (event) => {
        event.preventDefault;
        // We check that there are values in all of the sections before submitting and send the user an alert if its half completed
        if(newMovie.title === '' || newMovie.poster === '' || newMovie.description === '' || newGenre === []) {
            alert('Please enter information in all categories');
        } else {
        // We send a dispatch to the store and add the movie to the DB
        dispatch({
            type: 'ADD_MOVIE',
            payload: {title: newMovie.title, poster: newMovie.poster, description: newMovie.description, genre_id: newGenre}
        })
        // we send the user back to the home screen after they submit a movie.
        history.push('/');
        }
    }



    return(
        <div className='add-movie-container'>
            <h2 className='form-header'>ADD A MOVIE</h2>
            {/* We have a form that waits to be submitted and tracks all change events */}
            <form onSubmit={(event) => handleSubmit(event)}>
                <input className='movie-input' onChange={titleChange} type="text" placeholder="Movie Title"/>
                <input className='movie-input' onChange={posterChange} type="text" placeholder="Movie Poster Image Url"/>
                <textarea className='movie-text-area' onChange={descriptionChange} type="text" placeholder="Movie Description"/>
                {/* We have a select dropdown from react-Select this allows multiple selections and is animated */}
                <Select
                className='movie-input selecter'
                onChange={genresChange}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                />
                <div className='form-button-container'>
                    {/* we have a button to cancel and a save button that both send users to the home screen */}
                    <button className='cancel-button' onClick={returnHome}>CANCEL</button>
                    <button className='save-button' type='submit'>SAVE</button>
                </div>
            </form>
        </div>
    )
}

export default AddMovie;