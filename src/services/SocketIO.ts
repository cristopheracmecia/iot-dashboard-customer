import { io } from "socket.io-client";
import { getAccessToken } from "../utils/Token";

const hostConfig = {
  host: "http://localhost",
  port: 3300,
};

export const socket = io(`${hostConfig.host}:${hostConfig.port}`, {
  autoConnect: false,
  query: {
    token: getAccessToken(),
  },
});

export function socketConnect() {
  if (!socket || socket.disconnected) {
    socket.disconnect();
    if (!!socket.io.opts && !!socket.io.opts.query) {
      socket.io.opts.query = {
        token: getAccessToken(),
      };
    }
    socket.connect();
  }
}

export function socketDisconnect() {
  if (socket && socket.connected) {
    socket.disconnect();
  }
}
