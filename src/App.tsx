import React, { useEffect, useState } from 'react';
import Anime from './classes/Anime';

import fetchFromAPI from './components/APIHelper';
import GameBoard from './components/GameBoard';
import GameHeader from './components/GameHeader';
import './styles/App.css';

function App() {
  const [difficulty, setDifficulty] = useState(6);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [currentList, setCurrentList] = useState<[Anime, boolean][]>([]);
  const [count, setCount] = useState(0);


  useEffect(() => {
    if (allAnime.length === 0) setRawData();
  }, []);

  function startGame() {
    currentListSetup();
  };

  async function setRawData() {
    const animeFromAPI = await fetchFromAPI();
    setAllAnime(animeFromAPI);
  };

  async function currentListSetup() {
    let newList = allAnime.slice(0, difficulty);
    newList = newList.concat(newList);
    var m = newList.length;
    while (m) {
      let i = Math.floor(Math.random() * m--);
      const temp = newList[m];
      newList[m] = newList[i];
      newList[i] = temp;
    }
    setCurrentList(newList.map(x => [x, true]));
    countdown(3);
    await new Promise(w => setTimeout(w, 3000));
    setCurrentList(newList.map(x => [x, false]));
  }

  function countdown(i: number) {
    if (i < 0)
      return;
    else {
      setCount(i);
      setTimeout(() => countdown(i - 1), 1000);
    }
  }

  function resetGame() {
    if (window.confirm("Really reset?"))
      currentListSetup();
  }

  return (
    <div className="App">
      <GameHeader setDiff={setDifficulty} resetCallback={resetGame} />
      {count > 0 ? <h1 id="countdown">Starting in {count}...</h1> : ""}
      {currentList.length > 0
        ? <GameBoard start={currentList.length > 0} list={currentList} listSetter={(l) => setCurrentList(l)} />
        : <fieldset id="explanation">
          <legend> How to play </legend>
          <p>When you start, you have 3 seconds to memorize the cards on the field before they're flipped, keeping the same order. </p>
          <p>After that you just have to find each card and its matching pair in the least amount of tries. </p>
          <p> Choose your power level up above and hit start.</p>
          <button id="start_button" onClick={startGame}>Start!</button>
        </fieldset>
      }
      <footer>
        <p>Made By Carlos Moraes, 2022.</p>
        <a href="https://github.com/carloshrm/memory_game">Source on Github.</a>
        <p>Seasonal anime data from <a href="https://myanimelist.net/">myanimeList.net</a> through <a href="https://jikan.moe">Jikan API.</a></p>
      </footer>
    </div>
  );
}

export default App;
