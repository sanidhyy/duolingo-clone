// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // neon db uri
      DATABASE_URL: string;

      // stripe api key
      STRIPE_API_SECRET_KEY: string;

      // public app url
      NEXT_PUBLIC_APP_URL: string;
    }
  }
}
