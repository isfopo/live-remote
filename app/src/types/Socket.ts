export interface SocketHost {
  url: string;
  name: string;
  socket: WebSocket;
}

export type Candidate = Omit<SocketHost, "socket">;
