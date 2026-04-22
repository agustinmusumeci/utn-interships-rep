```mermaid
erDiagram
  Company ||--o{ Internship : "HasMany"
  Internship ||--o{ InternshipCareer : "HasMany"
  Internship ||--o{ University : "Includes"
  Career ||--o{ InternshipCareer : "Includes"
  User ||--o{ UserCareer : "Suscripted to"
  Career ||--o{ UserCareer : "Includes"
  User ||--o{ UserNotification : "HasMany"
  User ||--o{ UserKeyword : "HasMany"
  Internship ||--o{ UserNotification : "Generates"
```

## Entities

- **Company** — Companies that offers the internships.
- **Internship** — Published and available internship.
- **Career** — Current asked careers of the internships (Sistemas, Civil, etc.).
- **University** — Available universities.
- **InternshipCareer** — N:M relation between internships and careers.
- **User** — Registered vía Clerk.
- **UserCareer** — Careers of intertest of the registered users.
- **UserKeyword** — Keywords of intertest of the registered users for custom recomendations.
- **UserNotification** — Log of sent alerts to the users with 'seen' flag.
