import Anime from "../classes/Anime";

function parseAnimeData(data: any[]): Anime[] {
    return data.flatMap(a => new Anime(a.title, a.images.jpg.image_url, a.mal_id, a.link));
}

async function fetchFromAPI() {
    const localCache = localStorage.getItem("rawAnimeData");
    let anime: any = undefined;
    if (localCache === null) {
        anime = callAPI();
    } else {
        const lastFetch = localStorage.getItem("rawAnimeData_age");
        if (lastFetch !== null) {
            const fourMonths = 7786800000;
            const age = new Date().valueOf() - new Date(lastFetch).valueOf();
            if (age >= fourMonths) {
                anime = callAPI();
            } else {
                anime = JSON.parse(localCache);
            }
        } else {
            anime = callAPI();
            localStorage.setItem("rawAnimeData_age", new Date().valueOf().toString());
        }
    }
    return parseAnimeData(anime);
}

async function callAPI() {
    const apiCall = await fetch(`https://api.jikan.moe/v4/seasons/now`);
    const animeData = await apiCall.json();
    localStorage.setItem("rawAnimeData", JSON.stringify(animeData.data));
    // console.log(animeData.data);
    return animeData.data;
}

export default fetchFromAPI;