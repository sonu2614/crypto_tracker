import React, { useEffect, useState } from "react";
import Header from "../component/Common/Header";
import TabsComponent from "../component/Dashboard/Tabs";
import Search from "../component/Dashboard/Search";
import PaginationComponent from "../component/Dashboard/Pagination";
import Loader from "../component/Common/Loader";
import BackToTop from "../component/Common/BackToTop";
import { get100Coins } from "../functions/get100Coins";

function Dashboard() {
    const [coins, setCoins] = useState([]);
    const [paginatedCoins, setPaginatedCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handlePageChange = (event, value) => {
        setPage(value);
        const prevIndex = (value - 1) * 10;
        setPaginatedCoins(coins.slice(prevIndex, prevIndex + 10));
    };

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredCoins = coins.filter(
        (coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const myCoins = await get100Coins();
        if(myCoins){
            setCoins(myCoins);
            setPaginatedCoins(myCoins.slice(0, 10));
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <BackToTop />
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <Search search={search} onSearchChange={onSearchChange} />
                    <TabsComponent
                        coins={search ? filteredCoins : paginatedCoins}
                    />
                    {!search && (
                        <PaginationComponent
                            page={page}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </div>
            )}
        </>
    );
}

export default Dashboard;
