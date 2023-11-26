import React, { useEffect, useState } from "react";
import "./style.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { motion } from "framer-motion";
import { checkWatchList } from "../../../functions/checkWatchList";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { addToWatchList } from "../../../functions/addToWatchList";
import { Tooltip } from "@mui/material";
import { message } from "antd";
function Grid({ coin, delay }) {
    const [starred, setStarred] = useState(false);
    const chipColor = coin.price_change_percentage_24h > 0 ? "green" : "red";

    const [messageApi, contextHolder] = message.useMessage();
    const coinAdd = () => {
        messageApi.open({
            type: "success",
            content: "Successfully added to the watchlist",
        });
    };

    const coinRemove = () => {
        messageApi.open({
            type: "success",
            content: "Successfully removed from the watchlist",
        });
    };

    useEffect(() => {
        checkStarred();
    }, [coin]);

    function checkStarred() {
        setStarred(checkWatchList(coin));
    }
    function handleClick(e) {
        e.preventDefault();
        if (addToWatchList(starred, setStarred, coin)) {
            coinAdd();
        }
        else coinRemove();
    }

    return (
        <motion.div
            className={`grid-container grid-container-${chipColor}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                type: "spring",
                duration: 1,
                delay: 0.25 + delay * 0.1,
            }}
        >
            {contextHolder}
            <div className="info-flex">
                <img src={coin.image} className="coin-logo" alt={coin.name} />
                <div className="name-col">
                    <p className="coin-symbol">{coin.symbol}</p>
                    <p className="coin-name">{coin.name}</p>
                </div>
                <Tooltip
                    title={
                        starred ? "Remove from watchlist" : "Add to watchlist"
                    }
                >
                    <div
                        className={`add-to-watchlist chip-${chipColor}`}
                        onClick={(e) => handleClick(e)}
                    >
                        {!starred ? (
                            <BookmarkAddOutlinedIcon />
                        ) : (
                            <BookmarkRemoveIcon />
                        )}
                    </div>
                </Tooltip>
            </div>
            <Tooltip title="Price change in 24hrs">
                <div className="chip-flex">
                    <div className={`price-chip chip-${chipColor}`}>
                        {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                    <div className={`icon-chip chip-${chipColor}`}>
                        {chipColor === "green" ? (
                            <TrendingUpRoundedIcon />
                        ) : (
                            <TrendingDownRoundedIcon />
                        )}
                    </div>
                </div>
            </Tooltip>
            <div className="info-container">
                <Tooltip title="Current price">
                    <h3
                        className={`coin-price`}
                        style={{ color: `var(--${chipColor})` }}
                    >
                        ${coin.current_price.toLocaleString()}
                    </h3>
                </Tooltip>
                <p className="total-volume">
                    Total Volume : {coin.total_volume.toLocaleString()}
                </p>
                <p className="total-volume">
                    Market Cap : ${coin.market_cap.toLocaleString()}
                </p>
            </div>
        </motion.div>
    );
}

export default Grid;
