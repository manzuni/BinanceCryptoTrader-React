// These only return messages
// eslint-disable-next-line
export default (state = [], action) => {
  switch (action.type) {
    case "SOCKET_CONNECT":
      return action;
    case "SOCKET_CONNECTED":
      return action.payload;
    case "SOCKET_DISCONNECT":
      return action;
    case "SOCKET_DISCONNECTED":
      return action.payload;
    case "SOCKET_MESSAGE":
      return action.payload;

    default:
      return state;
  }
};
