```mermaid
flowchart TB

    Cron["⏰ Vercel Cron Job /api/cron"] --> Scraper["🤖 Puppeteer Scraper University scraper"]
    Scraper --> Agent["🧠 Gemini Agent Procesa y normaliza datos"]
    Agent --> n1["📧 Notificador de usuarios"] & Services["📄 Services"]
    DB[("🐘 PostgreSQL\nvía Prisma")] --> Matcher["🔍 Base de datos de internships, careers, companies y users"]
    User["👤 Usuario"] --> Clerk["🔐 Clerk Auth"]
    Clerk --> App["🌐 Astro App"]
    App --> Services
    Services --> Repositories["📦 Repositories"]
    Repositories --> DB
    n1 --> Services
```

General Architecture
BuscoPasantías is a monolithic web application built with Astro that serves two main purposes: displaying internships published by UTN FRC and automatically notifying subscribed users when a new internship appears that matches their fields of interest.
The goal is to achive more universities internships to be displayed on BuscoPasantías App.

System Flow
The system has two clearly differentiated flows that coexist within the same monolith.

Automatic flow (cron):
A cron job configured in Vercel periodically triggers the /api/cron endpoint. This endpoint activates a scraper built with Puppeteer that extracts internships published on the UTN FRC website. The raw scraping data is processed and normalized by a Gemini agent, which structures the information before persisting it. Once the data is stored, the app’s services identify which users have fields of interest that match the new internships and send them a notification.

User flow:
The user accesses the app through Astro, authenticates via Clerk, and can browse the list of internships, view the details of each one, and manage their interest alerts. All data operations go through a service layer that delegates persistence to repositories, which interact with PostgreSQL through Prisma.

Internal Layers
The business logic is organized into three layers within src/:

Controllers — entry point for requests, delegate to services.
Services — contain the business logic: career matching, notification generation, cron orchestration.
Repositories — the only layer that interacts with the database, using the Prisma client.

This separation allows the business logic to remain independent from the persistence layer, facilitating testing and future changes of ORM or database.
