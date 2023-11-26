import React, { useState } from "react";
import "./style.css";
function CoinInfo({ heading, desc }) {
    const [flag, setFlag] = useState(false);
    const shortDesc =
        desc.slice(0, 350) +
        `...<p style="color: var(--grey);"> Read More...</p>`;
    const longDesc =
        desc + `<p style="color: var(--grey);"> ...Read Less</p>`;
    return (
        <div className="grey-wrapper" style={{ padding: "0rem 1rem" }}>
            <h2 className="coin-info-heading">{heading}</h2>
            {desc.length > 350 ? (
                <p
                    onClick={() => setFlag(!flag)}
                    className="coin-info-desc"
                    dangerouslySetInnerHTML={{
                        __html: flag ? longDesc : shortDesc,
                    }}
                />
            ) : (
                <p
                    className="coin-info-desc"
                    dangerouslySetInnerHTML={{ __html: desc }}
                ></p>
            )}
        </div>
    );
}

export default CoinInfo;
