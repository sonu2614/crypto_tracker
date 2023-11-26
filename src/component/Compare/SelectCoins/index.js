import React, { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { get100Coins } from "../../../functions/get100Coins";
import "./style.css";

function SelectCoins({ crypto1, crypto2, handleCoinChange }) {
    const [allCoins, setAllCoins] = useState([]);

    const styles = {
        height: "2.5rem",
        color: "var(--white)",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white)",
        },
        "& .MuiSvgIcon-root": {
            color: "var(--white)",
        },
        "&:hover": {
            "&& fieldset": {
                borderColor: "#3a80e9",
            },
        },
    };

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const myCoins = await get100Coins();
        setAllCoins(myCoins);
    }

    return (
        <div className="coins-flex">
            <div className="compare-coin coin-1">
                <p>Crypto 1</p>
                <Select
                    sx={styles}
                    label="Crypto 1"
                    value={crypto1}
                    onChange={(event) => handleCoinChange(event, false)}
                >
                    {allCoins
                        .filter((item) => item.id !== crypto2)
                        .map((coin, i) => (
                            <MenuItem key={i} value={coin.id}>
                                {coin.name}
                            </MenuItem>
                        ))}
                </Select>
            </div>
            <div className="compare-coin coin-2">
                <p>Crypto 2</p>
                <Select
                    sx={styles}
                    label="Crypto 2"
                    value={crypto2}
                    onChange={(event) => handleCoinChange(event, true)}
                >
                    {allCoins
                        .filter((item) => item.id !== crypto1)
                        .map((coin, i) => (
                            <MenuItem key={i} value={coin.id}>
                                {coin.name}
                            </MenuItem>
                        ))}
                </Select>
            </div>
        </div>
    );
}

export default SelectCoins;
