import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList.jsx'
import MovieDescription from '../MovieDescription/MovieDescription.jsx'

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route path="/description/:id">
          <MovieDescription />
        </Route>

        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;
