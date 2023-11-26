import React, { useEffect, useState } from "react";
import Header from "../component/Common/Header";
import TabsComponent from "../component/Dashboard/Tabs";
import BackToTop from "../component/Common/BackToTop";
import { getWatchListData } from "../functions/getWatchListData";
import { Link } from "react-router-dom";
import Button from "../component/Common/Button";

function WatchList() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const myCoins = await getWatchListData();
        if (myCoins) {
            setCoins(myCoins);
        }
    };

    return (
        <>
            <Header />
            <BackToTop />
            <div>
                {coins.length > 0 ? (
                    <TabsComponent coins={coins} />
                ) : (
                    <div className="empty-watchlist">
                        <h3>Nothing in the watchlist :( </h3>
                        <Link to="/dashboard">
                            <Button text="Dashboard" />
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

export default WatchList;
