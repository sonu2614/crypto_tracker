export const checkWatchList = (coin) =>{
    let watchList = JSON.parse(localStorage.getItem("watchListCoins"));
    if(!watchList) return false;
    for(const item of watchList){
        if(item.id === coin.id){
            return true;
        }
    }
    return false;
}