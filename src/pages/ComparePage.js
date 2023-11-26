import React, { useEffect, useState } from "react";
import Header from "../component/Common/Header";
import SelectCoins from "../component/Compare/SelectCoins";
import SelectDays from "../component/Coin/SelectDays";
import { getCoinData } from "../functions/getCoinData";
import { coinObject } from "../functions/convertObject";
import { settingChartData } from "../functions/settingChartData";
import { getCoinPrices } from "../functions/getCoinPrices";
import Loader from "../component/Common/Loader";
import List from "../component/Dashboard/List";
import CoinInfo from "../component/Coin/CoinInfo";
import LineChart from "../component/Coin/LineChart";
import TogglePriceType from "../component/Coin/PriceType";
function ComparePage() {
    const [crypto1, setCrypto1] = useState("bitcoin");
    const [crypto2, setCrypto2] = useState("ethereum");
    const [crypto1Data, setCrypto1Data] = useState({});
    const [crypto2Data, setCrypto2Data] = useState({});
    const [days, setDays] = useState(30);
    const [isLoading, setIsLoading] = useState(true);
    const [priceType, setPriceType] = useState("prices");
    const [chartData, setChartData] = useState({});
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setIsLoading(true);
        const data1 = await getCoinData(crypto1);
        if (data1) {
            const data2 = await getCoinData(crypto2);
            coinObject(setCrypto1Data, data1);
            if (data2) {
                coinObject(setCrypto2Data, data2);
                const prices1 = await getCoinPrices(crypto1, days, priceType);
                const prices2 = await getCoinPrices(crypto2, days, priceType);
                settingChartData(
                    setChartData,
                    prices1,
                    prices2,
                    data1.name,
                    data2.name
                );
                setFlag(true);
                setIsLoading(false);
            }
        }
    }

    const handleCoinChange = async (event, isCoin2) => {
        const id = event.target.value;
        setIsLoading(true);
        if (isCoin2) {
            setCrypto2(id);
            const data = await getCoinData(id);
            coinObject(setCrypto2Data, data);
        } else {
            setCrypto1(id);
            const data = await getCoinData(id);
            coinObject(setCrypto1Data, data);
        }
    };

    useEffect(() => {
        if(flag){
            async function run(){
                const prices1 = await getCoinPrices(crypto1, days, priceType);
                const prices2 = await getCoinPrices(crypto2, days, priceType);
                if (prices1 && prices2) {
                    settingChartData(
                        setChartData,
                        prices1,
                        prices2,
                        crypto1Data.name,
                        crypto2Data.name
                    );
                    setIsLoading(false);
                }
            }
            run();
        }
    }, [crypto1Data, crypto2Data])

    async function handleDaysChange(event) {
        setIsLoading(true);
        setDays(event.target.value);
        const prices1 = await getCoinPrices(
            crypto1,
            event.target.value,
            priceType
        );
        const prices2 = await getCoinPrices(
            crypto2,
            event.target.value,
            priceType
        );
        settingChartData(
            setChartData,
            prices1,
            prices2,
            crypto1Data.name,
            crypto2Data.name
        );
        setIsLoading(false);
    }

    const handlePriceTypeChange = async (event, newType) => {
        if (!newType) return;
        setIsLoading(true);
        setPriceType(newType);
        const prices1 = await getCoinPrices(crypto1, days, newType);
        const prices2 = await getCoinPrices(crypto2, days, newType);
        settingChartData(
            setChartData,
            prices1,
            prices2,
            crypto1Data.name,
            crypto2Data.name
        );
        setIsLoading(false);
    };

    return (
        <div>
            <Header />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="coins-days-flex">
                        <SelectCoins
                            crypto1={crypto1}
                            crypto2={crypto2}
                            handleCoinChange={handleCoinChange}
                        />
                        <SelectDays
                            days={days}
                            handleDaysChange={handleDaysChange}
                            noPTag={true}
                        />
                    </div>
                    <div className="grey-wrapper" style={{ padding: "0 1rem" }}>
                        <List coin={crypto1Data} />
                    </div>
                    <div className="grey-wrapper" style={{ padding: "0 1rem" }}>
                        <List coin={crypto2Data} />
                    </div>
                    <div className="grey-wrapper">
                        <TogglePriceType
                            priceType={priceType}
                            handlePriceTypeChange={handlePriceTypeChange}
                        />
                        <LineChart
                            chartData={chartData}
                            priceType={priceType}
                            multiAxis={true}
                        />
                    </div>
                    <CoinInfo
                        heading={crypto1Data.name}
                        desc={crypto1Data.desc}
                    />
                    <CoinInfo
                        heading={crypto2Data.name}
                        desc={crypto2Data.desc}
                    />
                </>
            )}
        </div>
    );
}

export default ComparePage;
