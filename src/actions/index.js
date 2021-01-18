import CryptoJS from "crypto-js";
import binance from "../components/api/binance";

export const fetchWallet = () => async (dispatch) => {
  const query = `timestamp=${Date.now()}`;
  const hash = CryptoJS.HmacSHA256(query, process.env.REACT_APP_API_SECRET);

  const response = await binance.get(`/account?${query}&signature=${hash}`);
  dispatch({ type: "FETCH_WALLET", payload: response.data });
  //console.log("Fetched wallet", response.data);
};
export const tradeOrder = (side, symbol, qt, price, type = "LIMIT") => async (
  dispatch
) => {
  const query = `symbol=${symbol}&side=${side}&type=${type}&quantity=${qt}&price=${price}&timeInForce=GTC&timestamp=${Date.now()}`;
  const hash = CryptoJS.HmacSHA256(query, process.env.REACT_APP_API_SECRET);

  const response = await binance.post(`/order?${query}&signature=${hash}`); // must be POST

  dispatch({ type: `${side}_ORDER`, payload: response.data }); // BUY_ORDER or SELL_ORDER effectively
  console.log(response.data);
};
export const activeOrder = (symbol) => async (dispatch) => {
  const query = `symbol=${symbol}&timestamp=${Date.now()}`;
  const hash = CryptoJS.HmacSHA256(query, process.env.REACT_APP_API_SECRET);

  const response = await binance.get(`/openOrders?${query}&signature=${hash}`); // must be GET
  dispatch({ type: `ACTIVE_ORDER`, payload: response.data }); // BUY_ORDER or SELL_ORDER effectively
  //console.log(response.data);
};
export const cancelOrder = (orderId, symbol) => async (dispatch) => {
  const query = `symbol=${symbol}&orderId=${orderId}&timestamp=${Date.now()}`;
  const hash = CryptoJS.HmacSHA256(query, process.env.REACT_APP_API_SECRET);

  const response = await binance.delete(`/order?${query}&signature=${hash}`); // must be DELETE
  dispatch({ type: `CANCEL_ORDER`, payload: response.data });
  //console.log(response.data);
};

// Config Reducer - Actions
export const storeFiat = (fiat) => async (dispatch) => {
  dispatch({ type: `STORE_FIAT`, payload: fiat });
  //console.log(response.data);
};
export const storeSymbol = (symbol) => async (dispatch) => {
  dispatch({ type: `STORE_SYMBOL`, payload: symbol });
  //console.log(response.data);
};
export const storePair = (pair) => async (dispatch) => {
  dispatch({ type: `STORE_PAIR`, payload: pair });
  //console.log(response.data);
};

// Report Reducer - Actions
export const storeExecutionReport = (data) => async (dispatch) => {
  dispatch({ type: `executionReport`, payload: data });
  //console.log(response.data);
};
export const storeOutboundAccountPosition = (data) => async (dispatch) => {
  dispatch({
    type: `outboundAccountPosition`,
    payload: data,
  });
  //console.log(response.data);
};
