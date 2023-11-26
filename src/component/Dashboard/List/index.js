import React, { useEffect, useState } from "react";
import "./style.css";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { Tooltip } from "@mui/material";
import { convertNumber } from "../../../functions/convertNumber";
import { addToWatchList } from "../../../functions/addToWatchList";
import { motion } from "framer-motion";
import { checkWatchList } from "../../../functions/checkWatchList";
import { message } from "antd";
function List({ coin, delay }) {
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
        } else coinRemove();
    }
    return (
        <motion.tr
            className="list-row"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
                type: "spring",
                duration: 0.5,
                delay: 0.25 + delay * 0.1,
            }}
        >
            {contextHolder}
            <Tooltip title={coin.name}>
                <td className="td-image">
                    <img
                        src={coin.image}
                        className="coin-logo"
                        alt={coin.name}
                    />
                </td>
            </Tooltip>
            <td>
                <div className="name-col">
                    <Tooltip title="Coin Symbol">
                        <p className="coin-symbol">{coin.symbol}</p>
                    </Tooltip>
                    <Tooltip title="Coin name">
                        <p className="coin-name">{coin.name}</p>
                    </Tooltip>
                </div>
            </td>
            <Tooltip title="Price change in 24hrs">
                <td className="chip-flex">
                    <div className={`price-chip chip-${chipColor}`}>
                        {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                    <div className={`icon-chip td-icon chip-${chipColor}`}>
                        {chipColor === "green" ? (
                            <TrendingUpRoundedIcon />
                        ) : (
                            <TrendingDownRoundedIcon />
                        )}
                    </div>
                </td>
            </Tooltip>
            <Tooltip title="Current price">
                <td className="td-lg">
                    <h3
                        className={`coin-price`}
                        style={{ color: `var(--${chipColor})` }}
                    >
                        ${coin.current_price.toLocaleString()}
                    </h3>
                </td>
            </Tooltip>
            <Tooltip title="Current price">
                <td className="td-sm">
                    <h3
                        className={`coin-price`}
                        style={{ color: `var(--${chipColor})` }}
                    >
                        ${convertNumber(coin.current_price)}
                    </h3>
                </td>
            </Tooltip>
            <Tooltip title="Total volume" className="td-total-volume">
                <td>
                    <p className="total-volume">
                        {coin.total_volume.toLocaleString()}
                    </p>
                </td>
            </Tooltip>
            <Tooltip title="Market cap">
                <td className="td-lg">
                    <p className="total-volume">
                        ${coin.market_cap.toLocaleString()}
                    </p>
                </td>
            </Tooltip>
            <Tooltip title="Market cap">
                <td className="td-sm">
                    <p className="total-volume">
                        ${convertNumber(coin.market_cap)}
                    </p>
                </td>
            </Tooltip>
            <Tooltip
                title={starred ? "Remove from watchlist" : "Add to watchlist"}
            >
                <td className="watchlist-btn">
                    <div
                        className={`add-to-watchlist chip-${chipColor}`}
                        onClick={handleClick}
                    >
                        {!starred ? (
                            <BookmarkAddOutlinedIcon />
                        ) : (
                            <BookmarkRemoveIcon />
                        )}
                    </div>
                </td>
            </Tooltip>
        </motion.tr>
    );
}

export default List;
