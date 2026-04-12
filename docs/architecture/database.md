```mermaid
erDiagram
  Company ||--o{ Internship : "HasMany"
  Internship ||--o{ InternshipCareer : "HasMany"
  Career ||--o{ InternshipCareer : "Includes"
  User ||--o{ UserCareer : "Suscripted to"
  Career ||--o{ UserCareer : "Includes"
  User ||--o{ UserNotification : "HasMany"
  Internship ||--o{ UserNotification : "Generates"
```

## Entities

- **Company** — Companies that offers the internships.
- **Internship** — Published and available internship.
- **Career** — Current asked careers of the internships (Sistemas, Civil, etc.).
- **InternshipCareer** — N:M relation between internships and careers.
- **User** — Registered vía Clerk.
- **UserCareer** — Careers of intertest of the registered users.
- **UserNotification** — Log of sent alerts to the users with 'seen' flag.
