import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../component/Common/Loader";
import Header from "../component/Common/Header";
import { coinObject } from "../functions/convertObject";
import List from "../component/Dashboard/List";
import CoinInfo from "../component/Coin/CoinInfo";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import LineChart from "../component/Coin/LineChart";
import SelectDays from "../component/Coin/SelectDays";
import { settingChartData } from "../functions/settingChartData";
import TogglePriceType from "../component/Coin/PriceType";

function CoinPage() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState();
    const [days, setDays] = useState(30);
    const [chartData, setChartData] = useState({});
    const [priceType, setPriceType] = useState("prices");

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);

    async function getData() {
        const data = await getCoinData(id);

        if (data) {
            coinObject(setCoinData, data);
            const prices = await getCoinPrices(id, days, priceType);
            if (prices) {
                settingChartData(setChartData, prices);
                setIsLoading(false);
            }
        }
    }

    const handleDaysChange = async (event) => {
        setIsLoading(true);
        setDays(event.target.value);
        const prices = await getCoinPrices(id, event.target.value, priceType);
        if (prices) {
            settingChartData(setChartData, prices);
            setIsLoading(false);
        }
    };

    const handlePriceTypeChange = async (event, newType) => {
        if(!newType) return;
        setIsLoading(true);
        setPriceType(newType);
        const prices = await getCoinPrices(id, days, newType);
        if (prices) {
            settingChartData(setChartData, prices);
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="grey-wrapper" style={{ padding: "0 1rem" }}>
                        <List coin={coinData} />
                    </div>
                    <div className="grey-wrapper">
                        <SelectDays
                            days={days}
                            handleDaysChange={handleDaysChange}
                        />
                        <TogglePriceType
                            priceType={priceType}
                            handlePriceTypeChange={handlePriceTypeChange}
                        />
                        <LineChart
                            chartData={chartData}
                            priceType={priceType}
                        />
                    </div>
                    <CoinInfo heading={coinData.name} desc={coinData.desc} />
                </>
            )}
        </>
    );
}

export default CoinPage;
