import Anime from "../classes/Anime";

function parseAnimeData(data: any[]): Anime[]
{
    return data.flatMap(a => new Anime(a.title, a.images.jpg.image_url, a.mal_id, a.link));
}

async function fetchFromAPI() {
    const localCache = localStorage.getItem("rawAnimeData");
    if (localCache === null)
    {
        const apiCall = await fetch(`https://api.jikan.moe/v4/seasons/now`);
        const animeData = await apiCall.json();
        localStorage.setItem("rawAnimeData", JSON.stringify(animeData.data));
        console.log("api call");        
        console.log(animeData);        
        return parseAnimeData(animeData.data);
    } else
    {
        console.log("local data");     
        return parseAnimeData(JSON.parse(localCache));
    }
}

export default fetchFromAPI