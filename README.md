<a name="readme-top"></a>

# Lingo - Interactive platform for language learning.

![Lingo - Interactive platform for language learning.](/.github/images/img_main.png "Lingo - Interactive platform for language learning.")

[![Ask Me Anything!](https://flat.badgen.net/static/Ask%20me/anything?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy "Ask Me Anything!")
[![GitHub license](https://flat.badgen.net/github/license/sanidhyy/duolingo-clone?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/duolingo-clone/blob/main/LICENSE "GitHub license")
[![Maintenance](https://flat.badgen.net/static/Maintained/yes?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/duolingo-clone/commits/main "Maintenance")
[![GitHub branches](https://flat.badgen.net/github/branches/sanidhyy/duolingo-clone?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/duolingo-clone/branches "GitHub branches")
[![Github commits](https://flat.badgen.net/github/commits/sanidhyy/duolingo-clone?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/duolingo-clone/commits "Github commits")
[![GitHub issues](https://flat.badgen.net/github/issues/sanidhyy/duolingo-clone?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/duolingo-clone/issues "GitHub issues")
[![GitHub pull requests](https://flat.badgen.net/github/prs/sanidhyy/duolingo-clone?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/duolingo-clone/pulls "GitHub pull requests")
[![Vercel status](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://lingo-clone.vercel.app/ "Vercel status")

<!-- Table of Contents -->
<details>

<summary>

# :notebook_with_decorative_cover: Table of Contents

</summary>

- [Folder Structure](#bangbang-folder-structure)
- [Getting Started](#toolbox-getting-started)
- [Screenshots](#camera-screenshots)
- [Tech Stack](#gear-tech-stack)
- [Stats](#wrench-stats)
- [Contribute](#raised_hands-contribute)
- [Acknowledgements](#gem-acknowledgements)
- [Buy Me a Coffee](#coffee-buy-me-a-coffee)
- [Follow Me](#rocket-follow-me)
- [Learn More](#books-learn-more)
- [Deploy on Vercel](#page_with_curl-deploy-on-vercel)
- [Give A Star](#star-give-a-star)
- [Star History](#star2-star-history)
- [Give A Star](#star-give-a-star)

</details>

## :bangbang: Folder Structure

Here is the folder structure of this app.

```bash
duolingo-clone/
  |- actions/
    |- challenge-progress.ts
    |- user-progress.ts
    |- user-subscription.ts
  |- app/
    |-- (main)/
        |--- courses/
        |--- leaderboard/
        |--- learn/
        |--- quests/
        |--- shop/
        |--- layout.tsx
    |-- (marketing)/
        |--- footer.tsx
        |--- header.tsx
        |--- layout.tsx
        |--- page.tsx
    |-- admin/
        |--- challenge/
        |--- challengeOption/
        |--- course/
        |--- lesson/
        |--- unit/
        |--- app.tsx
        |--- page.tsx
    |-- api/
        |--- challengeOptions/
        |--- challenges/
        |--- courses/
        |--- lessons/
        |--- units/
        |--- webhooks/stripe/
    |-- lesson/
        |--- [lessonId]/
        |--- card.tsx
        |--- challenge.tsx
        |--- footer.tsx
        |--- header.tsx
        |--- layout.tsx
        |--- page.tsx
        |--- question-bubble.tsx
        |--- quiz.tsx
        |--- result-card.tsx
    |-- apple-icon.png
    |-- favicon.ico
    |-- globals.css
    |-- icon1.png
    |-- icon2.png
    |-- layout.tsx
  |- components/
    |-- modals/
    |-- ui/
    |-- feed-wrapper.tsx
    |-- mobile-wrapper.tsx
    |-- mobile-sidebar.tsx
    |-- promo.tsx
    |-- quests.tsx
    |-- sidebar-item.tsx
    |-- sidebar.tsx
    |-- sticky-wrapper.tsx
    |-- user-progress.tsx
  |- config/
    |-- index.ts
  |- db/
    |-- drizzle.ts
    |-- queries.ts
    |-- schema.ts
  |- lib/
    |-- admin.ts
    |-- stripe.ts
    |-- utils.ts
  |- public/
  |- scripts/
    |-- prod.ts
    |-- reset.ts
    |-- seed.ts
  |- store/
    |-- use-exit-modal.ts
    |-- use-hearts-modal.ts
    |-- use-practice-modal.ts
  |- types/
    |-- canvas.ts
  |- .env
  |- .env.example
  |- .gitignore
  |- .prettierrc.json
  |- bun.lock
  |- components.json
  |- constants.ts
  |- drizzle.config.ts
  |- environment.d.ts
  |- eslint.config.mjs
  |- middleware.ts
  |- next.config.ts
  |- package.json
  |- postcss.config.js
  |- tailwind.config.ts
  |- tsconfig.json
```

<br />

## :toolbox: Getting Started

1. Make sure **Git** and **NodeJS** is installed.
2. Clone this repository to your local computer.
3. Create `.env` file in **root** directory.
4. Contents of `.env`:

```env
# .env

# disabled next.js telemetry
NEXT_TELEMETRY_DISABLED=1

# clerk auth keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# neon db uri
DATABASE_URL="postgresql://<user>:<password>@<host>:<post>/lingo?sslmode=require"

# stripe api key and webhook
STRIPE_API_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# public app url
NEXT_PUBLIC_APP_URL=http://localhost:3000

# clerk admin user id(s) separated by comma and space (, )
CLERK_ADMIN_IDS="user_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
# or CLERK_ADMIN_IDS="user_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx, user_xxxxxxxxxxxxxxxxxxxxxx" for multiple admins.

```

5. Obtain Clerk Authentication Keys
   1. **Source**: Clerk Dashboard or Settings Page
   2. **Procedure**:
      - Log in to your Clerk account.
      - Navigate to the dashboard or settings page.
      - Look for the section related to authentication keys.
      - Copy the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` provided in that section.

6. Retrieve Neon Database URI
   1. **Source**: Database Provider (e.g., Neon, PostgreSQL)
   2. **Procedure**:
      - Access your database provider's platform or configuration.
      - Locate the database connection details.
      - Replace `<user>`, `<password>`, `<host>`, and `<port>` placeholders in the URI with your actual database credentials.
      - Ensure to include `?sslmode=require` at the end of the URI for SSL mode requirement.

7. Fetch Stripe API Key and Webhook Secret
   1. **Source**: Stripe Dashboard
   2. **Procedure**:
      - Log in to your Stripe account.
      - Navigate to the dashboard or API settings.
      - Find the section related to API keys and webhook secrets.
      - Copy the `STRIPE_API_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.

8. Specify Public App URL
   1. **Procedure**:
      - Replace `http://localhost:3000` with the URL of your deployed application.

9. Identify Clerk Admin User IDs
   1. **Source**: Clerk Dashboard or Settings Page
   2. **Procedure**:
      - Log in to your Clerk account.
      - Navigate to the dashboard or settings page.
      - Find the section related to admin user IDs.
      - Copy the user IDs provided, ensuring they are separated by commas and spaces.

10. Save and Secure:
    - Save the changes to the `.env` file.

11. Install Project Dependencies using `bun install --legacy-peer-deps`.

12. Run the Seed Script:

In the same terminal, run the following command to execute the seed script:

```bash
bun run db:push && bun run db:prod
```

This command uses `bun` to execute the Typescript file (`scripts/prod.ts`) and writes challenges data in database.

13. Verify Data in Database:

Once the script completes, check your database to ensure that the challenges data has been successfully seeded.

14. Now app is fully configured 👍 and you can start using this app using either one of `bun dev`.

**NOTE:** Please make sure to keep your API keys and configuration values secure and do not expose them publicly.

## :camera: Screenshots

![Modern UI/UX](/.github/images/img1.png "Modern UI/UX")

![Quests](/.github/images/img2.png "Quests")

![Shop](/.github/images/img3.png "Shop")

## :gear: Tech Stack

[![React JS](https://skillicons.dev/icons?i=react "React JS")](https://react.dev/ "React JS") [![Next JS](https://skillicons.dev/icons?i=next "Next JS")](https://nextjs.org/ "Next JS") [![Typescript](https://skillicons.dev/icons?i=ts "Typescript")](https://www.typescriptlang.org/ "Typescript") [![Tailwind CSS](https://skillicons.dev/icons?i=tailwind "Tailwind CSS")](https://tailwindcss.com/ "Tailwind CSS") [![Vercel](https://skillicons.dev/icons?i=vercel "Vercel")](https://vercel.app/ "Vercel") [![Postgresql](https://skillicons.dev/icons?i=postgres "Postgresql")](https://www.postgresql.org/ "Postgresql")

## :wrench: Stats

[![Stats for Lingo](/.github/images/stats.svg "Stats for Lingo")](https://pagespeed.web.dev/analysis?url=https://lingo-clone.vercel.app/ "Stats for Lingo")

## :raised_hands: Contribute

You might encounter some bugs while using this app. You are more than welcome to contribute. Just submit changes via pull request and I will review them before merging. Make sure you follow community guidelines.

## :gem: Acknowledgements

Useful resources and dependencies that are used in Lingo.

- Special Thanks to Code with Antonio: https://codewithantonio.com/
- Kenney Assets: https://kenney.nl/
- Freesound: https://freesound.org/
- Elevenlabs AI: https://elevenlabs.io/
- Flagpack: https://flagpack.xyz/

<!-- DEPENDENCIES_START -->
- [@clerk/nextjs](https://www.npmjs.com/package/@clerk/nextjs): ^6.38.0
- [@eslint/eslintrc](https://www.npmjs.com/package/@eslint/eslintrc): ^3
- [@neondatabase/serverless](https://www.npmjs.com/package/@neondatabase/serverless): ^1.0.2
- [@radix-ui/react-avatar](https://www.npmjs.com/package/@radix-ui/react-avatar): ^1.1.11
- [@radix-ui/react-dialog](https://www.npmjs.com/package/@radix-ui/react-dialog): ^1.1.15
- [@radix-ui/react-progress](https://www.npmjs.com/package/@radix-ui/react-progress): ^1.1.8
- [@radix-ui/react-separator](https://www.npmjs.com/package/@radix-ui/react-separator): ^1.1.8
- [@radix-ui/react-slot](https://www.npmjs.com/package/@radix-ui/react-slot): ^1.2.4
- [@types/node](https://www.npmjs.com/package/@types/node): ^25.3.0
- [@types/react](https://www.npmjs.com/package/@types/react): ^19.2.14
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom): ^19.2.3
- [autoprefixer](https://www.npmjs.com/package/autoprefixer): ^10.4.24
- [class-variance-authority](https://www.npmjs.com/package/class-variance-authority): ^0.7.1
- [clsx](https://www.npmjs.com/package/clsx): ^2.1.0
- [dotenv](https://www.npmjs.com/package/dotenv): ^17.3.1
- [drizzle-kit](https://www.npmjs.com/package/drizzle-kit): ^0.31.9
- [drizzle-orm](https://www.npmjs.com/package/drizzle-orm): ^0.45.1
- [eslint](https://www.npmjs.com/package/eslint): ^9
- [eslint-config-next](https://www.npmjs.com/package/eslint-config-next): 15.5.10
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier): ^9.1.0
- [lucide-react](https://www.npmjs.com/package/lucide-react): ^0.575.0
- [next](https://www.npmjs.com/package/next): ^15.5.10
- [pg](https://www.npmjs.com/package/pg): ^8.18.0
- [postcss](https://www.npmjs.com/package/postcss): ^8
- [prettier](https://www.npmjs.com/package/prettier): ^3.8.1
- [prettier-plugin-tailwindcss](https://www.npmjs.com/package/prettier-plugin-tailwindcss): ^0.5.14
- [ra-data-simple-rest](https://www.npmjs.com/package/ra-data-simple-rest): ^5.14.2
- [react](https://www.npmjs.com/package/react): ^19.2.4
- [react-admin](https://www.npmjs.com/package/react-admin): ^4.16.20
- [react-circular-progressbar](https://www.npmjs.com/package/react-circular-progressbar): ^2.2.0
- [react-confetti](https://www.npmjs.com/package/react-confetti): ^6.4.0
- [react-dom](https://www.npmjs.com/package/react-dom): ^19.2.4
- [react-use](https://www.npmjs.com/package/react-use): ^17.6.0
- [sonner](https://www.npmjs.com/package/sonner): ^2.0.7
- [stripe](https://www.npmjs.com/package/stripe): ^20.3.1
- [tailwind-merge](https://www.npmjs.com/package/tailwind-merge): ^2.6.1
- [tailwindcss](https://www.npmjs.com/package/tailwindcss): ^3.4.19
- [tailwindcss-animate](https://www.npmjs.com/package/tailwindcss-animate): ^1.0.7
- [tsx](https://www.npmjs.com/package/tsx): ^4.21.0
- [typescript](https://www.npmjs.com/package/typescript): ^5
- [zustand](https://www.npmjs.com/package/zustand): ^5.0.11

<!-- DEPENDENCIES_END -->

## :coffee: Buy Me a Coffee

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/sanidhy "Buy me a Coffee")

## :rocket: Follow Me

[![Follow Me](https://img.shields.io/github/followers/sanidhyy?style=social&label=Follow&maxAge=2592000)](https://github.com/sanidhyy "Follow Me")
[![Tweet about this project](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fx.com%2F_sanidhyy)](https://x.com/intent/tweet?text=Check+out+this+amazing+app:&url=https%3A%2F%2Fgithub.com%2Fsanidhyy%2Fduolingo-clone "Tweet about this project")

## :books: Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## :page_with_curl: Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## :star: Give A Star

You can also give this repository a star to show more people and they can use this repository.

## :star2: Star History

<a href="https://star-history.com/#sanidhyy/duolingo-clone&Timeline">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=sanidhyy/duolingo-clone&type=Timeline&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=sanidhyy/duolingo-clone&type=Timeline" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=sanidhyy/duolingo-clone&type=Timeline" />
</picture>
</a>

<br />
<p align="right">(<a href="#readme-top">back to top</a>)</p>
