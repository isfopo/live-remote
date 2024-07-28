import type { Live } from "./Live";
import type { OutgoingMessage } from "./Message";

export type State = {
  socket: WebSocket | null;
  live: Live;
  send: (message: OutgoingMessage) => void;
  error: string | undefined;
};
