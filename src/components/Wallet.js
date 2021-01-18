import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWallet } from "../actions";

const Wallet = ({ BALANCE, executionReport, symbol, fiat }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("From Wallet", "Render");
    dispatch(fetchWallet());
  }, [executionReport]);

  const renderList = BALANCE?.map((acc) => {
    if (
      (acc && acc.free > 0 && acc.asset === symbol?.replace(fiat, "")) ||
      acc.asset === fiat
    ) {
      return (
        <tr key={acc.asset} data-bound={acc.asset}>
          <td data-label="Name">
            <div>
              <span
                style={{ marginRight: "5px" }}
                className="iconify"
                data-icon={`cryptocurrency:${acc.asset.toLowerCase()}`}
                data-inline="false"
              ></span>
              {acc.asset}
            </div>
          </td>
          <td data-label="Ammount">
            <div>{acc.free}</div>
          </td>
          <td data-label="Locked">
            {acc.locked > 0 ? (
              <div>{parseFloat(acc.locked).toFixed(2)}</div>
            ) : (
              <div>N/A</div>
            )}
          </td>
        </tr>
      );
    }

    return null;
  });

  return (
    <div>
      {BALANCE && symbol ? (
        <table
          className="ui selectable celled table"
          style={{ maxWidth: "300px" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Ammount</th>
              <th>Locked</th>
            </tr>
          </thead>
          <tbody>{renderList}</tbody>
        </table>
      ) : (
        <div
          className="ui segment"
          style={{ minHeight: "300px", maxWidth: "265px" }}
        >
          <div className="ui active loader"></div>
          <p></p>
        </div>
      )}
    </div>
  );
};

export default Wallet;
