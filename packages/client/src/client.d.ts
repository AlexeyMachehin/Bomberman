declare const __SERVER_PORT__: number;

declare global {
  interface Array<T> {
    bomberSort(fn: (a, b) => number): T[];
  }
}

export {};
