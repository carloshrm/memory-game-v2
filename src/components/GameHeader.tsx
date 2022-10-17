import "../styles/GameHeader.css";
interface HeaderProps {
    setDiff: (val: number) => void;
    resetCallback: () => void;
}

function GameHeader({setDiff, resetCallback}: HeaderProps)
{
    return (
    <header id="game_header">
        <h2><a href="./index.html">Anime Memory Game</a></h2>
        <div>
            <label htmlFor="diff">Power Level: </label>
            <select name="diff" onChange={(e: React.ChangeEvent) => setDiff(parseInt((e.currentTarget as HTMLInputElement).value || "8"))}>
                <option value="8">Cartoons?</option>
                <option value="10">Seen AOT</option>
                <option value="12">Seasonal</option>
                <option value="14">Over 9000!</option>
            </select>
            <button onClick={resetCallback}>Stop/Reset</button>
        </div>
    </header>
    );
}

export default GameHeader;