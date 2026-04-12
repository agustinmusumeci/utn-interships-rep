<div align="center">

<!-- ![GithubImage](https://github.com/agustinmusumeci/agustinmusumeci/blob/main/GithubProfileImage.png?raw=true "Title") -->

# BuscoPasantías App

Web App w/Astro & Prisma for looking into the internships of Universidad Tecnológica Nacional FRC, and more in the future, and notifying the subscription users in case of intertest match.

</div>

## 🚀 Project structure

```text
/
├── public/
├── prisma/
│   ├── migrations/
│   ├── zod/
│   ├── schema.prisma
│   └── seed.ts
│
├── src
│   ├── actions/
│   ├── agents/
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── images/
│   ├── interfaces/
│   ├── layouts/
│   ├── lib/
│   ├── mock/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── internships/
│   │   │   ├── [id].astro
│   │   │   └── index.astro
│   │   ├── alerts/
│   │   │   └── index.astro
│   │   └── api/
│   │       └── cron/
│   │           └── index.ts
│   │
│   ├── schemas/
│   ├── styles/
│   ├── templates/
│   ├── utils/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   └── middleware.ts
│
└── package.json
└── .env
└── astro.config.mjs
└── components.json
└── prisma-config.ts
└── tsconfig.ts
```

## ⚙️ Stack

| Tech                         | Purpose                         | Version          |
| ---------------------------- | ------------------------------- | ---------------- |
| Astro                        | Fullstack framework             | ^6.0.6           |
| React (as Astro integration) | Frontend framework              | ^5.0.2           |
| TailwindCSS                  | Styles                          | ^4.2.2           |
| ShadCS                       | Components Library              | ^4.1.1           |
| TypeScript                   | Static Typing                   | Not specified    |
| Zod                          | Dynamic Typing                  | ^4.3.6           |
| Postgresql                   | DBMS                            | Not specified    |
| Prisma                       | ORM                             | ^7.5.0           |
| Puppeteer                    | Bot & Web Scraper               | ^24.39.1         |
| Gemini Agent                 | Data processing of scraped data | Gemini 2.5 Flash |
| Clerk (as Astro integration) | Auth and user handling          | ^3.0.6           |

## Enviroment Variables

| Var                          | Description                                                              | Usage            |
| ---------------------------- | ------------------------------------------------------------------------ | ---------------- |
| DATABASE_URL                 | URL for PostgreSQL connection                                            | postgresql://... |
| SCRAPER_URL                  | URL for web internship scraper                                           | https://...      |
| PUBLIC_CLERK_PUBLISHABLE_KEY | Clerk Auth public API key                                                | pk*...*...       |
| CLERK_SECRET_KEY             | Clerck Auth private/secret API key                                       | sk*...*...       |
| GEMINI_API_KEY               | Gemini API key for raw internships text processing                       | ...              |
| EMAILJS_SERVICE_ID           | Mail service ID from EmailJS                                             | ...              |
| EMAILJS_TEMPLATE_ID          | Mail template ID from EmailJS                                            | ...              |
| EMAILJS_PUBLIC_KEY           | Public API key from EmailJS                                              | ...              |
| EMAILJS_PRIVATE_KEY          | Private API key from EmailJS                                             | ...              |
| CRON_SECRET                  | Cron job API key for scraping internships and notifying suscripted users | ...              |

## 🧞 Available commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
