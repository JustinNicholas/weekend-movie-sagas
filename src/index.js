import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('GET_DESCRIPTION', getDescription);
    yield takeEvery('GET_GENRES', getGenres);
    yield takeEvery('ADD_MOVIE', addMovie)
}

function* fetchAllMovies() {
    // get all movies from the DB and set the reducer to the response
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function* getDescription(action){
    // get the description of a specific moveie and set the description reducer to the response.
    try{
        let description = yield axios.get(`/api/description/${action.payload}`)
        yield put({type: 'SET_DESCRIPTION', payload: description.data});
    } catch (err) {
        console.log(err);
    }
}

function* getGenres(action){
    // get the genres of a specific moveie and set the description reducer to the response.
    try {
        let genres = yield axios.get(`/api/genre/${action.payload}`)
        yield put({type: 'SET_GENRES', payload: genres.data})
    } catch (err) {
        console.log(err);
    }
}

function* addMovie(action) {
    // add movie to the DB and then call the get movies to have an updated movie list.
    console.log(action.payload);
    try {
        yield axios.post(`/api/movie`, action.payload)
        //need to post the movie and get the id info back before making a put request to add the genres.
        yield put({type: 'FETCH_MOVIES'})
    } catch (err) {
        console.log(err);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the description of a specific movie
const description = (state = [], action ) => {
    switch (action.type) {
        case 'SET_DESCRIPTION':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        description,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
