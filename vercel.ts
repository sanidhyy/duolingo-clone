import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
	ignoreCommand: "git diff HEAD^ HEAD --quiet . ':!*.md' ':!LICENSE' ':!.env.example' ':!.github' ':!.vscode'",
	trailingSlash: false,
};
