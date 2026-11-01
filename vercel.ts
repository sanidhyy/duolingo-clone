import type { VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  ignoreCommand: "exit 1",
  trailingSlash: false,
};
