# Benidisc Ultimate Frisbee

Aplicación web full-stack para el club `Benidisc`, construida con el stack PERN:
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express + PostgreSQL + Prisma
- Uploads: Multer para imágenes de torneos y patrocinadores
- Autenticación: JWT para la zona de administración

## Estructura del proyecto

```
benidisc/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── routes/
│   ├── uploads/
│   ├── .env.example
│   ├── index.js
│   ├── package.json
│   └── seed.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Arquitectura

```mermaid
flowchart LR
   Browser[User Browser]

   subgraph Frontend [Frontend — React (Vite + Tailwind)]
      direction TB
      App[App.jsx]
      Home[Home.jsx]
      Achievements[Achievements.jsx]
      Tournaments[Tournaments.jsx]
      AdminPage[Admin.jsx (stores token in localStorage)]
   end

   subgraph Backend [Backend — Node.js + Express]
      direction TB
      Express[Express server (backend/index.js)]
      Routes[API routes (/api/*) (auth, tournaments, achievements, sponsors, news)]
      AuthController[Auth Controller (/api/auth)]
      AuthMiddleware[authenticateToken (JWT) middleware]
      UploadMiddleware[upload (multer) middleware]
      Controllers[Controllers (CRUD handlers)]
      Prisma[Prisma Client]
      DB[SQLite DB]
      Static[Static files: frontend/dist & /uploads]
      UploadsFolder[uploads/ (saved files)]
   end

   Browser --> App
   App --> Home
   App --> Achievements
   App --> Tournaments
   App --> AdminPage

   Home -->|GET /api/news| Routes
   Achievements -->|GET /api/achievements| Routes
   Tournaments -->|GET /api/tournaments| Routes

   AdminPage -->|POST /api/auth/login (email/password)| AuthController
   AuthController -->|returns JWT| AdminPage
   AdminPage -->|POST/PUT/DELETE (multipart + Authorization header)| Routes

   Routes --> Controllers
   Routes --> AuthMiddleware
   Routes --> UploadMiddleware
   Controllers --> Prisma
   Prisma --> DB
   UploadMiddleware --> UploadsFolder
   Express --> Static
   Routes --> Static

```

## Backend

### APIs disponibles
- `POST /api/auth/login` - autenticación JWT
- `GET /api/tournaments` - lista de torneos
- `POST /api/tournaments` - crear torneo con imagen
- `PUT /api/tournaments/:id` - actualizar torneo
- `DELETE /api/tournaments/:id` - eliminar torneo
- `GET /api/achievements` - lista de palmarés
- `POST /api/achievements` - crear logro con imagen
- `GET /api/sponsors` - lista de patrocinadores
- `POST /api/sponsors` - crear patrocinador con logo

### Configuración

1. Instalar dependencias:
   ```bash
   cd backend
   npm install
   ```
2. Copiar el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```
3. Configurar `DATABASE_PROVIDER` y `DATABASE_URL` con tu base de datos.
   - Para PostgreSQL, usa `DATABASE_PROVIDER=postgresql`.
   - Para pruebas locales sin PostgreSQL, puedes usar `DATABASE_PROVIDER=sqlite` y `DATABASE_URL="file:./dev.db"`.
4. Crear la base de datos y aplicar migraciones:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Generar el cliente de Prisma (si no se genera automáticamente):
   ```bash
   npx prisma generate
   ```
6. Crear el usuario admin inicial:
   ```bash
   npm run seed
   ```
7. Ejecutar el servidor:
   ```bash
   npm run dev
   ```

## Frontend

1. Instalar dependencias:
   ```bash
   cd frontend
   npm install
   ```
2. Ejecutar el frontend:
   ```bash
   npm run dev
   ```

## Acceso de administrador

- Email: `admin@benidisc.com`
- Contraseña inicial: `Benidisc2026!`

## Notas

- Las imágenes cargadas se almacenan en `backend/uploads`.
- El frontend usa React Router para navegación y Tailwind CSS para estilos móviles y responsive.
- El backend sirve los assets estáticos desde `/uploads`.
- Para cambios en el esquema, modifica `backend/prisma/schema.prisma` y vuelve a ejecutar las migraciones.
