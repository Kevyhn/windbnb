import './App.css';
import {SearchBar} from './components/SearchBar';
import {List} from './components/List';
import data from './data';
import {useState, useEffect} from 'react';

function App() {

  const [stays, setStays] = useState([]);
  const [word, setWord] = useState([]);

  useEffect(() => {
    setStays(data);
  }, []);

  const staysFilter = (e) => setWord(e.target.value);

  return (
    <div className="App">
      <header className="App-header">
        <div className="Logo">
          <img src={require('./images/logo.png')} alt="Windbnb"/>
        </div>
        <SearchBar staysFilter={staysFilter} word={word} setStays={setStays}/>
      </header> 
      <main className="App-main">
        <div className="info">
          <h2>Stays in Finland</h2>
          <span>
            {stays.length <= 2 ? stays.length : `+${stays.length - 2}`} stays
          </span>
        </div>
        {stays.length <= 0 ? (
          <div class="spinner"></div>
        ) : <List stays={stays}/>}
      </main>
      <footer>created by <a href="https://github.com/Kevyhn/">Kevynh</a> - devChallenges.io</footer>
    </div>
  );
}

export default App;