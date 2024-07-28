/// <reference types="svelte" />

declare global {
  interface Window {
    serverIp: string;
    serverPort: string;
  }
}

export {};
