import { useEffect, useState } from "react";
import Anime from "../classes/Anime";
import "../styles/GameBoard.css";
import Card from "./Card";

interface BoardProps {
  start: boolean;
  list: [Anime, boolean][];
  listSetter: (l: [Anime, boolean][]) => void;
}

function GameBoard({start, list, listSetter}: BoardProps) {
  const [tries, setTries] = useState(0);
  const [playerGuess, setGuess] = useState<number>(-1);  

  useEffect(() => {
    setTries(0);
  }, [list]);

  function cardClickHandler(clicked: number)
  {
    if (playerGuess === -1)
      setGuess(clicked);
    else if (playerGuess === clicked)
      return;
    else
    {
      if (list[clicked][0] === list[playerGuess][0])
      {
        list[playerGuess][1] = true;
        list[clicked][1] = true;
        listSetter(list);
      }
      setGuess(-1);
      setTries(tries + 1);
    }
  }

  return (
    <>
        <div id="game_stats">
            <p>Flipped Cards: {tries} </p>
            <p>Remaining Pairs: {list.reduce((i :number, a: [Anime, boolean]) => !a[1] ? i + 1 : i, 0) / 2} </p>
        </div>
        <div id="game_board">
            {start ? list.map((a: [Anime, boolean], i: number) => {
              return <Card key={i} id={i} anime={a[0]} flipped={i === playerGuess} guessed={a[1]} clickHandler={cardClickHandler} />;
            }) : <></>}
        </div>
    </>
  );
}

export default GameBoard;