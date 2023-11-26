import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ThemeProvider, createTheme } from "@mui/material";
import Grid from "../Grid";
import "./style.css";
import List from "../List";
import { Link } from "react-router-dom";
export default function TabsComponent({ coins }) {
    const [value, setValue] = useState("grid");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const style = {
        color: "var(--white)",
        width: "50vw",
        fontSize: "1.2rem",
        fontWeight: 600,
        textTransform: "Capitalize",
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#3a80e9",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <TabContext value={value}>
                <TabList onChange={handleChange} variant="fullWidth">
                    <Tab label="Grid" value="grid" sx={style} />
                    <Tab label="List" value="list" sx={style} />
                </TabList>
                <TabPanel value="grid">
                    <div className="grid-flex">
                        {coins.map((coin, i) => (
                            <Link to={`/coin/${coin.id}`}>
                                <Grid coin={coin} key={i} delay={((i + 1) * 3) / 7} />
                            </Link>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel value="list" className="table-wrapper">
                    <table className="list-table">
                        {coins.map((coin, i) => (
                            <Link to={`/coin/${coin.id}`}>
                                <List coin={coin} key={i} delay={((i + 1) * 3) / 7}/>
                            </Link>
                        ))}
                    </table>
                </TabPanel>
            </TabContext>
        </ThemeProvider>
    );
}
