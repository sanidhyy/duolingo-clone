// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // neon db uri
      DATABASE_URL: string;
    }
  }
}
