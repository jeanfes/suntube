# SunTube - La Cartelera de Hype Tecnológico

Solución a la prueba técnica de Sundevs. Un backend en NestJS que procesa datos de videos de YouTube y un frontend en React que los consume, destacando el video con mayor "Nivel de Hype".

## Estructura del Proyecto

Monorepo organizado con **pnpm workspaces**:

```
suntube/
├── apps/
│   ├── suntube-api/   # Backend — NestJS
│   └── suntube-web/   # Frontend — React + Vite
├── DECISIONS.md
├── README.md
├── package.json
└── pnpm-workspace.yaml
```

## Requisitos Previos

- [Node.js](https://nodejs.org/) v18 o superior
- [pnpm](https://pnpm.io/) v8 o superior

## Instalación

Desde la raíz del proyecto:

```bash
pnpm install
```

Esto instalará las dependencias de todas las aplicaciones del workspace.

## Variables de Entorno

Copia los archivos de ejemplo y configúralos:

```bash
cp apps/suntube-api/.env.example apps/suntube-api/.env
cp apps/suntube-web/.env.example apps/suntube-web/.env
```

Los valores por defecto en los `.env.example` funcionan para desarrollo local sin modificaciones adicionales.

## Ejecución Local

Abre dos terminales desde la raíz del proyecto:

```bash
# Terminal 1 — Backend
pnpm dev:api

# Terminal 2 — Frontend
pnpm dev:web
```

| Servicio | URL |
|----------|-----|
| Backend  | http://localhost:3000 |
| Frontend | http://localhost:5173 |
| Endpoint principal | http://localhost:3000/api/videos |

## Decisiones Técnicas

Consulta [DECISIONS.md](./DECISIONS.md) para más detalles sobre el enfoque, arquitectura y decisiones tomadas durante el desarrollo.
