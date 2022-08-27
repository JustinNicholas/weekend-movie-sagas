import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList.jsx';
import MovieDescription from '../MovieDescription/MovieDescription.jsx';
import AddMovie from '../AddMovie/AddMovie.jsx';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route path="/api/description/:id">
          <MovieDescription />
        </Route>

        {/* Add Movie page */}
        <Route path="/api/add">
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}


export default App;
