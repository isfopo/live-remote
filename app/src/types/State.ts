import type { Live } from "./Live";
import type { OutgoingMessage } from "./Message";

export type State = {
  socket: WebSocket | null;
  live: Live;
  connect: () => void;
  send: (message: OutgoingMessage) => void;
};
