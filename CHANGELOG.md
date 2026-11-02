# CHANGELOG

## 2026-11-02 — Baseline de datos y assets

### Datos y contenido
- `contactData.ts` queda como fuente única de verdad para matrículas, teléfono, email y dirección.
- `LAWYER_INFO` se sincroniza con `CONTACT_INFO` (Mat. Provincial N° 11576, teléfono y email reales).
- Se suavizan las estadísticas de autoridad: se eliminan porcentajes y conteos de casos no verificables; se mantienen trayectoria, guardia 24 hs, cobertura y secreto profesional.

### Assets
- Se eliminan del manifiesto las 8 rutas `/assets/images/services/*.webp` que no existen en el repositorio.
- `ASSETS` se centraliza en `src/data/assets.ts`; `lawyerData` reexporta para no romper imports existentes.
- Los ítems del catálogo `SERVICES` usan `serviceFallback` (hero de servicios) hasta disponer de assets por práctica.

### Mantenimiento
- `package.json` versionado a `1.0.0`.
- Se elimina `bun.lock` (el proyecto usa npm / `package-lock.json`).

## 2026-08-18 — Stabilización `fix/stabilize-main`

### QA / E2E
- Se corrigió el selector del flujo de Servicios en Playwright para apuntar al contrato funcional estable de `ServicesSection`: `#services-section button[aria-haspopup="dialog"]`.
- Se mantiene la validación del flujo completo: navegación a Servicios → apertura de detalle → solicitud de consulta → preservación de `practiceArea` en Contacto.
- Se evita acoplar el E2E al texto visual del `aria-label`, reduciendo falsos negativos derivados de cambios de copy.

### Infraestructura / verificación
- TypeScript y build de producción continúan siendo gates obligatorios.
- El preview de Vercel de cada commit de `fix/stabilize-main` se utiliza como entorno efímero de validación.
- La auditoría visual/rediseño permanece fuera de esta fase; primero se cierra la estabilidad funcional.

### Asunción operativa
- Cuando el comportamiento funcional del componente es correcto pero el E2E falla por un selector excesivamente específico, se corrige el contrato de prueba antes de modificar lógica de producto.
