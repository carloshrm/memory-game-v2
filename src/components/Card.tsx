import Anime from "../classes/Anime";
import "../styles/Card.css";

interface CardProps {
    anime: Anime;
    id: number;
    flipped: boolean;
    guessed: boolean
    clickHandler: (a: number) => void;
}

function Card({anime, id, flipped, guessed, clickHandler}: CardProps) {

  function localHandler()
  {
    if (guessed || flipped) 
      return;
    else 
      clickHandler(id);
  }

  return (
    <div onClick={localHandler} className={`game_card ${flipped || guessed ? "" : "hidden"} ${guessed ? "guessed" : ""}`} >
      {flipped || guessed ? 
      <>
        <img src={anime.coverImgURL} alt={`cover art for ${anime.title}`} />
        <p>{anime.title}</p>
      </>
      : <></> }
    </div>
  );
}

export default Card;