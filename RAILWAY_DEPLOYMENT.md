# Benidisc Railway Deployment Guide

## Instalación en Railway

1. **Conectar repositorio Git** a tu account de Railway
2. **Variables de entorno** en Railway dashboard:
   - `DATABASE_URL`: PostgreSQL connection string (Railway proporciona uno automáticamente si añades el servicio PostgreSQL)
   - `JWT_SECRET`: Genera una clave segura (ej: `openssl rand -base64 32`)
   - `NODE_ENV`: `production`

   ### Opción A — Crear admin automáticamente en el primer arranque (recomendado)

   Si prefieres que el admin se cree automáticamente al arrancar la app en Railway, añade estas variables de entorno adicionales al servicio backend:

   - `ADMIN_EMAIL` — email del administrador (ej: `admin@benidisc.com`)
   - `ADMIN_PASSWORD` — contraseña inicial del administrador (cámbiala después del primer login)

   Ejemplo (Railway CLI):

   ```bash
   # Usa tu connection string real en lugar de <YOUR_DATABASE_URL>
   railway variables set DATABASE_URL "<YOUR_DATABASE_URL>"
   railway variables set JWT_SECRET "<YOUR_JWT_SECRET>"
   railway variables set ADMIN_EMAIL "admin@benidisc.com"
   railway variables set ADMIN_PASSWORD "Benidisc2026!"
   ```

   Luego redeploy/reinicia el servicio (`railway up` o mediante la UI). En los logs deberías ver un mensaje parecido a:

   ```
   Admin user created on startup: admin@benidisc.com
   ```

   Nota de seguridad: después del primer arranque considera remover `ADMIN_PASSWORD` de las variables de entorno o cambiarla por una contraseña segura desde el panel de administración.

3. **Build Command**: `cd frontend && npm run build`
4. **Start Command**: `cd backend && npm start`

## Estructura de despliegue

- El **backend** (en carpeta `/backend`) sirve como servidor principal
- El **frontend** se compila en `/frontend/dist` durante el build
- El backend sirve los archivos estáticos del frontend y redirige rutas SPA a `index.html`

## Pasos para desplegar desde Railway CLI (opcional)

```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

## Verificación

- La aplicación estará disponible en: `https://tu-railway-app.railway.app`
- Los endpoints de API están en: `https://tu-railway-app.railway.app/api/*`
- El frontend automáticamente usa rutas relativas `/api` en producción

## Notas importantes

- Asegúrate de que `DATABASE_URL` apunta a PostgreSQL (no SQLite) en producción
- Las imágenes cargadas se almacenarán en `/backend/uploads` (volumen persistente en Railway)
- Si necesitas persistencia de archivos, configura un volumen en Railway para `/backend/uploads`
