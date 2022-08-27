import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList.jsx';
import MovieDescription from '../MovieDescription/MovieDescription.jsx';
import AddMovie from '../AddMovie/AddMovie.jsx';

function App() {


  // const homePage = () => {
  //   history.pushState('/')
  // }

  return (
    <div className="App">
      {/* <Navbar /> */}
 
      

      <Router>  
      <nav>
        <div className='header-container'>
        <div className='customLogo'></div>
          <div className='nav-buttons'>
          {/* <button className="neon-button" onClick={returnHome}>
            Home
          </button>
          <button className="neon-button" onClick={addPage}>
            Add Movie
          </button> */}
            <button className='neon-button'><Link className='neon-button-text' to='/'>HOME</Link></button>
            <button className='neon-button'><Link className='neon-button-text' to='/api/add'>ADD MOVIE</Link></button>
          </div>
        </div>
      </nav>
      <h1 className='app-header'>THE <span className='outline-text'>MOVIES</span> SAGA</h1>
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route path="/api/description/:id" >
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
