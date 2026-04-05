# Copilot Instructions para el repositorio Benidisc

## Contexto
Este proyecto es una aplicación web full-stack para el club de Ultimate Frisbee `Benidisc`. El enfoque técnico es PERN:
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Base de datos: PostgreSQL con Prisma
- Uploads: Multer para imágenes de torneos y patrocinadores
- Autenticación: JWT para el panel de administración

## Principios de respuesta
- Responde en español, salvo que el usuario solicite lo contrario.
- Mantén la comunicación profesional, concisa y orientada a desarrolladores.
- Usa encabezados y formatos claros en Markdown para explicar cambios y pasos.
- Cuando generes código, incluye sólo lo necesario y mantén la estructura modular.
- Prioriza un diseño mobile-first, moderno y deportivo en el frontend.

## Convenciones del proyecto
- Estructura separada en `backend/` y `frontend/`.
- `backend/uploads/` se usa para archivos subidos mediante Multer.
- `backend/prisma/schema.prisma` define los modelos y se conecta a PostgreSQL.
- `frontend/` debe usar React Router para la navegación y Tailwind para estilos.
- El admin se expone en una ruta protegida (`/admin`) con JWT y un login básico.

## Reglas de implementación
- Frontend:
  - Usa `BrowserRouter` y rutas para `Home`, `Palmarés`, `Torneos` y `Admin`.
  - Crea componentes reutilizables de UI para Navbar y Footer.
  - Implementa formularios con `input type="file"` para subir imágenes.
- Backend:
  - Usa Express con middleware de `cors`, `express.json()` y rutas modulares.
  - Configura Multer para guardar uploads en `backend/uploads`.
  - Protege las rutas de creación/edición/eliminación con JWT.
  - Crea un seed o usuario admin inicial para autenticación.

## Documentación y setup
- Instruye siempre sobre instalación por separado en `backend/` y `frontend/`.
- Incluye pasos para:
  1. copiar `.env.example` a `.env`
  2. instalar dependencias
  3. correr migraciones Prisma
  4. iniciar backend y frontend
- Describe claramente cómo funciona la ruta de uploads y dónde se almacenan las imágenes.

## Ejemplos de prompts útiles
- "Genera la estructura de carpetas de `frontend/` y `backend/` para este proyecto." 
- "Crea un schema Prisma para `User`, `Achievement`, `Tournament` y `Sponsor`."
- "Implementa un formulario de React que suba una imagen al backend usando Multer."
- "Agrega autenticación JWT para la ruta `/api/tournaments` en el backend."
