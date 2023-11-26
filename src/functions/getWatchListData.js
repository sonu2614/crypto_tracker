export const getWatchListData = () =>{
    const data = JSON.parse(localStorage.getItem('watchListCoins'));
    return data;
}