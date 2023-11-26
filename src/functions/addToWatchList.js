import { checkWatchList } from "./checkWatchList";

export const addToWatchList = (starred, setStarred, coin) =>{
    let watchList = JSON.parse(localStorage.getItem("watchListCoins"));
    if (!starred) {
        if (!watchList) {
            watchList = [];
        }
        if(!checkWatchList(coin)){
            watchList.push(coin);
        }
        localStorage.setItem("watchListCoins", JSON.stringify(watchList));
        setStarred(true);
        return true;
    } else {
        watchList = watchList.filter((item) => item.id !== coin.id);
        localStorage.setItem("watchListCoins", JSON.stringify(watchList));
        setStarred(false);
        return false;
    }
}
